"use client"

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react"

// SSR-safe placeholder; the real greeting is computed on the client before paint.
const FALLBACK = "I’m GM Louis."

// Anthropic-style greeting that follows the visitor's local clock.
function greetingForHour(h: number) {
  if (h < 5) return "Working late?"
  if (h < 12) return "Good morning."
  if (h < 17) return "Good afternoon."
  if (h < 22) return "Good evening."
  return "Working late?"
}

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect

/**
 * The empty-state greeting. The crisp <h1> is the real, accessible text; on
 * load, pixels stream out of the sentient sphere and assemble into it, then
 * the canvas hands off to the live text. Degrades to plain text for
 * reduced-motion / no-canvas, and a hard fail-safe guarantees the headline is
 * never left invisible.
 */
export function GreetingHeadline({ className, style }: { className?: string; style?: CSSProperties }) {
  const [text, setText] = useState(FALLBACK)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  // Resolve the greeting before paint, then roll it over on the hour.
  useIso(() => {
    setText(greetingForHour(new Date().getHours()))
  }, [])
  useEffect(() => {
    const t = setInterval(() => setText(greetingForHour(new Date().getHours())), 60_000)
    return () => clearInterval(t)
  }, [])

  // Hide the crisp text before paint so it doesn't flash before the particles form.
  useIso(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (text !== FALLBACK && h1Ref.current && !reduce) h1Ref.current.style.opacity = "0"
  }, [text])

  useEffect(() => {
    if (text === FALLBACK) return // never animate the SSR placeholder
    const h1 = h1Ref.current
    const canvas = canvasRef.current
    if (!h1 || !canvas) return

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const ctx = canvas.getContext("2d")
    if (reduce || !ctx) {
      h1.style.opacity = "1"
      return
    }

    let cancelled = false
    const reveal = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      try {
        h1.style.transition = "opacity 300ms ease"
        h1.style.opacity = "1"
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } catch {}
    }
    // Hard fail-safe: the hero headline must never be left blank.
    const failsafe = window.setTimeout(reveal, 2200)

    const run = () => {
      if (cancelled) return
      const rect = h1.getBoundingClientRect()
      if (rect.width < 2) {
        reveal()
        return
      }
      const cs = getComputedStyle(h1)
      const cream = cs.color || "#f2ead9"
      const amber = "#f0a93b"
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const W = window.innerWidth
      const H = window.innerHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = W + "px"
      canvas.style.height = H + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Sample the greeting's shape from an offscreen render of the same text.
      const ow = Math.ceil(rect.width)
      const oh = Math.ceil(rect.height)
      const off = document.createElement("canvas")
      off.width = ow
      off.height = oh
      const octx = off.getContext("2d")
      if (!octx) {
        reveal()
        return
      }
      octx.fillStyle = "#fff"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      try {
        ;(octx as unknown as { letterSpacing: string }).letterSpacing = cs.letterSpacing
      } catch {}
      octx.fillText(text, ow / 2, oh / 2)
      const data = octx.getImageData(0, 0, ow, oh).data

      const stride = W < 640 ? 3 : 4
      const targets: { x: number; y: number }[] = []
      for (let y = 0; y < oh; y += stride) {
        for (let x = 0; x < ow; x += stride) {
          if (data[(y * ow + x) * 4 + 3] > 130) targets.push({ x: rect.left + x, y: rect.top + y })
        }
      }
      if (!targets.length) {
        reveal()
        return
      }

      // Emit from across the sphere's on-screen radius (the sphere is centered).
      const ox = W / 2
      const oy = H / 2
      const sphereR = Math.min(W * 0.86, 640) / 2
      const P = targets.map((t) => {
        const ang = Math.random() * Math.PI * 2
        const rr = sphereR * (0.15 + 0.85 * Math.random())
        return {
          sx: ox + Math.cos(ang) * rr,
          sy: oy + Math.sin(ang) * rr,
          tx: t.x,
          ty: t.y,
          delay: Math.random() * 0.4,
          dur: 0.65 + Math.random() * 0.55,
          amber: Math.random() < 0.16,
          size: Math.random() < 0.5 ? 1.6 : 2.2,
        }
      })

      const t0 = performance.now()
      const ease = (p: number) => 1 - Math.pow(1 - p, 3)
      const frame = (now: number) => {
        if (cancelled) return
        const el = (now - t0) / 1000
        ctx.clearRect(0, 0, W, H)
        let done = true
        for (const p of P) {
          const lt = Math.min(1, Math.max(0, (el - p.delay) / p.dur))
          if (lt < 1) done = false
          const e = ease(lt)
          ctx.globalAlpha = Math.min(1, lt * 1.5)
          ctx.fillStyle = p.amber ? amber : cream
          ctx.fillRect(p.sx + (p.tx - p.sx) * e, p.sy + (p.ty - p.sy) * e, p.size, p.size)
        }
        if (!done) {
          rafRef.current = requestAnimationFrame(frame)
          return
        }
        // Hand off to the crisp, live text, then dissolve the particles.
        clearTimeout(failsafe)
        h1.style.transition = "opacity 300ms ease"
        h1.style.opacity = "1"
        let fa = 1
        const fade = () => {
          if (cancelled) return
          fa -= 0.07
          ctx.clearRect(0, 0, W, H)
          if (fa <= 0) return
          ctx.globalAlpha = fa
          for (const p of P) {
            ctx.fillStyle = p.amber ? amber : cream
            ctx.fillRect(p.tx, p.ty, p.size, p.size)
          }
          rafRef.current = requestAnimationFrame(fade)
        }
        fade()
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts
    const start = () => {
      try {
        run()
      } catch {
        reveal()
      }
    }
    if (fonts?.ready?.then) fonts.ready.then(() => requestAnimationFrame(start))
    else requestAnimationFrame(start)

    return () => {
      cancelled = true
      clearTimeout(failsafe)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text])

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[6]" />
      <h1 ref={h1Ref} className={className} style={style} suppressHydrationWarning>
        {text}
      </h1>
    </>
  )
}
