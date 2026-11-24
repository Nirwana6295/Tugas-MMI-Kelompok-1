import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowColor?: string;
}

export function Card({ className, hoverEffect = false, glowColor, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[#091B30]/80 backdrop-blur-md border border-cyan-500/15 p-6 shadow-xl text-slate-100 transition-all duration-300",
        hoverEffect && "hover:border-cyan-500/40 hover:bg-[#0E223D]/90 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,210,238,0.15)]",
        className
      )}
      style={
        glowColor
          ? {
              borderColor: `${glowColor}33`,
              boxShadow: `0 4px 20px ${glowColor}15`,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-heading text-lg font-bold text-white tracking-tight", className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs sm:text-sm text-slate-400 font-normal leading-relaxed", className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-0", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center pt-4 border-t border-white/5", className)} {...props}>{children}</div>;
}
