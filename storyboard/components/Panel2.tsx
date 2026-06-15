"use client";

import { motion } from "framer-motion";
import { EASE, container, fadeUp } from "./motion";

const allowed = [
  { label: "identity", color: "var(--facts)" },
  { label: "permissions", color: "var(--activity)" },
  { label: "grounding", color: "var(--meaning)" },
];

function Bar({
  rail,
  children,
  amber,
}: {
  rail: string;
  children: React.ReactNode;
  amber?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        borderRadius: 12,
        background: "var(--bg-2)",
        border: `1px solid ${amber ? "var(--vault)" : "var(--line)"}`,
        boxShadow: amber ? "0 0 30px -8px var(--vault)" : "none",
      }}
    >
      <span style={{ width: 4, alignSelf: "stretch", borderRadius: 4, background: rail }} />
      {children}
    </div>
  );
}

export default function Panel2() {
  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        style={{ position: "relative", zIndex: 1, maxWidth: 980, width: "100%" }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          The gap
        </motion.p>
        <motion.h2
          variants={fadeUp}
          style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, margin: "10px 0 28px" }}
        >
          Microsoft governs what an autonomous agent is{" "}
          <span style={{ color: "var(--vault-t)" }}>allowed</span> to do.
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {allowed.map((a) => (
            <motion.div key={a.label} variants={fadeUp}>
              <Bar rail={a.color}>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{a.label}</span>
                <span style={{ color: "var(--ink-mute)", fontSize: 14, marginLeft: "auto" }}>
                  has a control plane
                </span>
              </Bar>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            initial={{ borderColor: "var(--line)" }}
            style={{ marginTop: 6 }}
          >
            <Bar rail="var(--vault)" amber>
              <span style={{ color: "var(--vault-t)", fontWeight: 700 }}>
                what it knows &middot; did &middot; learned
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
                className="mono"
                style={{ color: "var(--vault)", fontWeight: 700, marginLeft: "auto", fontSize: 15 }}
              >
                Compass-BlackBox IQ
              </motion.span>
            </Bar>
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          style={{ color: "var(--ink-dim)", fontSize: 15, marginTop: 24 }}
        >
          Buried in vendor memory you can&rsquo;t read, diff, or revoke. We make it plain text.
        </motion.p>
      </motion.div>
    </section>
  );
}
