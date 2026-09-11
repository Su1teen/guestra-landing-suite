import { motion } from "framer-motion";
import { MessageCircle, Phone, Globe, CreditCard, Utensils, Sparkles, Star, Database, BedDouble, Layers, BrainCircuit, Workflow, BarChart3, TrendingUp, KeyRound, FileSpreadsheet } from "lucide-react";
import { viewportOnce } from "@/lib/motion";
import { Logo } from "@/components/layout/Logo";

const sources = [
  { label: "WhatsApp", icon: MessageCircle, color: "text-whatsapp" },
  { label: "АТС / звонки", icon: Phone, color: "text-primary" },
  { label: "Booking.com · Airbnb", icon: Globe, color: "text-cyan" },
  { label: "Сайт отеля", icon: Globe, color: "text-violet" },
  { label: "Оплата", icon: CreditCard, color: "text-emerald" },
  { label: "Отзывы", icon: Star, color: "text-amber" },
];

const systems = [
  { label: "Текущая CRM", icon: Database },
  { label: "Текущая PMS", icon: BedDouble },
  { label: "POS / Ресторан", icon: Utensils },
  { label: "SPA-комплекс", icon: Sparkles },

  { label: "Отчеты и PowerBI", icon: FileSpreadsheet },
];

const core = [
  { label: "AI-продажи и Voice AI", icon: BrainCircuit },
  { label: "Автоматизация операций", icon: Workflow },
  { label: "Динамическое ценообразование", icon: TrendingUp },
  { label: "Аналитика и Guest 360", icon: BarChart3 },
];

const Node = ({ label, icon: Icon, color, i, side }: { label: string; icon: typeof Globe; color?: string; i: number; side: "l" | "r" }) => (
  <motion.li
    initial={{ opacity: 0, x: side === "l" ? -12 : 12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={viewportOnce}
    transition={{ delay: 0.1 + i * 0.06 }}
    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm"
  >
    <Icon className={`h-4 w-4 shrink-0 ${color ?? "text-white/60"}`} />
    <span className="truncate">{label}</span>
  </motion.li>
);

const Flow = ({ flip }: { flip?: boolean }) => (
  <div className="relative hidden lg:block" aria-hidden>
    <svg viewBox="0 0 120 400" className="h-full w-full" preserveAspectRatio="none">
      {Array.from({ length: 6 }).map((_, i) => {
        const y = 40 + i * 64;
        const d = flip ? `M0 200 C 60 200, 60 ${y}, 120 ${y}` : `M0 ${y} C 60 ${y}, 60 200, 120 200`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="6 10" className="dash-flow" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${i * 0.25}s` }} />
          </g>
        );
      })}
    </svg>
  </div>
);

export const IntegrationGraph = () => (
  <div className="grid gap-6 lg:grid-cols-[240px_80px_1fr_80px_240px] lg:items-stretch">
    <div>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/45">Каналы и данные</div>
      <ul className="flex flex-col gap-2">
        {sources.map((s, i) => (
          <Node key={s.label} {...s} i={i} side="l" />
        ))}
      </ul>
    </div>

    <Flow />

    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/15 to-violet/10 p-5"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-40" aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between">
          <Logo light />
          <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px]">Интеграционный слой</span>
        </div>
        <p className="mt-3 text-sm text-white/70">Guestra получает события из всех каналов и систем, связывает их с гостем и запускает действия.</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {core.map((c, i) => (
            <motion.li
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-ink/60 px-3 py-2.5 text-sm backdrop-blur"
            >
              <c.icon className="h-4 w-4 text-primary" />
              {c.label}
            </motion.li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-white/20 p-3 text-xs text-white/60">
          <Layers className="h-4 w-4 shrink-0 text-violet" />
          Собственные модули Guestra: CRM, PMS, Operations, Channel Manager и многое другое под ваши задачи.
        </div>
      </div>
    </motion.div>

    <Flow flip />

    <div>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/45">Ваши текущие системы</div>
      <ul className="flex flex-col gap-2">
        {systems.map((s, i) => (
          <Node key={s.label} {...s} i={i} side="r" />
        ))}
      </ul>
      <p className="mt-4 text-xs text-white/50">Остаются и работают. Guestra синхронизирует данные через API в обе стороны.</p>
    </div>
  </div>
);
