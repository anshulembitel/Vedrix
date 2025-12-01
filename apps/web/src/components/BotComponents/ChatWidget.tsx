"use client";

import { useState } from "react";
import { ChatModal } from "./ChatModal";
import HomePage from "../../app/[locale]/page"
import { FloatingChatButton } from "./FloatingChatButton";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingChatButton onClick={() => setOpen(true)} />
      <ChatModal open={open} onClose={() => setOpen(false)}>
        <HomePage />
      </ChatModal>
    </>
  );
}