import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { baseRate, floorPrice } from "@/data/demo";
import { AnimatedNumber, formatTenge } from "./AnimatedMetric";

const seasons = [
  { label: "Низкий", pct: -8 },
  { label: "Средний", pct: 0 },
  { label: "Высокий", pct: 10 },
];

const occupancyFactor = (occ: number) => (occ >= 90 ? 22 : occ >= 80 ? 15 : occ >= 65 ? 8 : occ >= 45 ? 0 : -6);
const paceFactor = (pace: number) => (pace >= 70 ? 12 : pace >= 40 ? 8 : pace >= 20 ? 3 : 0);

const Row = ({ label, pct, value, hint }: { label: string; pct: number; value: number; hint?: string }) => (
  <div className="flex items-center gap-3 py-2.5">
    <div className="min-w-0 flex-1">
      <div className="text-sm font-medium">{label}</div>
      {hint && <div className="text-[11px] text-white/55">{hint}</div>}
    </div>
    <div className="hidden w-28 sm:block">
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={cn("h-full rounded-full", pct >= 0 ? "bg-primary" : "bg-rose")}
          animate={{ width: `${Math.min(100, Math.abs(pct) * 4)}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
    <span className={cn("num w-12 text-right text-sm", pct > 0 ? "text-emerald" : pct < 0 ? "text-rose" : "text-white/50")}>
      {pct > 0 ? "+" : ""}
      {pct}%
    </span>
    <span className="num w-20 text-right text-sm text-white/80">{formatTenge(value)}</span>
  </div>
);

export const DynamicPricingDemo = () => {
  const [occupancy, setOccupancy] = useState(82);
  const [pace, setPace] = useState(55);
  const [season, setSeason] = useState(2);
  const [holiday, setHoliday] = useState(true);

  const calc = useMemo(() => {
    const s = seasons[season].pct;
    const o = occupancyFactor(occupancy);
    const p = paceFactor(pace);
    const h = holiday ? 20 : 0;
    const raw = baseRate * (1 + (s + o + p + h) / 100);
    const finalRate = Math.max(floorPrice, Math.round(raw / 500) * 500);
    let explanation = "Спрос обычный: цена близка к базовой.";
    if (raw < floorPrice) {
      explanation = "Сработала минимальная цена, заданная отелем.";
    } else if (o >= 15 && holiday) {
      explanation = `Цена выросла из-за высокой загрузки (+${o}%) и праздника (+20%).`;
    } else if (o >= 15) {
      explanation = `Цена выросла из-за высокой загрузки (+${o}%).`;
    } else if (o < 0) {
      explanation = "Загрузка низкая: цена снижена, чтобы поддержать спрос.";
    } else if (holiday) {
      explanation = "Цена повышена на праздник (+20%).";
    } else if (p >= 8) {
      explanation = "Брони идут быстрее обычного: цена немного выше.";
    }

    return { s, o, p, h, finalRate, floored: raw < floorPrice, explanation };
  }, [occupancy, pace, season, holiday]);

  const stepValue = (pct: number) => Math.round((baseRate * pct) / 100);

  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[1fr_420px]">
      <div className="window-dark min-w-0 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">Forest House · 21 марта, суббота</div>
            <div className="mt-1 text-sm text-white/70">Как формируется цена</div>
          </div>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/70">Симуляция цены</span>
        </div>

        <div className="mt-5 divide-y divide-white/10">
          <Row label="Базовый тариф" pct={0} value={baseRate} hint="Настраивается отелем" />
          <Row label="Сезон" pct={calc.s} value={stepValue(calc.s)} hint={seasons[season].label} />
          <Row label="Загрузка" pct={calc.o} value={stepValue(calc.o)} hint={`${occupancy}% на дату`} />
          <Row label="Темп бронирований" pct={calc.p} value={stepValue(calc.p)} hint={pace >= 40 ? "выше обычного" : "в норме"} />
          <Row label="Праздники" pct={calc.h} value={stepValue(calc.h)} hint={holiday ? "Наурыз, длинные выходные" : "нет"} />
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/55">Цена за ночь</div>
            <div className="num mt-1 text-4xl font-semibold tracking-tight">
              <AnimatedNumber value={calc.finalRate} format={formatTenge} duration={0.6} />
            </div>
            <div className="mt-1 text-xs text-white/55">
              Минимальная цена: <span className="num">{formatTenge(floorPrice)}</span>
              {calc.floored && <span className="ml-2 text-amber">· применён минимум</span>}
            </div>
          </div>
          <div className="max-w-sm space-y-2">
            <div className="rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-3 text-sm leading-relaxed text-emerald">{calc.explanation}</div>
            <div className="text-[11px] text-white/55">Новая цена вступит в силу после согласования. Изменение сохранится в истории.</div>
          </div>
        </div>
      </div>

      <div className="window min-w-0 p-5 text-foreground sm:p-6">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Измените спрос</div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Загрузка на дату</span>
            <span className="num text-muted-foreground">{occupancy}%</span>
          </div>
          <Slider className="mt-3 touch-none" value={[occupancy]} min={20} max={100} step={1} onValueChange={([v]) => setOccupancy(v)} aria-label="Загрузка" />
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Темп бронирований</span>
            <span className="num text-muted-foreground">{pace >= 70 ? "очень высокий" : pace >= 40 ? "высокий" : pace >= 20 ? "средний" : "низкий"}</span>
          </div>
          <Slider className="mt-3 touch-none" value={[pace]} min={0} max={100} step={1} onValueChange={([v]) => setPace(v)} aria-label="Темп бронирований" />
        </div>

        <div className="mt-6">
          <div className="text-sm font-medium">Сезон</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {seasons.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSeason(i)}
                className={cn(
                  "rounded-lg border px-2 py-2 text-xs font-medium transition",
                  season === i ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-background-alt",
                )}
                aria-pressed={season === i}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 text-sm">
          <span className="font-medium">Наурыз на эти даты</span>
          <input type="checkbox" className="peer sr-only" checked={holiday} onChange={(e) => setHoliday(e.target.checked)} />
          <span className={cn("relative h-6 w-11 rounded-full transition", holiday ? "bg-primary" : "bg-muted")}>
            <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition", holiday ? "left-[22px]" : "left-0.5")} />
          </span>
        </label>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Двигайте ползунки: так выглядит симуляция в разделе «Динамическое ценообразование». Базовый тариф, коэффициенты и минимальную цену задаёт отель.
        </p>
      </div>
    </div>
  );
};
