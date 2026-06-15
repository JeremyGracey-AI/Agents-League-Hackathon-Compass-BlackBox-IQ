"use client";

import { motion } from "framer-motion";
import { container, fadeUp } from "./motion";
import VaultDoor from "./VaultDoor";

const nodes = [
  { y: 60, name: "Facts", sub: "Foundry IQ", color: "var(--facts)", tint: "var(--facts-t)", id: "tr-facts", curve: "M182,60 C300,60 348,160 432,160" },
  { y: 160, name: "Activity", sub: "Work IQ", color: "var(--activity)", tint: "var(--activity-t)", id: "tr-act", curve: "M182,160 L432,160" },
  { y: 260, name: "Meaning", sub: "Fabric IQ", color: "var(--meaning)", tint: "var(--meaning-t)", id: "tr-mean", curve: "M182,260 C300,260 348,160 432,160" },
];

export default function Panel3() {
  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1140 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          F.A.M. &mdash; Microsoft&rsquo;s intelligence layer
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 12 }}
        >
          <svg viewBox="0 0 520 320" style={{ width: "min(640px, 70vw)", height: "auto", flex: "1 1 420px" }}>
            {nodes.map((n) => (
              <motion.path
                key={n.id}
                id={n.id}
                d={n.curve}
                fill="none"
                stroke={n.color}
                strokeWidth="2"
                opacity="0.7"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            ))}
            {nodes.map((n) => (
              <circle key={n.id + "d"} r="3.5" fill={n.color}>
                <animateMotion dur="2.4s" repeatCount="indefinite">
                  <mpath href={`#${n.id}`} />
                </animateMotion>
              </circle>
            ))}
            {/* convergence node on the seam */}
            <circle cx="432" cy="160" r="5" fill="var(--bg-2)" stroke="#4a5a7e" strokeWidth="1.5" />
            {/* seam */}
            <line x1="440" y1="28" x2="440" y2="292" stroke="var(--line)" strokeDasharray="5 5" />
            <text x="436" y="20" textAnchor="end" fontSize="11" fill="var(--ink-mute)" className="mono">
              SEAM · never merged
            </text>
            {/* nodes + labels */}
            {nodes.map((n) => (
              <g key={n.name}>
                <circle cx="170" cy={n.y} r="10" fill="var(--bg-0)" stroke={n.color} strokeWidth="3" />
                <text x="152" y={n.y + 5} textAnchor="end" fontSize="16" fontWeight="700" fill={n.tint}>
                  {n.name}
                </text>
                <text x="152" y={n.y + 22} textAnchor="end" fontSize="11" fill="var(--ink-mute)">
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "0 0 auto" }}
          >
            <VaultDoor size={120} />
            <div style={{ color: "var(--vault-t)", fontWeight: 700, fontSize: 18 }}>governed vault</div>
            <div style={{ color: "#a98c4e", fontSize: 12.5 }} className="mono">
              git · human-gated · revertible
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          style={{ color: "var(--ink-mute)", fontSize: 14, marginTop: 18, textAlign: "center" }}
        >
          grounding is rented · memory is owned
        </motion.p>
      </motion.div>
    </section>
  );
}
