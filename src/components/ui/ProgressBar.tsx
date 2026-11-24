import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  showLabel?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  showLabel = false,
  color = "#00D2EE",
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-300">
          <span>Progres Pembelajaran</span>
          <span className="font-bold text-[#00D2EE]">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-[#04162B] rounded-full overflow-hidden border border-cyan-500/20", heightStyles[size])}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,210,238,0.5)]"
          style={{
            width: `${clampedValue}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
