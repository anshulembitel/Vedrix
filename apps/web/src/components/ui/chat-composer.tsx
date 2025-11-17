"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { glassRounded } from "./glass";
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
};

export const ChatComposer = ({
  onSend,
  onVoiceToggle,
  voiceEnabled = true,
}: ChatComposerProps) => {
  const t = useTranslations("Home");
  const [msg, setMsg] = useState("");
const [isRecording,setIsRecording]=useState(false)
  const handleSend = () => {
    const trimmed = msg.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMsg("");
  };

  const handleVoiceClick = () => {
    if (!voiceEnabled) return;
    const next = !isRecording;
    setIsRecording(next);
    onVoiceToggle?.(next);
  };

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-md flex items-center gap-3 pointer-events-auto">
        <div
          className={clsx(
            glassRounded,
            "flex-1 flex items-center gap-3 h-12 md:h-14",
            
            "bg-slate-300/90 dark:bg-blue-950/80",
            
            "border border-slate-300/80 dark:border-blue-800/80"
          )}
        >
          <input
            placeholder={t("composerPlaceholder", { default: "Generate a name..." })}
            className="flex-1 bg-transparent outline-none text-sm md:text-base text-slate-800 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
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
                "bg-white/40 dark:bg-slate-900/60 border border-white/40 dark:border-slate-700/70",
                "shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
                "active:scale-95 transition-all"
              )}
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
          disabled={!msg.trim()}
          aria-label={t("sendMessage", { default: "Send message" })}
          className={clsx(
            "rounded-full flex items-center justify-center active:scale-95 transition-all",
            "w-11 h-11 md:w-12 md:h-12",
            "bg-[#6E4BFF] text-white shadow-[0_8px_20px_rgba(110,75,255,0.4)]",
            "disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          )}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="text-sm md:text-base" />
        </button>
      </div>
    </div>
  );
};