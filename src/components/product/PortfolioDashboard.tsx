import { motion } from "framer-motion";
import { Building2, Layers, Users } from "lucide-react";
import { portfolio } from "@/data/demo";
import { AnimatedNumber, formatTenge } from "./AnimatedMetric";
import { Window } from "./Window";
import { viewportOnce } from "@/lib/motion";

const Spark = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - (v / max) * 36}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <motion.polyline
        points={pts}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2 }}
      />
    </svg>
  );
};

const totalRevenue = portfolio.reduce((s, p) => s + p.revenue, 0);
const totalRooms = portfolio.reduce((s, p) => s + p.rooms, 0);

export const PortfolioDashboard = () => (
  <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
    <Window dark title="Guestra — Портфель · Сеть объектов" badge={<span className="text-[11px] text-white/50">3 объекта · {totalRooms} номеров</span>}>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:col-span-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/45">Выручка сети · месяц</div>
              <div className="num mt-1 text-3xl font-semibold tracking-tight">
                <AnimatedNumber value={totalRevenue} format={formatTenge} duration={1.6} />
              </div>
            </div>
            <div className="flex gap-6 text-xs">
              <div>
                <div className="text-white/45">Ср. загрузка</div>
                <div className="num text-lg font-semibold">80%</div>
              </div>
              <div>
                <div className="text-white/45">Повторные гости в сети</div>
                <div className="num text-lg font-semibold">31%</div>
              </div>
            </div>
          </div>
        </div>
        {portfolio.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{p.name}</span>
              <span className="num text-[11px] text-white/45">{p.rooms} ном.</span>
            </div>
            <Spark data={p.trend} />
            <div className="mt-2 flex items-end justify-between">
              <div>
                <div className="text-[10px] text-white/45">Выручка</div>
                <div className="num text-sm font-medium">
                  <AnimatedNumber value={p.revenue} format={formatTenge} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/45">Загрузка</div>
                <div className="num text-sm font-medium">{p.occupancy}%</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Window>

    <div className="flex flex-col gap-3">
      {[
        { icon: Layers, t: "Портфель", d: "Выручка, загрузка и динамика по всей сети на одном экране." },
        { icon: Building2, t: "Объект", d: "Кабинет каждого отеля с собственными KPI и командой." },
        { icon: Users, t: "Отдел", d: "Продажи, housekeeping, F&B — свои метрики и задачи." },
      ].map((l, i) => (
        <motion.div
          key={l.t}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="window flex items-start gap-3 p-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <l.icon className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold">{l.t}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{l.d}</div>
          </div>
        </motion.div>
      ))}
      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
        <span className="font-semibold text-primary">Один гость — одна история.</span>{" "}
        <span className="text-muted-foreground">Гость, который жил в Объекте 01, в Объекте 02 уже известен: предпочтения, LTV и статус — на уровне сети.</span>
      </div>
    </div>
  </div>
);
