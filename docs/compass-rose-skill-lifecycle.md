# Compass Rose — the skill lifecycle

How a skill enters an autonomous agent's governed vault. There are two doors and **one
gate**: a skill is either **authored** by a human from a persona (Compass Rose — the front
door) or **learned** from the agent's own decisions (the audit — the back door). Either way
it lands in `skills/` only through a human approval — *agents propose, humans promote.*

```mermaid
flowchart LR
    A([Pick or define a persona]) --> B[Compass Rose aligns<br/>role to role-fit skills]
    B --> C[Preview skills<br/>no YAML]
    C --> D{Aligned to the role?}
    D -- No --> E[Refine persona /<br/>reselect workflows]
    E --> B
    D -- Yes --> F[One-click install<br/>SKILL.md to the agent]
    F --> G[(Governed vault<br/>skills/ in git, human-owned)]
    G --> H[GM Louis recalls and runs<br/>the governed loop]
    H --> I{run_audit finds<br/>an uncited decision?}
    I -- Yes --> J[Audit drafts a<br/>skill proposal from real notes]
    J --> K{Human gate<br/>fit + work}
    K -- approve --> G
    K -- reject --> L[Deleted, with reason]
    I -- No --> M([Reusable, governed<br/>skill primitive])

    classDef persona fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#052e16;
    classDef build fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#0f172a;
    classDef decision fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#422006;
    classDef human fill:#fce7f3,stroke:#db2777,stroke-width:2px,color:#831843;
    classDef vault fill:#fde68a,stroke:#f59e0b,stroke-width:2px,color:#422006;
    class A,M persona;
    class B,C,F,H,J build;
    class D,I decision;
    class E,K,L human;
    class G vault;
```

**Front door — Compass Rose (authoring).** Pick a saved persona or define a new executive
(CLI + 8 archetypes, or the no-YAML web app powered by GM Louis). Compass Rose aligns the role
to role-fit skills; you preview them and one-click install writes a `SKILL.md` the agent picks up.

**Back door — the competence engine (learning).** As GM Louis runs the governed loop,
`run_audit` finds uncited decisions and drafts a skill proposal from the agent's *own* notes —
the skills it should have written but didn't.

**One vault, one gate.** Authored or learned, every skill reaches `skills/` only through the
human gate's **fit + work** acceptance tests, as a git commit. `git revert` rolls a skill back —
behavior is revertible; the decision history that produced it is not.

---

Legend — 🟩 start / reusable primitive · 🟦 build step · 🟨 automatic decision ·
🟪 human · 🟧 governed vault.

Related: the decision/audit loop in the README (`## The loop`) and the full
[architecture diagram](architecture.svg).
