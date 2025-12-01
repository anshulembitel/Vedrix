"use client";

import clsx from "clsx";
import Image from "next/image";

type ChatBubbleProps = {
  text?: string;
  from?: "bot" | "user";
  isTyping?: boolean;
  time?: string;
};

export const ChatBubble = ({
  text = "",
  from = "bot",
  isTyping = false,
  time,
}: ChatBubbleProps) => {
  const isBot = from === "bot";

  return (
    <div
      className={clsx(
        "flex items-start gap-2 w-full",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800">
          <Image
            src="/images/bot.png"
            alt="AI avatar"
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
      )}

      <div className="flex flex-col max-w-[75%]">
        <div
          className={clsx(
            
            "rounded-3xl px-3 py-2 text-sm whitespace-pre-line",
            "shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm",
            
            isBot
              ? "bg-slate-100 text-slate-900 border border-slate-200 " +
                "dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600"
              : 
                "bg-[#6E4BFF] text-white border border-purple-300 " +
                "dark:bg-[#E5DEFF] dark:text-slate-900 dark:border-purple-300"
          )}
        >
          {isTyping ? (
            <div className="flex items-center gap-1 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-300 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-300 animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-300 animate-bounce [animation-delay:0.3s]" />
            </div>
          ) : (
            text
          )}
        </div>

        {time && !isTyping && (
          <div
            className={clsx(
              "mt-1 text-[10px] text-slate-500 dark:text-slate-400",
              isBot ? "text-left" : "text-right"
            )}
          >
            {time}
          </div>
        )}
      </div>
      {!isBot && (
        <div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden border border-purple-300 dark:border-purple-400 bg-[#6E4BFF] dark:bg-[#7C3AED]">
          <Image
            src="/images/human.png"
            alt="User avatar"
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
      )}
    </div>
  );
};