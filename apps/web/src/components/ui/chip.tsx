"use client";

import clsx from "clsx";
import { glassPill } from "./glass";

export type ChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export const Chip = ({ label, active, onClick }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-sm font-medium whitespace-nowrap transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-[#6E4BFF] dark:focus-visible:ring-[#A855F7] focus-visible:ring-offset-transparent",
        glassPill,
        active
          ? "text-white bg-gradient-to-br from-[#6E4BFF] via-[#7C3AED] to-[#A855F7] border-transparent shadow-[0_6px_16px_rgba(110,75,255,0.45)] dark:text-white"
          : "border border-slate-200/80 bg-white/60 text-slate-700 hover:bg-white/80 dark:border-slate-700/80 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/70"
      )}
    >
      {label}
    </button>
  );
};