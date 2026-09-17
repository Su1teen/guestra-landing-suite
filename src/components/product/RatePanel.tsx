import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedNumber, formatTenge } from "./AnimatedMetric";

export const RatePanel = ({ className }: { className?: string }) => (
  <div className={cn("window-dark p-4", className)}>
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Актуальная цена</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald/20 px-2 py-0.5 text-[10px] font-semibold text-emerald">
        <TrendingUp className="h-3 w-3" /> +15%
      </span>
    </div>
    <div className="mt-1.5 text-3xl font-semibold tracking-tight">
      <AnimatedNumber value={67_000} format={formatTenge} />
    </div>
    <div className="mt-0.5 text-[11px] text-white/45">Forest House · за ночь · 18–20 октября</div>

    <div className="mt-4">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-white/60">Загрузка</span>
        <span className="num font-medium">82%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
          initial={{ width: 0 }}
          whileInView={{ width: "82%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>

    <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-white/45">Причина изменения</div>
      <div className="mt-0.5 text-xs">
        <span className="num font-semibold text-emerald">+15%</span> - высокая загрузка на выходные
      </div>
    </div>

    <div className="mt-3 grid grid-cols-7 items-end gap-1" aria-hidden>
      {[38, 44, 41, 52, 60, 78, 82].map((h, i) => (
        <motion.div
          key={i}
          className={cn("rounded-sm", i >= 5 ? "bg-primary" : "bg-white/20")}
          initial={{ height: 0 }}
          whileInView={{ height: `${h * 0.5}px` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 * i }}
        />
      ))}
    </div>
  </div>
);
