"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  RotateCcw,
  SendHorizonal,
  Sparkles,
  TriangleAlert,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/ai";
import { sendDemoMessage } from "@/lib/ai";
import { cn } from "@/lib/utils";

interface InteractiveDemoProps {
  intro?: string;
  suggestions?: string[];
  className?: string;
}

const DEFAULT_SUGGESTIONS = [
  "What can you build for my business?",
  "How does an AI agent work?",
  "What is n8n?",
  "How do we get started?",
];

export function InteractiveDemo({
  intro = "Hi! This is a demo of the kind of AI agent we build for businesses — answering questions instantly, 24/7. Ask us anything.",
  suggestions = DEFAULT_SUGGESTIONS,
  className,
}: InteractiveDemoProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: intro },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setError(null);
    setInput("");
    const history = [...messages, { role: "user", content } as ChatMessage];
    setMessages(history);
    setLoading(true);

    try {
      const { reply } = await sendDemoMessage(
        content,
        history.filter((m) => m !== history[history.length - 1]),
      );
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("The demo agent couldn't respond. Please try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function handleClear() {
    setMessages([{ role: "assistant", content: intro }]);
    setError(null);
    setLoading(false);
  }

  return (
    <div
      className={cn(
        "gradient-border-card flex flex-col overflow-hidden rounded-2xl",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 text-emerald-300">
            <Bot className="h-5 w-5" aria-hidden />
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-success"
            />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">AI Assistant</p>
            <p className="text-[11px] text-zinc-500">
              Demo mode · sample responses
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear conversation"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs font-medium text-zinc-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Clear
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the demo AI assistant"
        className="flex h-[380px] flex-col gap-4 overflow-y-auto p-4 sm:p-5"
      >
        {messages.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "flex gap-2.5",
              message.role === "user" ? "flex-row-reverse" : "",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                message.role === "user"
                  ? "bg-white/[0.07] text-zinc-300"
                  : "bg-ink-800 text-emerald-300",
              )}
            >
              {message.role === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </span>
            <div
              className={cn(
                "max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                message.role === "user"
                  ? "rounded-tr-sm bg-emerald-400/15 text-emerald-50 ring-1 ring-inset ring-emerald-400/30"
                  : "glass-card rounded-tl-sm text-zinc-200",
              )}
            >
              {message.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2.5"
          >
            <span
              aria-hidden
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink-800 text-emerald-300"
            >
              <Bot className="h-4 w-4" />
            </span>
            <div
              className="glass-card flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3"
              role="status"
              aria-label="Assistant is typing"
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400/80"
                  style={{
                    animationDelay: `${dot * 150}ms`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-xs text-red-300"
            >
              <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
              {error}
              <button
                type="button"
                onClick={() => setError(null)}
                className="ml-auto font-semibold underline underline-offset-2"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 1 && !loading && (
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void handleSend(suggestion)}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-400/15"
              >
                <Sparkles className="h-3 w-3" aria-hidden />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSend();
        }}
        className="flex items-end gap-2 border-t border-white/[0.07] p-3 sm:p-4"
      >
        <label htmlFor="demo-chat-input" className="sr-only">
          Message the demo AI assistant
        </label>
        <textarea
          id="demo-chat-input"
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about services, automation or pricing…"
          disabled={loading}
          maxLength={500}
          className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-ink-900/70 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-emerald-400/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-ink-950 transition-all hover:bg-emerald-300 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          <SendHorizonal className="h-4.5 w-4.5" aria-hidden />
        </button>
      </form>
    </div>
  );
}
