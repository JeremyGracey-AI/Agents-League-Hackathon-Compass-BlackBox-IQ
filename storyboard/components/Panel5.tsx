"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { container, fadeUp } from "./motion";

const steps = [
  { label: "plan", color: "var(--facts)" },
  { label: "recall", color: "var(--facts)" },
  { label: "ground", color: "var(--facts)" },
  { label: "act", color: "var(--activity)" },
  { label: "log", color: "var(--activity)" },
  { label: "audit", color: "var(--meaning)" },
  { label: "propose", color: "var(--meaning)" },
  { label: "approve", color: "var(--vault)", gate: true },
  { label: "re-run", color: "var(--facts)" },
];

export default function Panel5() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = (i: number) => {
      setActive(i);
      const dwell = steps[i].gate ? 1300 : 620; // pause on the human gate
      timer.current = setTimeout(() => tick((i + 1) % steps.length), dwell);
    };
    tick(0);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1040, textAlign: "center" }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          The governed loop
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, margin: "28px 0 8px" }}
        >
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <motion.div
                key={s.label}
                animate={{ scale: on ? 1.09 : 1 }}
                transition={{ duration: 0.25 }}
                className="mono"
                style={{
                  position: "relative",
                  padding: "10px 16px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  color: on ? "#fff" : "var(--ink-dim)",
                  background: "var(--bg-2)",
                  border: `1.5px solid ${s.gate ? "var(--vault)" : on ? s.color : "var(--line)"}`,
                  boxShadow: on ? `0 0 26px -6px ${s.color}` : "none",
                }}
              >
                {s.label}
                {s.gate && on ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ position: "absolute", top: -10, right: -10, color: "var(--activity-t)", fontSize: 18 }}
                  >
                    ✓
                  </motion.span>
                ) : null}
                {s.gate ? (
                  <span
                    style={{ position: "absolute", bottom: -20, left: 0, right: 0, fontSize: 10, color: "var(--vault-t)", letterSpacing: "0.08em" }}
                  >
                    HUMAN GATE
                  </span>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.h2
          variants={fadeUp}
          style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 700, margin: "40px 0 8px" }}
        >
          Agents propose; humans promote.
        </motion.h2>
        <motion.p variants={fadeUp} style={{ color: "var(--ink-dim)", fontSize: 15, margin: 0 }}>
          The only write paths are decision records and proposals &mdash; promotion is human-gated.
        </motion.p>
      </motion.div>
    </section>
  );
}
