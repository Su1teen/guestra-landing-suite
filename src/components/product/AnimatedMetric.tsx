import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

export const formatTenge = (n: number) => `${Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ")}\u00a0₸`;

/** Крупные суммы округляются до миллионов, чтобы анимация не показывала «220 994 849 ₸». */
export const formatMillions = (n: number) => `${(n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}\u00a0млн\u00a0₸`;

interface AnimatedNumberProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}

/**
 * Число всегда отрисовано в итоговом значении (в том числе при пререндере и без JS).
 * Анимация применяется только после изменения пользователем фильтра или значения.
 */
export const AnimatedNumber = ({ value, format = (n) => Math.round(n).toLocaleString("ru-RU"), duration = 1.2, className }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prev = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const from = prev.current ?? value;
    prev.current = value;
    if (prefersReducedMotion() || from === value) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(from, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, format]);

  return (
    <span ref={ref} className={cn("num", className)}>
      {format(value)}
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
      "flex flex-col justify-between min-h-[88px] rounded-xl border p-3.5 sm:p-4",
      dark ? "border-white/10 bg-white/[0.04]" : "border-border bg-white",
      className,
    )}
  >
    <div className={cn("text-[11px] font-medium uppercase tracking-wider leading-tight text-balance", dark ? "text-white/50" : "text-muted-foreground")}>
      {label}
    </div>
    <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <AnimatedNumber
        value={value}
        format={format}
        className={cn(
          "font-semibold tracking-tight",
          size === "sm" && "text-base sm:text-lg",
          size === "md" && "text-xl sm:text-2xl",
          size === "lg" && "text-2xl sm:text-3xl md:text-4xl",
          dark ? "text-white" : "text-foreground",
        )}
      />
      {delta && (
        <span
          className={cn(
            "num text-xs font-semibold whitespace-nowrap",
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
