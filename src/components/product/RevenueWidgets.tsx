import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Window } from "./Window";

/* ─── Согласование и история цен ──────────────────────────────── */

const history = [
  { when: "Сегодня, 10:42", what: "Forest House · сб 25 окт", change: "74 000 → 81 500 ₸", who: "Утвердила Айдана", tone: "done" },
  { when: "Сегодня, 09:15", what: "Lake House · вс 26 окт", change: "96 000 → 92 000 ₸", who: "Ждёт согласования", tone: "wait" },
  { when: "Вчера, 18:20", what: "Sky · пт 24 окт", change: "110 000 → 104 000 ₸", who: "Отклонено: нижняя граница", tone: "reject" },
  { when: "Вчера, 11:05", what: "A-Frame · 1–3 ноя", change: "Мин. срок 2 ночи", who: "Изменил Тимур вручную", tone: "manual" },
] as const;

const toneClass = {
  done: "bg-emerald/10 text-emerald",
  wait: "bg-amber/15 text-[hsl(28_80%_34%)]",
  reject: "bg-rose/10 text-rose",
  manual: "bg-violet/10 text-violet",
};

export const RateHistory = ({ className }: { className?: string }) => (
  <Window title="Управление доходами · Согласование и история" className={className} bodyClassName="p-0">
    <ul className="divide-y divide-border/70">
      {history.map((h) => (
        <li key={h.when + h.what} className="grid gap-1 px-4 py-3 text-xs sm:grid-cols-[110px_1fr_auto] sm:items-center sm:gap-4">
          <span className="num text-muted-foreground">{h.when}</span>
          <span><b className="font-semibold">{h.what}</b> <span className="num text-muted-foreground">· {h.change}</span></span>
          <span className={cn("w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold", toneClass[h.tone])}>{h.who}</span>
        </li>
      ))}
    </ul>
  </Window>
);

/* ─── Календарь тарифов с ограничениями ───────────────────────── */

const calendar = [
  { d: "24", w: "Пт", rate: "70 000", eff: "74 000", tags: [] },
  { d: "25", w: "Сб", rate: "70 000", eff: "81 500", tags: ["Мин. 2 ночи"] },
  { d: "26", w: "Вс", rate: "70 000", eff: "74 000", tags: ["Закрыт заезд"] },
  { d: "27", w: "Пн", rate: "60 000", eff: "60 000", tags: [] },
  { d: "28", w: "Вт", rate: "60 000", eff: "58 000", tags: [] },
  { d: "29", w: "Ср", rate: "60 000", eff: "58 000", tags: [] },
  { d: "30", w: "Чт", rate: "60 000", eff: "62 000", tags: [] },
];

export const RateCalendar = ({ className }: { className?: string }) => (
  <Window title="Тарифный план «Гибкий» · Forest House" className={className} bodyClassName="p-0">
    <div className="overflow-x-auto">
      <div className="grid min-w-[560px] grid-cols-7 divide-x divide-border/70 text-center text-xs">
        {calendar.map((c) => (
          <div key={c.d} className={cn("p-2.5", (c.w === "Сб" || c.w === "Вс") && "bg-amber/[0.05]")}>
            <div className="num font-semibold">{c.d} <span className="font-normal text-muted-foreground">{c.w}</span></div>
            <div className="num mt-2 text-[10px] text-muted-foreground line-through decoration-border">{c.rate}</div>
            <div className="num text-sm font-semibold">{c.eff}</div>
            <div className="mt-2 flex min-h-[38px] flex-col items-center gap-1">
              {c.tags.map((t) => <span key={t} className="rounded bg-primary/10 px-1.5 py-0.5 text-[9.5px] font-semibold leading-tight text-primary">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Window>
);

/* ─── Темп продаж ─────────────────────────────────────────────── */

const pace = [
  { label: "−60", now: 18, last: 14 }, { label: "−45", now: 27, last: 22 }, { label: "−30", now: 41, last: 33 },
  { label: "−21", now: 52, last: 45 }, { label: "−14", now: 63, last: 58 }, { label: "−7", now: 74, last: 70 }, { label: "сегодня", now: 82, last: 76 },
];

export const PaceChart = ({ className }: { className?: string }) => (
  <Window title="Темп продаж · выходные 25–26 октября" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex h-40 items-end gap-3">
      {pace.map((p) => (
        <div key={p.label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex h-full w-full items-end justify-center gap-1">
            <span className="w-1/3 rounded-t bg-border" style={{ height: `${p.last}%` }} />
            <span className="w-1/3 rounded-t bg-primary" style={{ height: `${p.now}%` }} />
          </div>
          <span className="num text-[10px] text-muted-foreground">{p.label}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary" /> Загрузка в этом году</span>
      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-border" /> Год назад</span>
      <span>Дней до заезда</span>
    </div>
  </Window>
);

/* ─── Калькулятор: сколько стоит процент цены ─────────────────── */

const fmt = (n: number) => `${(n / 1_000_000).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}\u00a0млн\u00a0₸`;

export const PriceImpactCalculator = ({ className }: { className?: string }) => {
  const [rooms, setRooms] = useState(48);
  const [adr, setAdr] = useState(65_000);
  const [occ, setOcc] = useState(70);
  const [lift, setLift] = useState(5);

  const result = useMemo(() => {
    const yearly = rooms * 365 * (occ / 100) * adr;
    return { yearly, extra: yearly * (lift / 100) };
  }, [rooms, adr, occ, lift]);

  const field = (label: string, value: string, slider: React.ReactNode) => (
    <div>
      <div className="flex items-baseline justify-between text-sm"><span className="font-medium">{label}</span><span className="num text-muted-foreground">{value}</span></div>
      <div className="mt-3">{slider}</div>
    </div>
  );

  return (
    <div className={cn("grid gap-5 rounded-3xl border border-border bg-white p-5 sm:p-7 lg:grid-cols-[1fr_340px]", className)}>
      <div className="grid gap-6">
        {field("Номеров", String(rooms), <Slider value={[rooms]} min={10} max={300} step={1} onValueChange={([v]) => setRooms(v)} aria-label="Номеров" />)}
        {field("Средняя цена за ночь", `${adr.toLocaleString("ru-RU")} ₸`, <Slider value={[adr]} min={15_000} max={200_000} step={1_000} onValueChange={([v]) => setAdr(v)} aria-label="Средняя цена" />)}
        {field("Загрузка за год", `${occ}%`, <Slider value={[occ]} min={20} max={100} step={1} onValueChange={([v]) => setOcc(v)} aria-label="Загрузка" />)}
        {field("Рост средней цены", `${lift}%`, <Slider value={[lift]} min={1} max={15} step={1} onValueChange={([v]) => setLift(v)} aria-label="Рост средней цены" />)}
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-background-alt p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Выручка от номеров за год</p>
          <p className="num mt-1 text-lg font-semibold">{fmt(result.yearly)}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Если цена вырастет на {lift}%</p>
          <p className="num mt-1 text-4xl font-semibold tracking-tight text-primary">+{fmt(result.extra)}</p>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">Грубая оценка при той же загрузке: номера × 365 × загрузка × цена. Реальный эффект зависит от спроса и правил вашего отеля.</p>
      </div>
    </div>
  );
};

/* ─── Прогноз ─────────────────────────────────────────────────── */

export const ForecastStrip = ({ className }: { className?: string }) => (
  <Window title="Прогноз на 30 дней" className={className} bodyClassName="grid grid-cols-3 divide-x divide-border/70 p-0 text-center">
    {[
      { k: "Прогноз загрузки", v: "76%", d: "+4 п.п. к прошлому году" },
      { k: "Прогноз ADR", v: "71 800 ₸", d: "с учётом согласованных цен" },
      { k: "Прогноз выручки", v: "78,4 млн ₸", d: "по всем категориям" },
    ].map((m) => (
      <div key={m.k} className="px-3 py-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.k}</div>
        <div className="num mt-1.5 text-lg font-semibold sm:text-xl">{m.v}</div>
        <div className="mt-1 text-[11px] text-muted-foreground">{m.d}</div>
      </div>
    ))}
  </Window>
);
