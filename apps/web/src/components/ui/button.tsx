"use client";

import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-tight active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6E4BFF] disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    // solid purple pill with soft shadow
    "bg-[#6E4BFF] text-white shadow-[0_10px_30px_rgba(110,75,255,0.45)]",
  secondary:
    // glass morphism + purple text
    "backdrop-blur-xl bg-white/40 text-[#6E4BFF] border border-[#6E4BFF]/40 shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
  ghost:
    // subtle text-only / toolbar button
    "bg-transparent text-[#6E4BFF] shadow-none border border-transparent",
  icon:
    // round icon-only button
    "bg-[#6E4BFF] text-white shadow-[0_10px_30px_rgba(110,75,255,0.45)] aspect-square p-0",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  icon,
  ...props
}) => {
  const content = loading ? (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  ) : (
    <>
      {icon && <span className="mr-2 text-lg leading-none">{icon}</span>}
      {children}
    </>
  );

  return (
    <button
      {...props}
      className={clsx(
        base,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        variant === "icon" && "rounded-full h-12 w-12", // stronger circle for icon
        className
      )}
      disabled={loading || props.disabled}
    >
      {content}
    </button>
  );
};