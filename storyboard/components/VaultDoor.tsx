"use client";

import { motion } from "framer-motion";

// Reusable vault-door SVG (panels 3 + 8). Matches the banner: rounded frame,
// circular door + inner ring, 6-spoke wheel, hub, corner bolts.
export default function VaultDoor({ size = 96 }: { size?: number }) {
  const c = 50;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="16"
        fill="var(--vault-fill)"
        stroke="var(--vault)"
        strokeWidth="2.5"
      />
      <circle cx={c} cy={c} r="30" fill="#0a0e1a" stroke="var(--vault)" strokeWidth="2.5" />
      <circle cx={c} cy={c} r="22" fill="none" stroke="var(--vault)" strokeWidth="1" opacity="0.45" />
      <motion.g
        stroke="var(--vault)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ rotate: 0 }}
        whileInView={{ rotate: -12 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "50px 50px" }}
      >
        <line x1="26" y1={c} x2="74" y2={c} />
        <line x1="38" y1="29" x2="62" y2="71" />
        <line x1="62" y1="29" x2="38" y2="71" />
      </motion.g>
      <circle cx={c} cy={c} r="7" fill="var(--vault)" />
      <g fill="var(--vault)">
        <circle cx="24" cy="24" r="2.6" />
        <circle cx="76" cy="24" r="2.6" />
        <circle cx="24" cy="76" r="2.6" />
        <circle cx="76" cy="76" r="2.6" />
      </g>
    </svg>
  );
}
