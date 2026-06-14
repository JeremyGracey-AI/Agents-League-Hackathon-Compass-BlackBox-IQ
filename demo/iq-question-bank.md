# IQ grounding — question bank (rehearsal sheet)

Pre-vetted questions for GM Louis that exercise **Foundry IQ grounding**
(`ground_foundry_iq`) — separate from the governed vault memory. Every answer
below was verified live against the knowledge base (`scout-compass-kb` / source
`ks-file-439`: `org-directory.csv`, `vendor-master.csv`, `company-handbook.md`).
Company persona is fictional — **Northwind Robotics**.

GM Louis cites these with `[iq: <file>]` (the retrieval ref is the filename).
A pure lookup like these is **not** an action — GM Louis answers and cites, and
does **not** write a decision record (the blackbox is for decisions, not
questions). Ask each in a **fresh thread** — gpt-4.1 stays rattled after an error
in the same thread.

> What is **not** here: payment terms, vendor-triage, invoice-escalation. Those
> live in the **vault** (`kn-payment-policy`, the triage skill), deliberately
> orthogonal to Foundry IQ. "What are our payment terms?" is a *vault* question.

---

## Org directory — `[iq: org-directory.csv]`

| Ask | Verified answer |
|---|---|
| Who is the COO? | **Dana Whitfield** (San Mateo; top of the org, no manager) |
| Who's our VP of Engineering? | **Marcus Lee** (remote; reports to Dana Whitfield) |
| Who does Sofia Ramos report to? | **Tom Alvarez** (Eng Mgr — Platform) → Marcus Lee → Dana Whitfield *(walks the chain — nice reasoning beat)* |
| Who leads People Operations? | **Aisha Khan** (People Operations Lead; reports to Dana Whitfield) |
| Who's the Director of Design? | **Priya Nair** (Austin; reports to Dana Whitfield) |

## Vendor master — `[iq: vendor-master.csv]`

| Ask | Verified answer |
|---|---|
| Who's our freight & logistics vendor? | **Umbrella Logistics LLC** (VEN-1002, active) |
| Which vendors are inactive? | **Wonka Catering Group** (VEN-1026) — the only inactive one |
| Is Pied Piper Storage an active vendor? | No — status is **pending** (onboarded 2025-04-27). Good distinction vs. "inactive" |
| Who's our cloud / SaaS provider? | **Tyrell Cloud Services** (VEN-1033, active) |

## Handbook — `[iq: company-handbook.md]`

| Ask | Verified answer |
|---|---|
| How much PTO do salaried employees get? | **20 days/year** (1.67/month); 11 holidays; sick leave separate & uncapped |
| What's the home-office stipend? | One-time **$750** (desk/chair/peripherals) |
| Where's HQ? | **500 Harbor Blvd, San Mateo, CA** (8–18 PT); Austin hub at 1100 Congress Ave |
| What laptop do new hires get? | **MacBook Pro 14"** default (Linux ThinkPad on request) |

---

## Two staged beats

### 1. Orthogonality money-shot (two surfaces, never merged)
> "We got a **net-60 invoice from Vandelay Imports** — who are they, and what's our policy?"

GM Louis grounds vendor identity from **Foundry IQ** → `[iq: vendor-master.csv]`
(Vandelay Imports · industrial parts · US-East · **active**) **and** recalls the
rule from the **vault** → `[vault: kn-payment-policy]` (net-30; anything beyond
needs human). Two sources, tagged separately, under their own sections — the
thesis in one answer.

### 2. Honesty / no-hallucination beat (optional — test on the day)
> "What's our 401(k) match?"

The handbook has **no** retirement/401(k) content (verified absent). GM Louis
should say it isn't in the grounding sources rather than invent a number. Great
proof of honest grounding — but confirm gpt-4.1's actual reply before filming.

---

*Verified live through the tunnel after the `ground.ts` excerpt-cap fix (280 →
2400 chars) — before the fix, only the first ~3 rows of each CSV came back, so
deep-row answers (Vandelay, Wonka, Pied Piper, Tyrell, Sofia, Aisha) were
silently truncated out. Re-verify with `ground_foundry_iq` if the KB changes.*
