import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Layers, Users } from "lucide-react";
import { portfolio } from "@/data/demo";
import { AnimatedNumber, formatMillions, formatTenge } from "./AnimatedMetric";
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

export const PortfolioDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const selected = portfolio[selectedIndex];
  return (
  <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
    <Window title="Guestra · Сеть объектов" badge={<span className="text-[11px] text-muted-foreground">3 объекта · {totalRooms} номеров</span>}>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background-alt/60 p-3 sm:col-span-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Выручка сети · месяц</div>
              <div className="num mt-1 text-3xl font-semibold tracking-tight">
                <AnimatedNumber value={totalRevenue} format={formatMillions} duration={1.6} />
              </div>
            </div>
            <div className="flex gap-6 text-xs">
              <div>
                <div className="text-muted-foreground">Ср. загрузка</div>
                <div className="num text-lg font-semibold">80%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Повторные гости в сети</div>
                <div className="num text-lg font-semibold">31%</div>
              </div>
            </div>
          </div>
        </div>
        {portfolio.map((p, i) => (
          <motion.button
            key={p.name}
            type="button"
            onClick={() => setSelectedIndex(i)}
            aria-pressed={selectedIndex === i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.15 + i * 0.1 }}
            className={`rounded-xl border p-3 text-left transition hover:border-primary/30 hover:bg-white ${selectedIndex === i ? "border-primary/50 bg-primary/5 ring-2 ring-primary/10" : "border-border bg-background-alt/60"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{p.name}</span>
              <span className="num text-[11px] text-muted-foreground">{p.rooms} ном.</span>
            </div>
            <Spark data={p.trend} />
            <div className="mt-2 flex items-end justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground">Выручка</div>
                <div className="num text-sm font-medium">
                  <AnimatedNumber value={p.revenue} format={formatMillions} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">Загрузка</div>
                <div className="num text-sm font-medium">{p.occupancy}%</div>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-2 text-[11px]"><span className="text-muted-foreground">ADR <b className="num font-medium text-foreground">{formatTenge(p.adr)}</b></span><span className="text-muted-foreground">RevPAR <b className="num font-medium text-foreground">{formatTenge(p.revpar)}</b></span></div>
          </motion.button>
        ))}
        <div className="rounded-xl border border-border bg-background-alt/60 p-4 sm:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">В фокусе · {selected.name}</span><span className="text-[11px] text-muted-foreground">Нажмите на объект выше</span></div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div><div className="text-[11px] text-muted-foreground">Выручка / номер в наличии · RevPAR</div><div className="num mt-1 text-lg font-semibold">{formatTenge(selected.revpar)}</div></div>
            <div><div className="text-[11px] text-muted-foreground">Прямые бронирования</div><div className="num mt-1 text-lg font-semibold">{selected.direct}%</div></div>
            <div><div className="text-[11px] text-muted-foreground">Что проверить</div><div className="mt-1 flex items-start gap-1 text-xs text-[hsl(28_80%_36%)]"><ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />{selected.issue}</div></div>
          </div>
        </div>
      </div>
    </Window>

    <div className="flex flex-col gap-3">
      {[
        { icon: Layers, t: "Портфель", d: "Выручка, загрузка и динамика по всей сети на одном экране." },
        { icon: Building2, t: "Объект", d: "Кабинет каждого отеля с собственными KPI и командой." },
        { icon: Users, t: "Отдел", d: "Продажи, уборка, ресторан: свои показатели и задачи." },
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
        <span className="text-muted-foreground">Гость, который жил в Объекте 01, в Объекте 02 уже знаком: предпочтения, история трат и статус хранятся на уровне сети.</span>
      </div>
    </div>
  </div>
  );
};
