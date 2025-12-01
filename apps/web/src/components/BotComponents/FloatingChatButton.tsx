"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

type FloatingChatButtonProps = {
  onClick: () => void;
};

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open chat"
      className="
        fixed bottom-4 right-4 z-50
        h-14 w-14 rounded-full
        bg-gradient-to-br from-[#6E4BFF] to-[#A855F7]
        shadow-[0_10px_25px_rgba(15,23,42,0.35)]
        flex items-center justify-center
        text-white
        hover:scale-105 active:scale-95 transition-transform
      "
    >
      <FontAwesomeIcon icon={faComments} className="text-xl" />
    </button>
  );
}