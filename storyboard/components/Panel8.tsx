"use client";

import { motion } from "framer-motion";
import { EASE, container, fadeUp } from "./motion";
import VaultDoor from "./VaultDoor";

const products = [
  { name: "Compass Rose", desc: "builds role-aligned skills", rail: "var(--facts)", glyph: "◐" },
  { name: "GM Louis", desc: "reasons over the governed loop", rail: "var(--activity)", glyph: "◑" },
  { name: "BlackBox IQ", desc: "governs & records — memory + competence", rail: "var(--vault)", vault: true },
];

export default function Panel8() {
  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35 }}
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1040, textAlign: "center" }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          One platform, three layers
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16, margin: "22px 0 32px" }}>
          {products.map((p) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              style={{
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderTop: `3px solid ${p.rail}`,
                borderRadius: 14,
                padding: "22px 18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              {p.vault ? (
                <VaultDoor size={48} />
              ) : (
                <span style={{ fontSize: 34, color: p.rail }}>{p.glyph}</span>
              )}
              <div style={{ fontWeight: 700, fontSize: 18 }}>{p.name}</div>
              <div style={{ color: "var(--ink-dim)", fontSize: 14 }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} style={{ color: "var(--ink-dim)", fontSize: "clamp(16px,2.2vw,22px)", margin: "0 0 28px" }}>
          Microsoft governs permissions &amp; grounding. We govern the layer no one else does.
        </motion.p>

        <motion.h2
          variants={fadeUp}
          style={{ fontSize: "clamp(30px,4.6vw,48px)", fontWeight: 750, margin: "0 0 14px", letterSpacing: "-0.01em" }}
        >
          Agents propose, humans promote.
        </motion.h2>
        <motion.a
          variants={fadeUp}
          href="https://github.com/JeremyGracey-AI/Agents-League-Hackathon-Compass-BlackBox-IQ"
          target="_blank"
          rel="noreferrer"
          className="mono"
          style={{ color: "var(--vault-t)", fontSize: 15, textDecoration: "none", position: "relative", display: "inline-block" }}
        >
          github.com/JeremyGracey-AI/Agents-League-Hackathon-Compass-BlackBox-IQ
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            style={{ position: "absolute", left: 0, right: 0, bottom: -3, height: 2, background: "var(--vault)", transformOrigin: "left" }}
          />
        </motion.a>
        <motion.p variants={fadeUp} style={{ color: "var(--ink-mute)", fontSize: 12.5, marginTop: 14 }}>
          Agents League @ AI Skills Fest 2026 · Reasoning Agents track
        </motion.p>
      </motion.div>
    </section>
  );
}
