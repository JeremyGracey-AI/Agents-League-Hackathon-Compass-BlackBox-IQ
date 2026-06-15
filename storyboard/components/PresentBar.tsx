"use client";

const btn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "var(--ink-dim)",
  cursor: "pointer",
  fontSize: 16,
  padding: "4px 12px",
  lineHeight: 1,
};

export default function PresentBar({
  presenting,
  onToggle,
  onPrev,
  onNext,
}: {
  presenting: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          background: "rgba(16,26,46,0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "6px 10px",
          pointerEvents: "auto",
        }}
      >
        <button aria-label="Previous" onClick={onPrev} style={btn}>
          ‹
        </button>
        <button aria-label={presenting ? "Pause" : "Play"} onClick={onToggle} style={{ ...btn, color: "var(--vault-t)" }}>
          {presenting ? "❙❙" : "▶"}
        </button>
        <button aria-label="Next" onClick={onNext} style={btn}>
          ›
        </button>
      </div>
    </div>
  );
}
