"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ModeToggle } from "../../../components/mode-toggle";
import { Chip } from "../../components/ui/chip";
import { ChatBubble } from "../../components/ui/chat-bubble";
import { ChatComposer } from "../../components/ui/chat-composer";
import Image from "next/image";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  time?: string;
};

const suggestionChips = [
  "Our services",
  "Digital marketing packages",
  "SEO packages",
  "Local SEO",
  "Business process automation",
] as const;

const chipPrompts: Record<(typeof suggestionChips)[number], string> = {
  "Our services":
    "Give me a clear overview of all the services Apparatus Solutions offers.",
  "Digital marketing packages":
    "Explain the digital marketing packages offered by Apparatus Solutions, including Starter, Booster and Premium with pricing and guarantees.",
  "SEO packages":
    "Describe the different SEO packages from Apparatus Solutions like Startup, Growth, Premium and High Volume, with what is included.",
  "Local SEO":
    "Explain Apparatus Solutions' Local SEO services and packages, including who they are best suited for.",
  "Business process automation":
    "Tell me how Apparatus Solutions does Business Process Automation (BPA) and share some example use cases.",
};

const STORAGE_KEY = "vedrix_chat_messages";

const getTimeString = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function HomePage() {
  const t = useTranslations("Home");
  const [activeChip, setActiveChip] = useState<string>("Our services");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text:
        "Hi, I’m Vedrix AI, your assistant for Apparatus Solutions. " +
        "You can type your question, or tap a chip below like “Our services” or “SEO packages” to get a quick overview.",
      time: getTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async (msg: string) => {
    const text = msg.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      from: "user",
      text,
      time: getTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: [...messages, userMessage],
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        from: "bot",
        text:
          data?.reply ??
          "Sorry, I couldn't answer that from the knowledge base.",
        time: getTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          from: "bot",
          text: "Something went wrong talking to the AI. Please try again.",
          time: getTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (label: (typeof suggestionChips)[number]) => {
    if (isLoading) return;
    setActiveChip(label);

    const prompt = chipPrompts[label];
    if (prompt) {
      handleSend(prompt);
    }
  };

  return (
    <main
      className="
        min-h-screen flex items-center justify-center
        bg-background text-foreground
        transition-colors duration-500
        overflow-hidden
      "
    >
      <div
        className="
          relative w-full max-w-md h-[min(720px,100vh-2rem)] px-4 pt-6 pb-4 flex flex-col
          bg-background text-foreground
          transition-colors duration-500
          rounded-3xl shadow-xl border border-slate-200/60 dark:border-slate-800/60
          overflow-hidden
        "
      >
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 md:h-11 md:w-11">
              <Image
                src="/V.png"
                alt="Vedrix logo"
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 40px, 44px"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2 text-slate-500">
                {t("title")}
                <i className="fa-solid fa-wand-magic-sparkles text-xs text-[#A855F7]" />
              </h1>
            </div>
          </div>
          <ModeToggle />
        </header>

        <section className="flex gap-2 overflow-x-auto pb-1 mt-3 no-scrollbar">
          {suggestionChips.map((label) => (
            <Chip
              key={label}
              label={label}
              active={activeChip === label}
              disabled={isLoading}
              onClick={() => handleChipClick(label)}
            />
          ))}
        </section>

        <section
          ref={messagesContainerRef}
          className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto pr-1 pb-28"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.from === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <ChatBubble from={m.from} text={m.text} time={m.time} />
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <ChatBubble from="bot" isTyping />
            </div>
          )}
        </section>

        <div className="absolute inset-x-4 bottom-12">
          <ChatComposer onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}