# F.A.M. and the Engine

How Compass-BlackBox IQ separates **grounded truth** (what the agent reasons over)
from **memory and competence** (what it learned and how good it is getting) — and
how each is measured.

---

## F.A.M. — grounded truth

Three Microsoft IQ surfaces, three lenses. Each does a job the others can't.
Together they are the agent's complete grounded world — its enterprise reality.

> **F.A.M. = Facts + Activity + Meaning = grounded truth.**

| Surface | Lens | The job only it does |
|---|---|---|
| **Foundry IQ** | **Facts** | Institutional reference — *who and what*: vendor master, org directory, handbook. Retrieval over documents. |
| **Work IQ** | **Activity** | Live Microsoft 365 — *what's happening now*: what finance actually said this week, who met whom, the current flow of work. User-scoped, permission-aware. |
| **Fabric IQ** | **Meaning** | The ontology — *how concepts relate*: a net-60 term **is-a** deviation that **requires** approval. A modeled relationship in a knowledge graph, not a lookup. |

Facts + Activity + Meaning is the **complete** grounded world: the agent has
Microsoft's entire intelligence stack. And the thesis lands *because* of it —
**even fully grounded, the agent has no governed memory.** Grounding is rented
from the vendor: read-only, you can't diff or revoke it. Memory is owned by you.
The strongest possible "before" makes the "after" undeniable.

All three surfaces are **read-only**, **source-tagged** (`[iq:]`, `[work:]`,
`[fabric:]`), and **never merged** into the governed vault. They feed the agent;
they are not its memory.

### Where F.A.M. triangulates: one decision record

The seam between *what Microsoft grounds* and *what we govern* is visible and
auditable inside a single artifact — the trap-email decision, re-run:

```
[iq: vendor-master]                      Vandelay is a real, active vendor      (Facts)
[work: finance-thread]                   finance flagged terms tightening       (Activity)
[fabric: finance-ontology#PaymentTerm]   net-60 is-a deviation → requires        (Meaning)
                                         approval
[vault: skill-vendor-triage,             the approved, human-gated skill it      (Governed memory)
        kn-payment-policy]               must follow
→ outcome: needs_human
```

Four citations, one record. Three are read-only grounding; one is governed
memory the human owns. A surface earns its place only if it produces a
**distinct** citation that changes what the agent concludes. If a lens's answer
is another lens reworded, it is redundant and it is cut.

---

## The engine — constant comparative analysis

F.A.M. is the truth the agent reasons over. **Memory and competence** — what the
agent learned and how good it is getting — are not grounding; they are
*developed*. We measure that development with an established method from
qualitative research: grounded theory's **constant comparative analysis**.[^gt]

A grounded-theory researcher builds theory not by imposing a framework but by
**constantly comparing new data against existing data** — coding instances,
finding patterns, abstracting them into categories, and testing those categories
against more data until nothing new emerges. The agent develops competence the
same way, and the **blackbox is the corpus it analyzes.**

### Two acceptance tests

A candidate category — for us, a proposed skill — earns promotion only if it
passes both:

- **Fit** — categories must *arise from and apply to the data readily, not be
  forced onto it.* Every audit proposal is drafted from real vault content the
  agent actually overlooked — never invented. A skill that doesn't fit the
  decisions that produced it is rejected.
- **Work** — categories must be *relevant enough to actually explain the behavior
  under study.* A promoted skill has to change what the agent does next: the
  governed re-run must follow it and reach the correct outcome. A skill that
  doesn't change behavior doesn't work — and is reverted.

### The core mechanism

New data is systematically compared with existing data to surface patterns,
similarities, and differences — iteratively, from initial coding through
theoretical sampling and memo writing, until **theoretical saturation.** Mapped
to the tools:

| Grounded theory | Compass-BlackBox IQ |
|---|---|
| **Initial coding** | `log_decision` — every action coded as a structured record: plan, citations, outcome, confidence. |
| **Constant comparison** | `run_audit` — three heuristics compare each new decision against the existing corpus: uncited decisions (a gap), stale skills (disuse), low-confidence repeats (recurring difficulty). |
| **Theoretical sampling** | the audit re-runs recall over the task to pull the exact existing notes the decision should have been compared against. |
| **Memo writing** | the proposal's rationale — which heuristic fired, and the real notes the agent missed. |
| **Category** | a proposed skill — a pattern abstracted into a reusable procedure. |
| **Fit / Work** | the human gate at `approve_proposal` — promote only what arose from the data (**Fit**) and changes behavior (**Work**). |
| **Theoretical saturation** | the pattern stops generating new proposals; the promoted skill covers it. Behavior is revertible; the record is not. |

Competence is the analytic product of constant comparison over the agent's own
recorded behavior. **F.A.M. grounds the agent in the enterprise world; the engine
turns its behavior in that world into governed, human-approved competence** —
the layer no permission system, orchestrator, or IQ surface touches.

[^gt]: Glaser, Barney G., and Anselm L. Strauss. *The Discovery of Grounded
Theory: Strategies for Qualitative Research.* Aldine, 1967. The constant
comparative method; "fit" and "work" as criteria for a grounded theory.
