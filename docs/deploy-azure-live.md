# Deploy the live stack to Azure Container Apps

Two services, public, with **live grounding**: the **GGR/MCP server** (governs +
grounds + records) and the **Compass Rose web app** (skill-forge + reasoning-trace +
vault). The dashboard's trace/vault tabs call the MCP server live, so the order matters.

> **Run these yourself — `az` mutations are gated to you.** Paste your own secrets
> where you see `<…>`; they are never read by the assistant. Resource names below reuse
> the existing group/registry/env (`rg-jg-3018`, `scoutcompassacr`, `scout-compass-env`).

## ⚠️ Read first — the Work IQ token lifecycle

Grounding has two live backends with very different lifespans:

- **Foundry IQ (Facts)** — Azure AI Search key. **Long-lived; set once, works forever.** Bulletproof for the public URL and for judging.
- **Work IQ (Activity)** — the **morgan delegated token** (`WORK_IQ_USER_TOKEN`). **Short-lived (~60–90 min).** It is a *static* env var today — there is no server-side refresh. After it expires the **Activity** panel returns an error until you re-mint and update the secret.

So "Work IQ live on a public URL" really means **"live for ~an hour after each re-mint."**
Plan for it: re-mint right before recording/judging (see [§4](#4-refresh-the-work-iq-token-hourly)),
or ask me to build server-side auto-refresh (password-grant on 401) as a follow-up. Foundry IQ
needs none of this — lean on it for the always-on live beat.

## Prereqs (once)

```bash
az extension add --name containerapp --upgrade
az provider register --namespace Microsoft.App
az provider register --namespace Microsoft.OperationalInsights
# If scoutcompassacr / scout-compass-env / rg-jg-3018 don't exist yet, create the ACR
# + Container Apps environment first (standard `az acr create` / `az containerapp env create`).
```

## 1. Build + deploy the MCP / GGR server (deploy this FIRST)

The image seeds the demo vault at build time (`server/Dockerfile` runs `seed-vault.mjs`),
runs `MODE=http` on :3000, and is **single-replica** (per-container vault — do not scale out).

```bash
cd ~/GitHub/Agents-League-Hackathon-Compass-BlackBox-IQ

# build (context = repo root; the Dockerfile COPYs server/ + demo/)
az acr build -r scoutcompassacr -t ggr-server:latest -f server/Dockerfile .

# secrets (paste your real values)
az containerapp create -g rg-jg-3018 -n ggr-server \
  --environment scout-compass-env \
  --image scoutcompassacr.azurecr.io/ggr-server:latest \
  --registry-server scoutcompassacr.azurecr.io \
  --target-port 3000 --ingress external \
  --min-replicas 1 --max-replicas 1 \
  --secrets \
      ggr-key='<GGR_KEY>' \
      foundry-key='<FOUNDRY_IQ_KEY>' \
      work-token='<WORK_IQ_USER_TOKEN>' \
  --env-vars \
      MODE=http \
      GGR_KEY=secretref:ggr-key \
      FOUNDRY_IQ_ENDPOINT='<FOUNDRY_IQ_ENDPOINT>' \
      FOUNDRY_IQ_KEY=secretref:foundry-key \
      FOUNDRY_IQ_KB='<FOUNDRY_IQ_KB>' \
      WORK_IQ_GATEWAY='<WORK_IQ_GATEWAY>' \
      WORK_IQ_USER_TOKEN=secretref:work-token
```

Env var reference (from `server/src/ground.ts` + `index.ts`):

| Var | Required | What it is |
|---|---|---|
| `MODE=http` | yes | streamable HTTP MCP on `/mcp` |
| `GGR_KEY` | yes | bearer token the auth gate requires on every `/mcp` request |
| `FOUNDRY_IQ_ENDPOINT` / `FOUNDRY_IQ_KEY` / `FOUNDRY_IQ_KB` | for Facts | Azure AI Search KB (Foundry IQ) |
| `WORK_IQ_GATEWAY` / `WORK_IQ_USER_TOKEN` | for Activity | Work IQ Gateway URL + the morgan delegated token (short-lived) |
| `FOUNDRY_IQ_API_VERSION`, `WORK_IQ_TIMEZONE` | optional | defaults are fine |

Capture the FQDN — **the web app needs it**:

```bash
MCP_FQDN=$(az containerapp show -g rg-jg-3018 -n ggr-server \
  --query properties.configuration.ingress.fqdn -o tsv)
echo "MCP server: https://$MCP_FQDN/mcp"
curl -s -o /dev/null -w "healthz %{http_code}\n" "https://$MCP_FQDN/healthz"   # → 200
```

## 2. Build + deploy the Compass Rose web app (skill-forge + dashboard)

Point it at the MCP server from step 1. Use the **same `GGR_KEY`** so it can authenticate.

```bash
# build (context = compass-rose/)
az acr build -r scoutcompassacr -t gm-louis-web:latest -f compass-rose/Dockerfile compass-rose

az containerapp create -g rg-jg-3018 -n gm-louis-web \
  --environment scout-compass-env \
  --image scoutcompassacr.azurecr.io/gm-louis-web:latest \
  --registry-server scoutcompassacr.azurecr.io \
  --target-port 8000 --ingress external \
  --min-replicas 1 --max-replicas 2 \
  --secrets ggr-key='<GGR_KEY>' \
  --env-vars MCP_URL="https://$MCP_FQDN/mcp" GGR_KEY=secretref:ggr-key
```

(Supabase config for skill-forge is already public-by-design in `api/index.py` — nothing to set.)

```bash
WEB_FQDN=$(az containerapp show -g rg-jg-3018 -n gm-louis-web \
  --query properties.configuration.ingress.fqdn -o tsv)
echo "Dashboard: https://$WEB_FQDN/"
```

## 3. Verify the live path

```bash
curl -s -o /dev/null -w "skill-forge %{http_code}\n" "https://$WEB_FQDN/"          # 200
# trace tab → grounds live via the MCP server:
curl -s -X POST "https://$WEB_FQDN/api/trace" -H 'Content-Type: application/json' \
  -d '{"query":"Summarize recent emails about vendor payment terms, net-60, Vandelay, and the AP review."}' | head -c 400
# vault tab → decisions/audit/proposals via the MCP server (the new list_decisions tool):
curl -s "https://$WEB_FQDN/api/vault" | head -c 400
```

Open `https://$WEB_FQDN/` → skill-forge, `/trace` → Foundry IQ + Work IQ light up live,
`/vault` → the blackbox decisions, audit, and proposals — all from the live server.

## 4. Refresh the Work IQ token (hourly)

When the Activity panel starts erroring, re-mint and roll the secret:

```bash
MPW='WorkIQAgent2026!' bash ~/wiq-refresh.sh    # mints a fresh morgan token (prints it)
az containerapp secret set -g rg-jg-3018 -n ggr-server --secrets work-token='<NEW_TOKEN>'
az containerapp revision restart -g rg-jg-3018 -n ggr-server \
  --revision "$(az containerapp show -g rg-jg-3018 -n ggr-server --query properties.latestRevisionName -o tsv)"
```

Foundry IQ (Facts) keeps working throughout — only Work IQ (Activity) needs this.

## Teardown (after submission)

```bash
az containerapp delete -g rg-jg-3018 -n gm-louis-web --yes
az containerapp delete -g rg-jg-3018 -n ggr-server --yes
```

## Demo-data coherence

The seeded vault + grounding use the **same world as the video and storyboard** —
Initech, net-60, Vandelay, the AP review, morgan.reyes. Keep it that way so the live
dashboard, the deck, and the recording all show one coherent story.
