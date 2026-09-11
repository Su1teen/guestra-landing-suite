import { useState, useMemo } from "react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { channelMix, revenueByUnit } from "@/data/demo";
import { AnimatedMetric, AnimatedNumber, formatTenge } from "./AnimatedMetric";
import { Window } from "./Window";

const ranges = ["Сегодня", "Неделя", "Месяц", "Квартал"] as const;
const properties = ["Все объекты", "Объект 01", "Объект 02", "Объект 03"] as const;

/* ─── Linked KPI States ──────────────────────────────────────── */
type PropertyState = {
  revenue: number;
  occupancy: number;
  adr: number;
  revpar: number;
  direct: number;
  repeat: number;
  ancillary: number;
  revenueDelta: string;
  occupancyDelta: string;
  adrDelta: string;
  revparDelta: string;
  directDelta: string;
  repeatDelta: string;
  ancillaryDelta: string;
};

const propertyStates: Record<string, PropertyState> = {
  "Все объекты": {
    revenue: 18_400_000, occupancy: 82, adr: 74_500, revpar: 61_090,
    direct: 43, repeat: 31, ancillary: 24,
    revenueDelta: "+18,4%", occupancyDelta: "+6 п.п.", adrDelta: "+9,2%",
    revparDelta: "+15,8%", directDelta: "+11 п.п.", repeatDelta: "+7 п.п.", ancillaryDelta: "+24%",
  },
  "Объект 01": {
    revenue: 11_700_000, occupancy: 88, adr: 81_200, revpar: 71_456,
    direct: 51, repeat: 37, ancillary: 29,
    revenueDelta: "+22,1%", occupancyDelta: "+8 п.п.", adrDelta: "+11,5%",
    revparDelta: "+19,2%", directDelta: "+14 п.п.", repeatDelta: "+9 п.п.", ancillaryDelta: "+29%",
  },
  "Объект 02": {
    revenue: 6_700_000, occupancy: 74, adr: 64_300, revpar: 47_582,
    direct: 35, repeat: 25, ancillary: 18,
    revenueDelta: "+12,8%", occupancyDelta: "+3 п.п.", adrDelta: "+6,1%",
    revparDelta: "+10,4%", directDelta: "+7 п.п.", repeatDelta: "+4 п.п.", ancillaryDelta: "+18%",
  },
  "Объект 03": {
    revenue: 4_200_000, occupancy: 76, adr: 58_700, revpar: 44_612,
    direct: 38, repeat: 22, ancillary: 15,
    revenueDelta: "+9,4%", occupancyDelta: "+4 п.п.", adrDelta: "+5,3%",
    revparDelta: "+8,7%", directDelta: "+5 п.п.", repeatDelta: "+3 п.п.", ancillaryDelta: "+15%",
  },
};

const rangeScales: Record<string, number> = {
  "Сегодня": 0.033,
  "Неделя": 0.23,
  "Месяц": 1,
  "Квартал": 2.9,
};

/* ─── Trend data per property ────────────────────────────────── */
const trendData: Record<string, { m: string; v: number; d: number }[]> = {
  "Все объекты": [
    { m: "Апр", v: 12.1, d: 34 }, { m: "Май", v: 13.8, d: 36 }, { m: "Июн", v: 15.2, d: 38 },
    { m: "Июл", v: 17.1, d: 40 }, { m: "Авг", v: 17.8, d: 41 }, { m: "Сен", v: 17.2, d: 42 }, { m: "Окт", v: 18.4, d: 43 },
  ],
  "Объект 01": [
    { m: "Апр", v: 7.8, d: 42 }, { m: "Май", v: 8.5, d: 44 }, { m: "Июн", v: 9.6, d: 46 },
    { m: "Июл", v: 10.8, d: 48 }, { m: "Авг", v: 11.2, d: 49 }, { m: "Сен", v: 11.0, d: 50 }, { m: "Окт", v: 11.7, d: 51 },
  ],
  "Объект 02": [
    { m: "Апр", v: 4.3, d: 26 }, { m: "Май", v: 4.8, d: 28 }, { m: "Июн", v: 5.4, d: 30 },
    { m: "Июл", v: 6.1, d: 32 }, { m: "Авг", v: 6.4, d: 33 }, { m: "Сен", v: 6.2, d: 34 }, { m: "Окт", v: 6.7, d: 35 },
  ],
  "Объект 03": [
    { m: "Апр", v: 2.6, d: 30 }, { m: "Май", v: 2.9, d: 32 }, { m: "Июн", v: 3.2, d: 34 },
    { m: "Июл", v: 3.6, d: 36 }, { m: "Авг", v: 3.8, d: 37 }, { m: "Сен", v: 3.9, d: 38 }, { m: "Окт", v: 4.2, d: 38 },
  ],
};

/* ─── DRR data per property ──────────────────────────────────── */
const drrData: Record<string, { label: string; revenue: number; occupancy: number; adr: number }[]> = {
  "Все объекты": [
    { label: "Сегодня", revenue: 612_000, occupancy: 84, adr: 76_200 },
    { label: "Вчера", revenue: 548_000, occupancy: 79, adr: 73_900 },
    { label: "Этот месяц", revenue: 18_400_000, occupancy: 82, adr: 74_500 },
    { label: "Этот квартал", revenue: 53_360_000, occupancy: 78, adr: 72_100 },
  ],
  "Объект 01": [
    { label: "Сегодня", revenue: 389_000, occupancy: 90, adr: 82_400 },
    { label: "Вчера", revenue: 341_000, occupancy: 85, adr: 80_100 },
    { label: "Этот месяц", revenue: 11_700_000, occupancy: 88, adr: 81_200 },
    { label: "Этот квартал", revenue: 33_930_000, occupancy: 84, adr: 79_500 },
  ],
  "Объект 02": [
    { label: "Сегодня", revenue: 223_000, occupancy: 76, adr: 65_800 },
    { label: "Вчера", revenue: 207_000, occupancy: 72, adr: 64_100 },
    { label: "Этот месяц", revenue: 6_700_000, occupancy: 74, adr: 64_300 },
    { label: "Этот квартал", revenue: 19_430_000, occupancy: 71, adr: 62_800 },
  ],
  "Объект 03": [
    { label: "Сегодня", revenue: 142_000, occupancy: 78, adr: 59_500 },
    { label: "Вчера", revenue: 128_000, occupancy: 74, adr: 58_200 },
    { label: "Этот месяц", revenue: 4_200_000, occupancy: 76, adr: 58_700 },
    { label: "Этот квартал", revenue: 12_180_000, occupancy: 73, adr: 57_400 },
  ],
};

const tooltipStyle = { borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12, boxShadow: "0 8px 24px rgba(15,23,42,.08)" };

export const OwnerDashboard = () => {
  const [range, setRange] = useState<(typeof ranges)[number]>("Месяц");
  const [property, setProperty] = useState<(typeof properties)[number]>("Все объекты");

  const state = propertyStates[property];
  const trend = trendData[property];
  const drr = drrData[property];

  const kpis = useMemo(() => [
    { label: "Выручка", value: state.revenue * rangeScales[range], delta: state.revenueDelta, format: "tenge" as const },
    { label: "Загрузка", value: state.occupancy, delta: state.occupancyDelta, format: "pct" as const },
    { label: "ADR", value: state.adr, delta: state.adrDelta, format: "tenge" as const },
    { label: "RevPAR", value: state.revpar, delta: state.revparDelta, format: "tenge" as const },
    { label: "Прямые брони", value: state.direct, delta: state.directDelta, format: "pct" as const },
    { label: "Повторные", value: state.repeat, delta: state.repeatDelta, format: "pct" as const },
    { label: "Доп. выручка", value: state.ancillary, delta: state.ancillaryDelta, format: "pctDelta" as const },
  ], [state, range]);

  const fmtKpi = (format: string) => (format === "tenge" ? formatTenge : (n: number) => `${Math.round(n)}%`);

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
        {/* KPI Cards - fixed overflow */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 xl:grid-cols-7">
          {kpis.map((k, i) => (
            <AnimatedMetric
              key={k.label}
              label={k.label}
              value={k.value}
              format={k.format === "pctDelta" ? (n) => `+${Math.round(n)}%` : fmtKpi(k.format)}
              delta={k.delta}
              size="sm"
              className={cn(
                "min-h-[84px] overflow-hidden",
                i === 0 && "col-span-2 md:col-span-2 xl:col-span-1"
              )}
            />
          ))}
        </div>

        {/* Charts */}
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

        {/* DRR Table */}
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
                      <AnimatedNumber value={d.revenue} format={formatTenge} />
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
