"use client";

import { motion, type Variants } from "framer-motion";
import { EASE, container, fadeUp } from "./motion";

const logoIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: 0 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 6,
    transition: { type: "spring", stiffness: 120, damping: 13 },
  },
};

export default function Panel1() {
  return (
    <section className="panel">
      <div className="glow" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.45 }}
        style={{ position: "relative", zIndex: 1, maxWidth: 1100 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          variants={logoIn}
          src="/compass-logo.png"
          alt="Compass Rose"
          width={88}
          height={88}
          style={{ borderRadius: 20, display: "block", marginBottom: 22 }}
        />
        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: "clamp(40px, 6.2vw, 66px)",
            fontWeight: 750,
            margin: 0,
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
          }}
        >
          Compass-BlackBox IQ
        </motion.h1>
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(18px, 2.4vw, 26px)",
            color: "var(--ink-dim)",
            margin: "18px 0 0",
            maxWidth: 780,
          }}
        >
          The governance layer for an autonomous agent&rsquo;s{" "}
          <span
            style={{
              color: "var(--ink)",
              fontWeight: 600,
              position: "relative",
              whiteSpace: "nowrap",
            }}
          >
            memory &amp; competence
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -3,
                height: 3,
                background: "var(--vault)",
                transformOrigin: "left",
                borderRadius: 2,
              }}
            />
          </span>
          .
        </motion.p>
        <motion.p
          variants={fadeUp}
          style={{ fontSize: 16, color: "var(--ink-mute)", margin: "14px 0 0" }}
        >
          Grounded on Microsoft&rsquo;s F.A.M. intelligence layer &middot; owned by
          the human &middot; in plain text.
        </motion.p>
        <motion.div
          variants={fadeUp}
          style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}
        >
          <span className="pill" style={{ color: "var(--activity-t)" }}>
            3 Microsoft IQ surfaces
          </span>
          <span className="pill" style={{ color: "var(--ink-dim)" }}>
            governed loop
          </span>
          <span className="pill" style={{ color: "var(--ink-dim)" }}>
            human-gated
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
