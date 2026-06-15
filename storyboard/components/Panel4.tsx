"use client";

import { motion } from "framer-motion";
import { container, fadeUp } from "./motion";

function Badge({ kind }: { kind: "live" | "roadmap" }) {
  if (kind === "roadmap") {
    return (
      <span
        className="mono"
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--vault-t)",
          border: "1px solid var(--vault)",
          borderRadius: 999,
          padding: "2px 9px",
        }}
      >
        ROADMAP
      </span>
    );
  }
  return (
    <span
      className="mono"
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#052e16",
        background: "var(--activity-t)",
        borderRadius: 999,
        padding: "2px 9px",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <motion.span
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: 6, height: 6, borderRadius: 999, background: "#065f46" }}
      />
      LIVE
    </span>
  );
}

const cards = [
  { lens: "Foundry IQ · Facts", rail: "var(--facts)", badge: "live", chips: ["vendor master", "Initech · net-60 · approval contact"] },
  { lens: "Work IQ · Activity", rail: "var(--activity)", badge: "live", chips: ["emails: net-60, Vandelay", "the AP review"] },
  { lens: "Fabric IQ · Meaning", rail: "var(--meaning)", badge: "roadmap", chips: ["net-60 → TermDeviation", "requiresApproval"] },
  { lens: "Vault · governed", rail: "var(--vault)", badge: null, chips: ["kn-payment-policy", "skill-vendor-triage"] },
] as const;

export default function Panel4() {
  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1040 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          One task, four lenses
        </motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px,3.4vw,38px)", fontWeight: 700, margin: "10px 0 26px" }}>
          Not a concept. It runs &mdash; nothing faked.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {cards.map((c) => (
            <motion.div
              key={c.lens}
              variants={fadeUp}
              style={{
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderLeft: `3px solid ${c.rail}`,
                borderRadius: 14,
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{c.lens}</span>
                <span style={{ marginLeft: "auto" }}>
                  {c.badge ? <Badge kind={c.badge as "live" | "roadmap"} /> : null}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {c.chips.map((chip) => (
                  <span
                    key={chip}
                    className="mono"
                    style={{
                      fontSize: 13,
                      color: "var(--ink-dim)",
                      background: "var(--bg-2)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      padding: "6px 10px",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} style={{ color: "var(--ink-dim)", fontSize: 14, marginTop: 22 }}>
          Read-only · source-tagged · never merged &mdash; every claim has a live artifact.
        </motion.p>
      </motion.div>
    </section>
  );
}
