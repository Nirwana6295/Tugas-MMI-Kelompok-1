import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "module";
  size?: "sm" | "md" | "lg";
  moduleColor?: string;
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", moduleColor, glow = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 font-medium",
      md: "text-sm px-5 py-2.5 gap-2 font-semibold",
      lg: "text-base px-6 py-3.5 gap-2.5 font-bold tracking-wide",
    };

    const variantStyles = {
      primary: cn(
        "bg-[#00D2EE] text-[#011024] hover:bg-[#00B8D4] border border-[#00D2EE]",
        glow && "shadow-[0_0_20px_rgba(0,210,238,0.4)]"
      ),
      secondary: cn(
        "bg-[#004090] text-white hover:bg-[#0256B8] border border-blue-400/30",
        glow && "shadow-[0_0_20px_rgba(0,64,144,0.4)]"
      ),
      outline:
        "bg-transparent text-[#00D2EE] border border-[#00D2EE]/40 hover:bg-[#00D2EE]/10 hover:border-[#00D2EE]",
      ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/10",
      danger: "bg-rose-600 text-white hover:bg-rose-700 border border-rose-500",
      module: cn(
        "text-white border transition-all",
        glow && "shadow-lg"
      ),
    };

    const style = moduleColor
      ? {
          backgroundColor: moduleColor,
          borderColor: `${moduleColor}99`,
          boxShadow: glow ? `0 0 20px ${moduleColor}66` : undefined,
        }
      : undefined;

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
