"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ModeToggle } from "../../../components/mode-toggle";
import { Chip } from "../../components/ui/chip";
import { ChatBubble } from "../../components/ui/chat-bubble";
import { ChatComposer } from "../../components/ui/chat-composer";
import { Button } from "../../components/ui/button";
import Image from "next/image";
type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

const suggestionChips = [
  "Business names",
  "Game names",
  "Dish names",
  "App names",
];

export default function HomePage() {
  const t = useTranslations("Home");
  const [activeChip, setActiveChip] = useState<string>("Business names");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "Hey! I can help you generate unique and catchy names. Choose a category or start typing your idea.",
    },
    {
      id: 2,
      from: "user",
      text: "Give me some modern business name ideas.",
    },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSend = (msg: string) => {
    const text = msg.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text },
      {
        id: Date.now() + 1,
        from: "bot",
        text:
          "Here are a few ideas:\n• NovaSpark\n• BrandNest\n• PixelFoundry\n• Vedrix Labs\n\nYou can refine it further or change the category.",
      },
    ]);
  };

  return (
    <main
      className="
        h-screen flex justify-center
        bg-background text-foreground
        transition-colors duration-500
        overflow-hidden
      "
    >
     <div
       className="
         relative w-full max-w-md h-full px-4 pt-6 pb-4 flex flex-col
         bg-background text-foreground
         transition-colors duration-500
       "
     >
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
       <div
      className="
        relative h-20 w-20 md:h-11 md:w-11
       
        
      "
    >
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

        <section className="rounded-3xl bg-gradient-to-br from-[#6E4BFF] via-[#7C3AED] to-[#A855F7] p-4 text-white shadow-[0_20px_60px_rgba(110,75,255,0.6)] border border-white/20">
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <i className="fa-solid fa-sparkles text-sm" />
            Instantly generate unique names with Vedrix AI
          </p>
          <p className="text-xs text-white/85 mb-4">
            Ask in any language and get creative ideas tailored for your
            business, app, product or game.
          </p>
          <Button variant="secondary" size="sm" fullWidth={false}>
            <span className="flex items-center gap-2 text-xs">
              <i className="fa-solid fa-wand-magic-sparkles text-[10px]" />
              Try a sample prompt
            </span>
          </Button>
        </section>

        <section className="flex gap-2 overflow-x-auto pb-1 mt-3 no-scrollbar">
          {suggestionChips.map((label) => (
            <Chip
              key={label}
              label={label}
              active={activeChip === label}
              onClick={() => setActiveChip(label)}
            />
          ))}
        </section>

        <section
          ref={messagesContainerRef}
          className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto pr-1 pb-24"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.from === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <ChatBubble from={m.from} text={m.text} />
            </div>
          ))}
        </section>

        <div className="mt-3 shrink-0">
          <ChatComposer onSend={handleSend} />
        </div>
      </div>
    </main>
  );
}