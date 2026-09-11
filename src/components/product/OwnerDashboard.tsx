import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { channelMix, drr, ownerKpis, revenueByUnit } from "@/data/demo";
import { AnimatedMetric, AnimatedNumber, formatTenge } from "./AnimatedMetric";
import { Window } from "./Window";

const ranges = ["Сегодня", "Неделя", "Месяц", "Квартал"] as const;
const properties = ["Все объекты", "ЛЕС Боровое", "ЛЕС Астана", "ЛЕС Алматы"] as const;

const trend = [
  { m: "Апр", v: 31.2, d: 34 },
  { m: "Май", v: 34.8, d: 36 },
  { m: "Июн", v: 39.1, d: 38 },
  { m: "Июл", v: 44.6, d: 40 },
  { m: "Авг", v: 46.9, d: 41 },
  { m: "Сен", v: 45.2, d: 42 },
  { m: "Окт", v: 48.6, d: 43 },
];

const fmtKpi = (format: string) => (format === "tenge" ? formatTenge : (n: number) => `${Math.round(n)}%`);

const tooltipStyle = { borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12, boxShadow: "0 8px 24px rgba(15,23,42,.08)" };

export const OwnerDashboard = () => {
  const [range, setRange] = useState<(typeof ranges)[number]>("Месяц");
  const [property, setProperty] = useState<(typeof properties)[number]>("Все объекты");
  const scale = property === "Все объекты" ? 1 : property === "ЛЕС Боровое" ? 0.44 : property === "ЛЕС Астана" ? 0.35 : 0.21;
  const rangeScale = range === "Сегодня" ? 0.033 : range === "Неделя" ? 0.23 : range === "Месяц" ? 1 : 2.9;

  return (
    <Window
      title="Guestra Analytics — Кабинет собственника"
      badge={
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg bg-background-alt p-0.5" role="tablist" aria-label="Период">
            {ranges.map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={range === r}
                onClick={() => setRange(r)}
                className={cn("rounded-md px-2.5 py-1 text-[11px] font-medium transition", range === r ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {r}
              </button>
            ))}
          </div>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value as (typeof properties)[number])}
            className="rounded-lg border border-border bg-white px-2 py-1 text-[11px] font-medium"
            aria-label="Объект"
          >
            {properties.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      }
    >
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
          {ownerKpis.map((k, i) => {
            const isMoney = k.format === "tenge";
            const value = isMoney ? (k.label === "Выручка" ? k.value * scale * rangeScale : k.value) : k.value;
            return (
              <AnimatedMetric
                key={k.label}
                label={k.label}
                value={value}
                format={k.format === "pctDelta" ? (n) => `+${Math.round(n)}%` : fmtKpi(k.format)}
                delta={k.delta}
                size="sm"
                className={cn(i === 0 && "col-span-2 md:col-span-2 xl:col-span-1")}
              />
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Выручка и доля прямых бронирований</div>
              <span className="text-[11px] text-muted-foreground">млн ₸ · %</span>
            </div>
            <div className="mt-3 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ left: -20, right: 0, top: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n) => [n === "v" ? `${v} млн ₸` : `${v}%`, n === "v" ? "Выручка" : "Прямые"]} />
                  <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#rev)" />
                  <Area type="monotone" dataKey="d" stroke="hsl(var(--violet))" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Выручка по направлениям</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-32 w-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueByUnit} dataKey="value" innerRadius={38} outerRadius={56} paddingAngle={3} stroke="none">
                      {revenueByUnit.map((r) => (
                        <Cell key={r.label} fill={r.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="flex-1 space-y-1.5 text-xs">
                {revenueByUnit.map((r) => (
                  <li key={r.label} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: r.color }} aria-hidden />
                    <span className="flex-1 text-muted-foreground">{r.label}</span>
                    <span className="num font-medium">{r.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Каналы бронирований</div>
            <div className="mt-3 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelMix} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="label" width={70} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Доля"]} cursor={{ fill: "hsl(var(--background-alt))" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14}>
                    {channelMix.map((c) => (
                      <Cell key={c.label} fill={c.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">DRR — ежедневный отчёт</div>
            <span className="text-[11px] text-muted-foreground">обновлено 5 мин назад</span>
          </div>
          <div className="scrollbar-none overflow-x-auto">
            <table className="w-full min-w-[520px] text-xs">
              <thead className="border-y border-border bg-background-alt/60 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-semibold">Период</th>
                  <th className="px-4 py-2 text-right font-semibold">Выручка</th>
                  <th className="px-4 py-2 text-right font-semibold">Загрузка</th>
                  <th className="px-4 py-2 text-right font-semibold">ADR</th>
                </tr>
              </thead>
              <tbody>
                {drr.map((d) => (
                  <tr key={d.label} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2.5 font-medium">{d.label}</td>
                    <td className="num px-4 py-2.5 text-right">
                      <AnimatedNumber value={d.revenue * scale} format={formatTenge} />
                    </td>
                    <td className="num px-4 py-2.5 text-right">{d.occupancy}%</td>
                    <td className="num px-4 py-2.5 text-right">{formatTenge(d.adr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Window>
  );
};
