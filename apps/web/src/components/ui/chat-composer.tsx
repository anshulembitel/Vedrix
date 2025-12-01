"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

type ChatComposerProps = {
  onSend: (msg: string) => void;
  onVoiceToggle?: (isRecording: boolean) => void;
  voiceEnabled?: boolean;
  isLoading?: boolean;
};

export const ChatComposer = ({
  onSend,
  onVoiceToggle,
  voiceEnabled = true,
  isLoading = false,
}: ChatComposerProps) => {
  const t = useTranslations("Home");
  const [msg, setMsg] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (isLoading) return;
    const trimmed = msg.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMsg("");
  };

  const handleVoiceClick = () => {
    if (!voiceEnabled || isLoading) return;
    const next = !isRecording;
    setIsRecording(next);
    onVoiceToggle?.(next);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md flex items-center gap-3">
        <div
          className={clsx(
            "flex-1 flex items-center gap-3 h-12 md:h-14 px-3",
            "rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm",
            "bg-slate-200 border border-slate-300",
            "dark:bg-slate-900/90 dark:border-slate-700",
            isLoading && "opacity-80"
          )}
        >
          <input
            placeholder={t("composerPlaceholder", {
              default: "Ask about Apparatus Solutions...",
            })}
            className={clsx(
              "flex-1 bg-transparent outline-none text-sm md:text-base",
              "text-slate-900 dark:text-slate-50",
              "placeholder:text-slate-500 dark:placeholder:text-slate-400",
              isLoading && "cursor-not-allowed"
            )}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!isLoading) handleSend();
              }
            }}
            disabled={isLoading}
          />

          {voiceEnabled && (
            <button
              type="button"
              onClick={handleVoiceClick}
              aria-label={
                isRecording
                  ? t("voiceStop", { default: "Stop voice input" })
                  : t("voiceStart", { default: "Start voice input" })
              }
              className={clsx(
                "flex items-center justify-center rounded-full w-9 h-9 md:w-10 md:h-10",
                "bg-white/70 border border-white/60",
                "dark:bg-slate-800 dark:border-slate-700",
                "shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
                "active:scale-95 transition-all",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              <FontAwesomeIcon
                icon={isRecording ? faMicrophoneSlash : faMicrophone}
                className={clsx(
                  "text-sm md:text-base",
                  isRecording
                    ? "text-red-500"
                    : "text-[#6E4BFF] dark:text-[#A855F7]"
                )}
              />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleSend}
          disabled={!msg.trim() || isLoading}
          aria-label={t("sendMessage", { default: "Send message" })}
          className={clsx(
            "rounded-full flex items-center justify-center active:scale-95 transition-all",
            "w-11 h-11 md:w-12 md:h-12",
            "bg-[#6E4BFF] text-white shadow-[0_8px_20px_rgba(110,75,255,0.4)]",
            "disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
          ) : (
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-sm md:text-base"
            />
          )}
        </button>
      </div>
    </div>
  );
};