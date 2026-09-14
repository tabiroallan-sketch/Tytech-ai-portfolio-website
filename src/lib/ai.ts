export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * INTERACTIVE DEMO — AI ENDPOINT
 * ------------------------------
 * This is the ONLY function you need to change to connect a real AI agent.
 *
 * Right now it calls the local mock endpoint /api/demo-chat.
 *
 * TO CONNECT YOUR REAL AGENT:
 *   Option A (recommended): set the environment variable AI_API_URL in
 *     .env.local (or Vercel project settings) to your agent endpoint, e.g.
 *       AI_API_URL=https://your-n8n.hook.workflows.dev/agent
 *     Your endpoint receives:  { "message": string, "history": ChatMessage[] }
 *     and must return JSON:    { "reply": string }
 *
 *   Option B: replace the fetch below with a direct call to the OpenAI /
 *     Anthropic / n8n API of your choice. Keep the return shape:
 *       Promise<{ reply: string }>
 *
 * The chat UI in components/demo/interactive-demo.tsx does not need any
 * changes either way.
 */
export async function sendDemoMessage(
  message: string,
  history: ChatMessage[],
): Promise<{ reply: string }> {
  const customEndpoint = process.env.NEXT_PUBLIC_DEMO_CHAT_ENDPOINT;

  const res = await fetch(customEndpoint ?? "/api/demo-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    throw new Error(`Demo request failed (${res.status})`);
  }

  const data = (await res.json()) as { reply?: string };
  if (!data.reply) {
    throw new Error("Empty response from demo endpoint");
  }
  return { reply: data.reply };
}
