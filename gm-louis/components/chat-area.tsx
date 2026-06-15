"use client"

import { ArrowUp, Mic, Paperclip, Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ParticleOrb } from "@/components/particle-orb"

type Msg = { id: string; role: "user" | "assistant"; content: string }

const QUICK = [
  "What do you govern that Microsoft doesn't?",
  "Walk me through the governed loop.",
  "What is F.A.M. grounding?",
]

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function ChatArea() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading) return
    const next = [...messages, { id: uid(), role: "user" as const, content }]
    setMessages(next)
    setInput("")
    setLoading(true)
    const asstId = uid()
    setMessages((m) => [...m, { id: asstId, role: "assistant", content: "" }])
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      })
      if (!res.body) throw new Error("no stream")
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = dec.decode(value, { stream: true })
        setMessages((m) =>
          m.map((mm) => (mm.id === asstId ? { ...mm, content: mm.content + chunk } : mm)),
        )
      }
    } catch {
      setMessages((m) =>
        m.map((mm) =>
          mm.id === asstId ? { ...mm, content: "GM Louis is unreachable right now." } : mm,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  const empty = messages.length === 0

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="shader-orb shader-orb-1" />
        <div className="shader-orb shader-orb-2" />
        <div className="shader-orb shader-orb-3" />
      </div>
      <div className="absolute inset-0 opacity-[0.15] grid-background" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border/50 backdrop-blur-sm bg-background/30">
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold tracking-tight">GM Louis</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            reasoning agent · Compass-BlackBox IQ
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-amber-300/80 border border-amber-400/30 rounded-full px-2.5 py-1">
            governed · cited
          </span>
          {!empty && (
            <Button
              variant="ghost"
              size="sm"
              className="btn-3d gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMessages([])}
            >
              <Plus className="w-4 h-4" />
              New
            </Button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="relative z-10 flex-1 flex flex-col items-center overflow-hidden">
        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
            <div className="relative mb-6">
              <ParticleOrb />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 text-center font-[var(--font-heading)] tracking-tight">
              I&rsquo;m GM Louis.
            </h1>
            <p className="text-muted-foreground text-center max-w-xl mb-8">
              I reason over Microsoft&rsquo;s F.A.M. grounding and log every decision to a vault the
              human owns. Ask me anything.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
              {QUICK.map((q) => (
                <Button
                  key={q}
                  variant="secondary"
                  className="btn-3d btn-glow bg-gradient-to-br from-secondary/90 to-secondary/70 text-foreground hover:from-secondary/70 hover:to-secondary/50 backdrop-blur-sm shadow-lg font-medium"
                  onClick={() => send(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full overflow-y-auto px-4 md:px-6 py-6">
            <div className="max-w-3xl mx-auto flex flex-col gap-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-secondary/80 to-secondary/60 text-foreground"
                        : "bg-background/40 border border-border/40 text-foreground/90"
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1 items-center text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80 animate-pulse" />
                        thinking
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </div>
        )}

        {/* Input */}
        <div className="w-full max-w-3xl px-4 md:px-6 pb-6">
          <div className="input-3d bg-gradient-to-br from-secondary/70 via-secondary/60 to-secondary/50 backdrop-blur-xl rounded-2xl border border-border/50 p-4 shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Ask GM Louis…"
              rows={1}
              className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground text-lg min-h-[44px] max-h-40 font-normal"
            />
            <div className="flex items-center justify-between pt-2 border-t border-border/30">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Paperclip className="w-4 h-4 opacity-60" />
                <Settings className="w-4 h-4 opacity-60" />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="btn-3d h-9 w-9 text-white hover:text-foreground"
                  aria-label="Voice"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  disabled={loading || !input.trim()}
                  onClick={() => send(input)}
                  className="btn-3d btn-glow h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 hover:from-amber-300 hover:to-amber-700 text-black shadow-xl disabled:opacity-40"
                  aria-label="Send"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-3">
            Agents propose, humans promote · grounding is rented, memory is owned
          </p>
        </div>
      </div>
    </main>
  )
}
