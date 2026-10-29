import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { ModuleTag } from "./ModuleLinkCard";
import { CheckoutCleaning, Reminders, RepeatGuest } from "./ModuleLinkFragments";
import { ChatCard } from "./HeroComposition";
import { FolioCard } from "./FolioCard";
import { NightAuditCard } from "./PMSWidgets";
import { PaymentHoldCard } from "./CRMWidgets";
import { FrontDeskToday } from "./FrontDeskToday";

const steps = [
  { time: "Пт, 10:41", title: "Гостья пишет в WhatsApp", text: "AI-администратор узнаёт Анну по истории, проверяет свободные домики и цену в PMS и отвечает за несколько секунд.", modules: ["AI", "CRM", "PMS"], who: "Отдел продаж видит диалог во входящих", visual: <div className="mx-auto max-w-sm"><ChatCard step={1} /></div> },
  { time: "Пт, 10:45", title: "Номер удержан до оплаты", text: "Анна согласна. Номер удерживается, уходит ссылка на предоплату. Ранний заезд администратор согласует сам, забрав диалог у AI.", modules: ["CRM", "PMS"], who: "Ресепшен видит бронь «Ожидает оплаты»", visual: <PaymentHoldCard /> },
  { time: "Пт, 10:52", title: "Оплата пришла, бронь подтверждена", text: "Бронь появляется в шахматке, SPA занимает слот и попадает в фолио. Напоминания гостю запланированы.", modules: ["PMS", "Услуги", "Фолио"], who: "Ресепшен и служба SPA", visual: <FolioCard /> },
  { time: "Ср, 11:00", title: "Напоминание за три дня", text: "Анна получает маршрут в 2ГИС и условия отмены. Если даты изменятся, напоминания перенесутся сами.", modules: ["CRM", "Сообщения"], who: "Гость", visual: <Reminders /> },
  { time: "Сб, 10:30", title: "Номер готов к раннему заезду", text: "Уборка запланирована к 10:30, ресепшен видит готовность. В 11:00 Анна заселяется без ожидания.", modules: ["PMS", "Уборка"], who: "Служба уборки и ресепшен", visual: <FrontDeskToday /> },
  { time: "Пн, 12:00", title: "Выезд и уборка", text: "Остаток оплачен при выезде, номер уходит в уборку с чек-листом. Повторный визит добавляется в профиль Анны.", modules: ["PMS", "Уборка", "CRM"], who: "Ресепшен и служба уборки", visual: <div className="space-y-4"><CheckoutCleaning /><RepeatGuest /></div> },
  { time: "Вт, 03:08", title: "Ночной аудит и отчёт", text: "День закрыт, выручка выходных уже в отчёте собственника вместе с источником: WhatsApp и AI.", modules: ["PMS", "Финансы"], who: "Собственник и бухгалтерия", visual: <NightAuditCard /> },
];

/** Сквозной сценарий брони: шаги идут сами, клик по шагу останавливает показ. */
export const BookingJourney = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!inView || !playing) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), 5200);
    return () => window.clearTimeout(timer);
  }, [inView, playing, active]);

  const step = steps[active];

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Шаг {active + 1} из {steps.length}</p>
          <button type="button" onClick={() => setPlaying((p) => !p)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-muted">
            {playing ? <><Pause className="h-3 w-3" /> Пауза</> : <><Play className="h-3 w-3" /> Показать по шагам</>}
          </button>
        </div>
        <ol className="relative space-y-1 border-l border-border">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button type="button" onClick={() => { setActive(i); setPlaying(false); }} aria-current={active === i ? "step" : undefined}
                className={cn("relative -ml-px block w-full border-l-2 py-3 pl-5 pr-2 text-left transition", active === i ? "border-primary" : "border-transparent hover:border-border")}>
                <span className="num block text-[11px] font-medium text-muted-foreground">{s.time}</span>
                <span className={cn("mt-0.5 block font-semibold", active === i ? "text-foreground" : "text-foreground/70")}>{s.title}</span>
                {active === i && <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{s.text}</span>}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-border bg-background-alt p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <ModuleTag modules={step.modules} />
            <span className="text-xs text-muted-foreground">{step.who}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="mt-5 flex min-h-[340px] flex-col justify-center">
              {step.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
