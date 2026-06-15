// Shared 0..1 voice amplitude — written each frame by the chat audio analyser
// (chat-area.tsx) and read by the sentient-sphere shader (sentient-sphere.tsx).
// A plain mutable singleton on purpose: this updates ~60fps and must NOT trigger
// React re-renders.
export const voiceLevel = { value: 0 }
