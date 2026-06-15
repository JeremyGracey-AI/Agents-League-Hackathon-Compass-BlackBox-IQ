export const runtime = "nodejs";
export const maxDuration = 30;

// GM Louis's voice. Default = ElevenLabs "Daniel" (calm, authoritative) — override
// with ELEVENLABS_VOICE_ID. Needs ELEVENLABS_API_KEY in the project's env vars.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "onwK4e9ZLuTAKqWW03F9";
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_turbo_v2_5";

export async function POST(req: Request) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return new Response(null, { status: 204 }); // no key → silent (text-only)

  let text = "";
  try {
    const body = (await req.json()) as { text?: unknown };
    if (typeof body.text === "string") text = body.text;
  } catch {
    return new Response(null, { status: 204 });
  }
  text = text.replace(/[*_`#>]/g, "").trim().slice(0, 2500); // strip markdown, cap length
  if (!text) return new Response(null, { status: 204 });

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": key,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: MODEL,
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.75,
            style: 0.1,
            use_speaker_boost: true,
          },
        }),
      }
    );
    if (!res.ok || !res.body) return new Response(null, { status: 204 });
    return new Response(res.body, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(null, { status: 204 });
  }
}
