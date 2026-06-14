# Fabric IQ — Vendor Operations ontology (the Meaning lens)

`vendor-ops.rdf` is a business **ontology** (RDF/OWL) — entities, relationships,
and properties for the accounts-payable domain. It is authored in the format
Microsoft's [Ontology-Playground](https://github.com/microsoft/Ontology-Playground)
exports, "the exact format Microsoft Fabric IQ expects."

## What this is — and what it is not

This file is the **ontology definition** (the blueprint). It is **not** itself
"Fabric IQ." Per Microsoft Learn, Fabric IQ is the semantic layer that runs
*inside* Microsoft Fabric (the IQ workload — ontology is in preview), grounded on
OneLake. An agent uses it for real in one of two ways:

- a **Fabric Data Agent** grounded in the ontology, published to Microsoft
  Foundry / Copilot Studio / custom apps, or
- the **Fabric IQ Ontology MCP** endpoint (external agents query the semantic
  model directly).

`ground_fabric_iq` (when wired) calls that **real Fabric endpoint** and tags
results `source:fabric-iq` / `[fabric:]`. We do **not** emit that label for a
locally-parsed file — grounding the agent on this RDF without a call to Fabric
would be ontology grounding, not Fabric IQ, and would be labeled honestly as such.

## Status

- ✅ Ontology authored + validated (RDF/OWL, Fabric IQ format).
- ⏳ Stand up as an *Ontology (preview)* item in Microsoft Fabric, then publish a
  Data Agent / enable the Ontology MCP endpoint.
- ⏳ Wire `ground_fabric_iq` to that real endpoint.

## Its distinct job (the Meaning lens)

In a decision record, Fabric IQ earns its `[fabric:]` citation with the **entity
graph** — how a `Vendor`, `Invoice`, `PaymentTerm`, and `PaymentPolicy` relate —
*cross-domain reasoning over relationships*, the thing Foundry IQ (facts) and the
vault (governed policy) don't provide. The **governed approval rule stays in the
vault** (`kn-payment-policy`); Fabric IQ supplies the business structure, not the
human-approved policy. Facts (Foundry) + Activity (Work) + Meaning (Fabric),
never merged.
