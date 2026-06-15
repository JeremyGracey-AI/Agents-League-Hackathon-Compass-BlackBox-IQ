"use client";

import { motion } from "framer-motion";
import { container, fadeUp } from "./motion";

const rows = [
  { tool: "log_decision", term: "initial coding" },
  { tool: "run_audit", term: "constant comparison" },
  { tool: "the proposal", term: "the memo" },
  { tool: "human gate", term: "fit + work · acceptance tests", amber: true },
  { tool: "promotion", term: "theoretical saturation" },
];

export default function Panel6() {
  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 920 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          The engine &mdash; competence as method
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0" }}>
          {rows.map((r) => (
            <motion.div
              key={r.tool}
              variants={fadeUp}
              style={{ display: "grid", gridTemplateColumns: "minmax(120px,200px) 40px 1fr", alignItems: "center", gap: 8 }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 14,
                  color: "var(--ink-dim)",
                  background: "var(--bg-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  padding: "9px 12px",
                  textAlign: "center",
                }}
              >
                {r.tool}
              </span>
              <span style={{ color: "var(--ink-mute)", textAlign: "center" }}>&rarr;</span>
              <span
                style={{
                  fontSize: "clamp(16px,2.2vw,20px)",
                  fontWeight: 600,
                  color: r.amber ? "var(--vault-t)" : "var(--ink)",
                }}
              >
                {r.term}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "var(--ink)", margin: "8px 0 0", maxWidth: 820 }}>
          Competence is developed the way a researcher builds theory &mdash; constant comparison over the
          agent&rsquo;s own decisions.
        </motion.p>
        <motion.p variants={fadeUp} style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 10 }}>
          Grounded theory · Glaser &amp; Strauss, 1967.
        </motion.p>
      </motion.div>
    </section>
  );
}
