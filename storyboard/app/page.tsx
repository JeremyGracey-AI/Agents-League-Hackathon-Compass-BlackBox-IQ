"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProgressRail from "../components/ProgressRail";
import PresentBar from "../components/PresentBar";
import Panel1 from "../components/Panel1";
import Panel2 from "../components/Panel2";
import Panel3 from "../components/Panel3";
import Panel4 from "../components/Panel4";
import Panel5 from "../components/Panel5";
import Panel6 from "../components/Panel6";
import Panel7 from "../components/Panel7";
import Panel8 from "../components/Panel8";

const PANELS = [Panel1, Panel2, Panel3, Panel4, Panel5, Panel6, Panel7, Panel8];
const DURATIONS = [4000, 7000, 9000, 8000, 9000, 7000, 7000, 8000];

export default function Page() {
  const scroller = useRef<HTMLElement>(null);
  const sections = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    const idx = (i + PANELS.length) % PANELS.length;
    sections.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(idx);
  }, []);

  // ?present=1 -> start presenting + autoplay
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("present") === "1") {
      setPresenting(true);
    }
  }, []);

  // track active panel on manual scroll
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = sections.current.findIndex((s) => s === e.target);
            if (i >= 0) setActive(i);
          }
        }
      },
      { root, threshold: 0.55 }
    );
    sections.current.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // autoplay timeline while presenting
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!presenting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setTimeout(() => goTo(active + 1), DURATIONS[active] ?? 7000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [presenting, active, goTo]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setPresenting((p) => !p);
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <>
      <ProgressRail count={PANELS.length} active={active} />
      <main className="snap" ref={scroller}>
        {PANELS.map((P, i) => (
          <div
            key={i}
            ref={(el) => {
              sections.current[i] = el;
            }}
            style={{ scrollSnapAlign: "start" }}
          >
            <P />
          </div>
        ))}
      </main>
      <PresentBar
        presenting={presenting}
        onToggle={() => setPresenting((p) => !p)}
        onPrev={() => goTo(active - 1)}
        onNext={() => goTo(active + 1)}
      />
    </>
  );
}
