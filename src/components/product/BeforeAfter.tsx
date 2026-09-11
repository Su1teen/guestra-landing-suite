import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/motion";

const rows: [string, string][] = [
  ["WhatsApp отдельно, звонки отдельно", "Единый inbox: WhatsApp, звонки, сайт, OTA"],
  ["Менеджер отвечает вручную и не успевает", "AI отвечает, проверяет наличие и бронирует"],
  ["CRM не знает, что гость уже был", "CRM знает гостя: история, LTV, предпочтения"],
  ["PMS живёт отдельно от продаж", "PMS знает бронь в момент подтверждения"],
  ["Цены меняют вручную раз в сезон", "Revenue знает спрос и меняет цену сам"],
  ["POS не связан с гостем", "POS связан с guest journey и LTV"],
  ["Отчёты собирают в таблицах к понедельнику", "Данные обновляются автоматически"],
  ["Собственник видит цифры постфактум", "Owner dashboard в реальном времени"],
];

export const BeforeAfter = () => {
  const [side, setSide] = useState<"before" | "after">("after");

  return (
    <div>
      <div className="mb-6 flex justify-center md:hidden">
        <div className="inline-flex rounded-full border border-border bg-white p-1" role="tablist" aria-label="Сравнение">
          {(["before", "after"] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={side === s}
              onClick={() => setSide(s)}
              className={cn(
                "min-h-[44px] flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition",
                side === s ? (s === "after" ? "bg-primary text-white" : "bg-foreground text-white") : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s === "before" ? "Без Guestra" : "С Guestra"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className={cn("rounded-3xl border border-border bg-background-alt p-5 sm:p-7", side !== "before" && "hidden md:block")}>
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-foreground">
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            Без Guestra
          </div>
          <ul className="mt-5 space-y-2.5">
            {rows.map(([before], i) => (
              <motion.li
                key={before}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-white/60 px-3.5 py-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden />
                {before}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center md:flex" aria-hidden>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white shadow-md">
            <ArrowRight className="h-5 w-5 text-primary" />
            <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-primary/20" />
          </div>
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-primary/20 bg-white p-5 shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.4)] sm:p-7",
            side !== "after" && "hidden md:block",
          )}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            С Guestra
          </div>
          <ul className="mt-5 space-y-2.5">
            {rows.map(([, after], i) => (
              <motion.li
                key={after}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-foreground shadow-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" strokeWidth={2.5} aria-hidden />
                {after}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
