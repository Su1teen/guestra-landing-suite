import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Mic, Phone, PhoneIncoming, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStepper } from "@/hooks/use-stepper";
import { voiceSummary, voiceTranscript } from "@/data/demo";
import { Pill } from "./Pill";
import { SystemEvent } from "./SystemEvent";

const intervals = [1400, 1600, 1900, 1900, 1300, 1400];

const Waveform = ({ active }: { active: boolean }) => (
  <div className="flex h-8 items-center gap-[3px]" aria-hidden>
    {Array.from({ length: 28 }).map((_, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full bg-primary"
        animate={active ? { height: [6, 8 + ((i * 7) % 20), 6] } : { height: 4 }}
        transition={{ repeat: Infinity, duration: 0.8 + (i % 5) * 0.12, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export const VoiceCallDemo = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  // 0 incoming, 1 answered, 2..5 transcript lines, 6 summary
  const step = useStepper(6, inView, { intervals, loopPause: 4500 });
  const inCall = step >= 1 && step < 6;

  return (
    <div ref={ref} className={cn("grid gap-4 sm:grid-cols-[300px_1fr]", className)}>
      <div className="window-dark relative flex flex-col p-5">
        <div className="flex items-center justify-between text-[11px] text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <PhoneIncoming className="h-3.5 w-3.5" /> {step === 0 ? "Новый звонок" : step >= 6 ? "Звонок завершён" : "Разговор"}
          </span>
          <span className="num">{step === 0 ? "" : step >= 6 ? "01:12" : `00:${String(12 + step * 14).padStart(2, "0")}`}</span>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="relative">
            {step === 0 && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald/40" aria-hidden />}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet text-2xl font-semibold">
              И
            </div>
          </div>
          <div className="mt-4 text-lg font-semibold">Илья</div>
          <div className="text-xs text-white/50">+7 777 •• •• 18 · АТС</div>
        </div>

        <div className="mt-6 flex justify-center">
          <Waveform active={inCall} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <Mic className="h-4 w-4" />
          </span>
          <motion.span
            animate={{ backgroundColor: inCall || step >= 6 ? "hsl(346 84% 58%)" : "hsl(158 72% 42%)" }}
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <Phone className={cn("h-4 w-4 transition", (inCall || step >= 6) && "rotate-[135deg]")} />
          </motion.span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-white/60">
          <Sparkles className="h-3 w-3 text-primary" /> Отвечает Voice AI Guestra
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="window flex-1 p-4">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Транскрипт в реальном времени</span>
            {inCall && (
              <span className="inline-flex items-center gap-1.5 text-rose">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" /> запись
              </span>
            )}
          </div>
          <div className="mt-3 min-h-[150px] space-y-2">
            <AnimatePresence initial={false}>
              {step === 0 && (
                <motion.p key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-muted-foreground">
                  Входящий звонок… Voice AI отвечает через 2 секунды.
                </motion.p>
              )}
              {voiceTranscript.slice(0, Math.max(0, Math.min(step - 1, 4))).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-2 text-sm", l.who === "ai" ? "text-foreground" : "text-muted-foreground")}
                >
                  <span className={cn("mt-0.5 shrink-0 text-[10px] font-semibold uppercase", l.who === "ai" ? "text-primary" : "text-muted-foreground")}>
                    {l.who === "ai" ? "AI" : "Гость"}
                  </span>
                  <span className={cn(i === step - 2 && inCall && "caret")}>{l.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="window p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Итог разговора</span>
                <Pill tone="success" dot>
                  {voiceSummary.intent}
                </Pill>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
                <div>
                  <dt className="text-muted-foreground">Интересуется</dt>
                  <dd className="font-medium">{voiceSummary.interest}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Даты</dt>
                  <dd className="font-medium">{voiceSummary.dates}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Гостей</dt>
                  <dd className="num font-medium">{voiceSummary.guests}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Следующее действие</dt>
                  <dd className="font-medium text-primary">{voiceSummary.nextAction}</dd>
                </div>
              </dl>
              <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                <SystemEvent label="Лид создан в CRM" meta="авто" />
                <SystemEvent label="Задача менеджеру: отправить предложение" meta="авто" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
