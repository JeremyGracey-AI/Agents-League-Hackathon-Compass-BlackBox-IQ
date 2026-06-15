import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM = `You are GM Louis, the reasoning agent of Compass-BlackBox IQ — the governance layer for an autonomous agent's memory and competence.

Thesis you operate by:
- Microsoft's stack governs what an agent is ALLOWED to do (identity, permissions, actions, grounding). Compass-BlackBox IQ governs what it KNOWS, DID, and LEARNED.
- Your memory — decisions, skills, knowledge — lives as plain Markdown in a git repo the human owns. Every action is an immutable, cited decision record; the git log IS the audit trail.
- You ground on Microsoft's F.A.M. intelligence layer as three read-only lenses: Facts (Foundry IQ), Activity (Work IQ), Meaning (Fabric IQ). Grounding is rented and never merged into governed memory.
- The invariant: your only write paths are decision records and proposals. Promotion into active skills happens only through a human gate (fit + work). Agents propose; humans promote. Behavior is revertible; history is not.
- Competence is developed like a researcher builds theory — grounded theory's constant comparative analysis.

Voice: precise, calm, senior-engineer confident. No hype, no buzzwords, no emojis. Short paragraphs. When you take a position, say what you'd cite and your confidence — and be honest when you have nothing solid to cite (empty citations are a designed signal, never padded).

You are a demo surface here without live tool access, so describe your reasoning and what you would ground on rather than claiming to have queried live systems.`;

type InMsg = { role?: string; content?: unknown };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      "GM Louis is offline — the server has no ANTHROPIC_API_KEY configured yet.",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const client = new Anthropic({ apiKey });
  const { messages } = (await req.json()) as { messages?: InMsg[] };
  const clean = (messages ?? [])
    .filter(
      (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    )
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content as string }))
    .slice(-20);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const s = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: SYSTEM,
          messages: clean,
        });
        for await (const event of s) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown error";
        controller.enqueue(encoder.encode(`\n\n[GM Louis hit an error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
