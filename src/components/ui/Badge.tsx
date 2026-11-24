import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "outline" | "module";
  moduleColor?: string;
}

export function Badge({
  className,
  variant = "primary",
  moduleColor,
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors";

  const variants = {
    primary: "bg-[#00D2EE]/15 text-[#00D2EE] border border-[#00D2EE]/30",
    secondary: "bg-[#004090]/30 text-blue-300 border border-blue-500/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    outline: "bg-transparent text-slate-300 border border-slate-600",
    module: "text-white border",
  };

  const style = moduleColor
    ? {
        backgroundColor: `${moduleColor}22`,
        borderColor: `${moduleColor}66`,
        color: moduleColor,
      }
    : undefined;

  return (
    <span className={cn(base, variants[variant], className)} style={style} {...props}>
      {children}
    </span>
  );
}
