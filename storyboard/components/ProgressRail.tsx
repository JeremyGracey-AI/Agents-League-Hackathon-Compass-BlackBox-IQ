"use client";

export default function ProgressRail({
  count,
  active,
}: {
  count: number;
  active: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 10 : 8,
            height: i === active ? 10 : 8,
            borderRadius: 999,
            background: i === active ? "var(--vault)" : "var(--line)",
            transition: "all .3s var(--ease)",
          }}
        />
      ))}
    </div>
  );
}
