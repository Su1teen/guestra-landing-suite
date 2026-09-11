import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const formatTenge = (n: number) => `${Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ")} ₸`;

interface AnimatedNumberProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}

export const AnimatedNumber = ({ value, format = (n) => Math.round(n).toLocaleString("ru-RU"), duration = 1.2, className }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prev = useRef(0);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(prev.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [inView, value, duration, format]);

  return (
    <span ref={ref} className={cn("num", className)}>
      {format(inView ? value : 0)}
    </span>
  );
};

interface AnimatedMetricProps {
  label: string;
  value: number;
  format?: (n: number) => string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AnimatedMetric = ({ label, value, format, delta, deltaTone = "up", dark, size = "md", className }: AnimatedMetricProps) => (
  <div
    className={cn(
      "rounded-xl border p-4",
      dark ? "border-white/10 bg-white/[0.04]" : "border-border bg-white",
      className,
    )}
  >
    <div className={cn("text-[11px] font-medium uppercase tracking-wider", dark ? "text-white/50" : "text-muted-foreground")}>
      {label}
    </div>
    <div className="mt-2 flex items-baseline gap-2">
      <AnimatedNumber
        value={value}
        format={format}
        className={cn(
          "font-semibold tracking-tight",
          size === "sm" && "text-lg",
          size === "md" && "text-2xl",
          size === "lg" && "text-3xl md:text-4xl",
          dark ? "text-white" : "text-foreground",
        )}
      />
      {delta && (
        <span
          className={cn(
            "num text-xs font-medium",
            deltaTone === "up" && "text-emerald",
            deltaTone === "down" && "text-rose",
            deltaTone === "neutral" && (dark ? "text-white/50" : "text-muted-foreground"),
          )}
        >
          {delta}
        </span>
      )}
    </div>
  </div>
);
