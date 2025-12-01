"use client";

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ChatModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function ChatModal({ open, onClose, children }: ChatModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Clickable overlay to close */}
      <button
        type="button"
        aria-label="Close chat"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative w-full h-[85%] md:max-w-md md:h-[600px] bg-background rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden">
        {/* Close icon */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="
            absolute top-5 right-1 z-10
            inline-flex items-center justify-center
            h-7 w-7 rounded-tr-2xl
            bg-slate-100/80 text-slate-500
            hover:bg-slate-200 hover:text-slate-700
            dark:bg-slate-800/80 dark:text-slate-300
            dark:hover:bg-slate-700
            transition-colors
          "
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>

        {children}
      </div>
    </div>
  );
}