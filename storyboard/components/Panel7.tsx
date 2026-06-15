"use client";

import { motion } from "framer-motion";
import { container, fadeUp } from "./motion";

const log = [
  "[blackbox] dec-003  (needs_human)",
  "[blackbox] dec-004  (cited · 0.82)",
  "[blackbox] dec-005  (needs_human · 3 citations)",
];

export default function Panel7() {
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
          Safety, in the tool layer
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 18, margin: "22px 0" }}>
          <motion.div
            variants={fadeUp}
            className="mono"
            style={{ background: "var(--bg-0)", border: "1px solid var(--line)", borderRadius: 12, padding: "16px 18px", fontSize: 13.5 }}
          >
            <div style={{ color: "var(--ink-mute)", marginBottom: 10 }}>git log — append-only</div>
            {log.map((l) => (
              <div key={l} style={{ color: "var(--vault-t)", padding: "4px 0" }}>{l}</div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mono" style={{ fontSize: 13.5, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--ink-dim)" }}>$ git revert &lt;skill&gt;</span>
              <span style={{ color: "var(--activity-t)" }}>✓ rolled back</span>
            </div>
            <motion.div
              initial={{ x: 0 }}
              whileInView={{ x: [0, -8, 8, -6, 6, 0] }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ color: "var(--ink-dim)" }}>$ git revert &lt;blackbox&gt;</span>
              <span style={{ color: "#f87171" }}>✗ refused</span>
            </motion.div>
            <div style={{ color: "var(--vault-t)", fontSize: 12 }}>
              history is not revertible &mdash; append-only
            </div>
          </motion.div>
        </div>

        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 700, margin: "8px 0 16px" }}>
          Behavior is revertible. History is not.
        </motion.h2>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["invariant in the tool layer, not the prompt", "MCP endpoint auth-gated", "empty citations are a designed signal"].map((t) => (
            <span key={t} style={{ fontSize: 12.5, color: "var(--ink-mute)", border: "1px solid var(--line)", borderRadius: 999, padding: "5px 12px" }}>
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
