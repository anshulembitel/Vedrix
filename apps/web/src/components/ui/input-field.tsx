"use client";

import clsx from "clsx";

export const InputField = ({
  icon,
  type = "text",
  placeholder,
  className,
}: {
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-3",
        "w-full max-w-md mx-auto h-14", 
        "bg-white/80 dark:bg-slate-900/40",
        "border border-slate-200 dark:border-slate-700",
        "rounded-2xl px-4",
        "shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {icon && <span className="text-slate-400 text-lg">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-slate-700 dark:text-white text-sm"
      />
    </div>
  );
};