import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ClipboardList, Bell, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { housekeeping, journey } from "@/data/demo";
import { useStepper } from "@/hooks/use-stepper";
import { Pill } from "./Pill";
import { Window } from "./Window";

const toneDot: Record<string, string> = {
  primary: "bg-primary",
  warning: "bg-amber",
  success: "bg-emerald",
  violet: "bg-violet",
};

export const AutomationTimeline = ({ step }: { step: number }) => (
  <ol className="scrollbar-none -mx-4 flex gap-0 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="Путь гостя">
    {journey.map((j, i) => {
      const done = i < step;
      const active = i === step;
      return (
        <li key={j} className="flex min-w-[112px] flex-1 flex-col items-stretch">
          <div className="flex items-center">
            <motion.span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-semibold",
                done ? "border-primary bg-primary text-white" : active ? "border-primary bg-white text-primary" : "border-border bg-white text-muted-foreground",
              )}
              animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ repeat: active ? Infinity : 0, duration: 1.4 }}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </motion.span>
            {i < journey.length - 1 && (
              <span className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                <motion.span className="absolute inset-y-0 left-0 bg-primary" animate={{ width: done ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
              </span>
            )}
          </div>
          <span className={cn("mt-2 pr-2 text-[11px] leading-tight", active ? "font-semibold text-foreground" : done ? "text-foreground/70" : "text-muted-foreground")}>{j}</span>
        </li>
      );
    })}
  </ol>
);

export const HousekeepingMobile = ({ step }: { step: number }) => {
  const taskDone = step >= 7;
  return (
    <div className="mx-auto w-[240px] rounded-[30px] border-[6px] border-ink bg-ink p-1.5 shadow-2xl">
      <div className="h-[420px] overflow-hidden rounded-[22px] bg-background-alt">
        <div className="flex items-center justify-between bg-white px-4 pb-2 pt-3 text-[10px] text-muted-foreground">
          <span className="num">13:42</span>
          <span className="h-4 w-14 rounded-full bg-ink" aria-hidden />
          <span>●●●</span>
        </div>
        <div className="bg-white px-4 pb-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Смена · Гульнара</div>
          <div className="mt-0.5 text-sm font-semibold">Мои задачи · 4</div>
        </div>
        <div className="space-y-2 p-3">
          <motion.div
            layout
            className={cn("rounded-xl border bg-white p-3 shadow-sm", taskDone ? "border-emerald/40" : "border-primary/40 ring-2 ring-primary/10")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Домик 104</span>
              <Pill tone={taskDone ? "success" : "warning"} dot>
                {taskDone ? "Готов" : "В процессе"}
              </Pill>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">Уборка после выезда · заезд в 15:00</div>
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
              {["Постель", "Ванная", "Мини-бар", "Проверка"].map((t, i) => (
                <span key={t} className={cn("flex items-center gap-1 rounded-md px-1.5 py-1", (taskDone || i < 2) ? "bg-emerald/10 text-emerald" : "bg-background-alt text-muted-foreground")}>
                  <Check className="h-3 w-3" /> {t}
                </span>
              ))}
            </div>
            <button
              type="button"
              className={cn("mt-2 w-full rounded-lg py-1.5 text-[11px] font-semibold transition", taskDone ? "bg-emerald/10 text-emerald" : "bg-primary text-white")}
            >
              {taskDone ? "Отправлено супервайзеру" : "Завершить уборку"}
            </button>
          </motion.div>

          {step >= 4 && step < 7 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-white p-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Bell className="h-3.5 w-3.5 text-primary" /> Запрос гостя · Делюкс 305
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">«Принесите, пожалуйста, ещё два полотенца» — из WhatsApp</div>
              <div className="mt-1.5 text-[10px] text-primary">Назначено автоматически · 14:10</div>
            </motion.div>
          )}

          <div className="rounded-xl border border-border bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Forest 102</span>
              <Pill tone="success" dot>
                Готов
              </Pill>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">Подготовка к заезду · гость Асель Т.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OperationsDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const step = useStepper(journey.length, inView, { interval: 1500, loopPause: 3000 });

  return (
    <div ref={ref} className="space-y-6">
      <div className="window p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Бронь запускает операции</div>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> задачи создаются автоматически
          </span>
        </div>
        <AutomationTimeline step={step} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
        <Window title="Guestra Operations — Housekeeping · сегодня" badge={<ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />}>
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
            {housekeeping.summary.map((s) => (
              <div key={s.label} className="rounded-xl bg-background-alt p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className={cn("h-1.5 w-1.5 rounded-full", toneDot[s.tone])} aria-hidden /> {s.label}
                </div>
                <div className="num mt-1 text-2xl font-semibold">{s.value}</div>
              </div>
            ))}
          </div>
          <table className="w-full text-xs">
            <thead className="border-y border-border bg-background-alt/60 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-semibold">Номер</th>
                <th className="px-4 py-2 font-semibold">Задача</th>
                <th className="hidden px-4 py-2 font-semibold sm:table-cell">Время</th>
                <th className="px-4 py-2 font-semibold">Статус</th>
              </tr>
            </thead>
            <tbody>
              {housekeeping.tasks.map((t, i) => (
                <tr key={t.room} className={cn("border-b border-border/60 last:border-0", i === 0 && step >= 7 && "bg-emerald/[0.05]")}>
                  <td className="px-4 py-2.5 font-medium">{t.room}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{t.type}</td>
                  <td className="num hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{t.time}</td>
                  <td className="px-4 py-2.5">
                    <Pill tone={i === 0 && step >= 7 ? "success" : t.tone} dot>
                      {i === 0 && step >= 7 ? "Готов" : t.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Window>
        <HousekeepingMobile step={step} />
      </div>
    </div>
  );
};
