import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCheck, Clock3, MessageCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { Window } from "./Window";

/**
 * Первый экран: одна бронь проходит через три модуля.
 * 0 — гость пишет, 1 — AI отвечает ценой из PMS, 2 — номер удержан до оплаты, 3 — оплата получена.
 * Анимация проигрывается один раз; при prefers-reduced-motion сразу показывается финальный кадр.
 */
const FINAL = 3;

const days = [
  { d: "16", w: "Пт" }, { d: "17", w: "Сб" }, { d: "18", w: "Вс" }, { d: "19", w: "Пн" },
  { d: "20", w: "Вт" }, { d: "21", w: "Ср" }, { d: "22", w: "Чт" },
];
const rooms = ["Forest 101", "Forest 102", "Lake 201", "A-Frame 301", "Sky 401"];
const bookings = [
  { room: 0, start: 0, nights: 2, guest: "Сергей Л.", tone: "emerald" },
  { room: 1, start: 1, nights: 3, guest: "Асель Т.", tone: "primary" },
  { room: 2, start: 0, nights: 2, guest: "Олег Ким", tone: "emerald" },
  { room: 2, start: 4, nights: 2, guest: "Айгерим Н.", tone: "violet" },
  { room: 3, start: 3, nights: 3, guest: "Корп. группа", tone: "primary" },
  { room: 4, start: 1, nights: 2, guest: "Жанар А.", tone: "emerald" },
  { room: 4, start: 5, nights: 2, guest: "Тимур Б.", tone: "primary" },
] as const;

const tone = {
  emerald: "border-emerald/40 bg-emerald/10 text-emerald",
  primary: "border-primary/35 bg-primary/10 text-primary",
  violet: "border-violet/35 bg-violet/10 text-violet",
};

const Bar = ({ start, nights, className, children }: { start: number; nights: number; className?: string; children: React.ReactNode }) => (
  <div
    className={cn("absolute top-1.5 flex h-[calc(100%-12px)] items-center overflow-hidden rounded-md border px-2 text-[11px] font-medium", className)}
    style={{ left: `calc(${(start / days.length) * 100}% + 3px)`, width: `calc(${(nights / days.length) * 100}% - 6px)` }}
  >
    <span className="truncate">{children}</span>
  </div>
);

const MiniChessboard = ({ step }: { step: number }) => (
  <Window
    title="Guestra PMS · Шахматка"
    badge={<span className="hidden text-[11px] text-muted-foreground sm:inline">16–22 октября · <span className="num">загрузка {step >= FINAL ? "84" : "82"}%</span></span>}
  >
    <div className="text-xs">
      <div className="flex border-b border-border bg-white">
        <div className="w-[108px] shrink-0 border-r border-border px-3 py-2 font-semibold text-muted-foreground">Номер</div>
        <div className="grid flex-1 grid-cols-7">
          {days.map((day, i) => (
            <div key={day.d} className={cn("border-r border-border/60 py-1.5 text-center last:border-r-0", (i === 1 || i === 2) && "bg-amber/[0.06]")}>
              <div className="num font-semibold">{day.d}</div>
              <div className="text-[10px] text-muted-foreground">{day.w}</div>
            </div>
          ))}
        </div>
      </div>
      {rooms.map((room, ri) => (
        <div key={room} className="flex h-10 border-b border-border/60 last:border-b-0 sm:h-11">
          <div className="flex w-[108px] shrink-0 items-center gap-2 border-r border-border px-3 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
            <span className="truncate">{room}</span>
          </div>
          <div className="relative grid flex-1 grid-cols-7">
            {days.map((day, i) => <div key={day.d} className={cn("border-r border-border/40 last:border-r-0", (i === 1 || i === 2) && "bg-amber/[0.04]")} />)}
            {bookings.filter((b) => b.room === ri).map((b) => (
              <Bar key={b.guest} start={b.start} nights={b.nights} className={tone[b.tone]}>{b.guest}</Bar>
            ))}
            {ri === 0 && (
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    key="anna"
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 left-0 right-0"
                  >
                    <Bar
                      start={2}
                      nights={2}
                      className={cn(
                        "transition-colors duration-500",
                        step >= FINAL
                          ? "border-primary bg-primary text-white"
                          : "border-dashed border-amber bg-amber/15 text-[hsl(28_80%_34%)]",
                      )}
                    >
                      Анна И. · {step >= FINAL ? "оплачено" : "ждёт оплату"}
                    </Bar>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      ))}
    </div>
  </Window>
);

export const ChatCard = ({ step }: { step: number }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-[#efeae2] shadow-[0_30px_70px_-30px_rgba(16,24,40,0.45)]">
    <div className="flex items-center gap-2.5 bg-[#075e54] px-3.5 py-2.5 text-white">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold">АИ</span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-[13px] font-medium">Анна Иванова</div>
        <div className="flex items-center gap-1 text-[10px] text-white/70">Отвечает AI-администратор</div>
      </div>
      <MessageCircle className="h-4 w-4 text-white/70" aria-hidden />
    </div>
    <div className="flex min-h-[176px] flex-col gap-1.5 p-3 text-[12.5px] leading-snug">
      <div className="max-w-[88%] self-start rounded-xl rounded-bl-sm bg-white px-3 py-1.5 text-[#111b21] shadow-sm">
        Есть домик на 18–20 октября? Нас четверо.
      </div>
      <AnimatePresence>
        {step >= 1 && (
          <motion.div key="reply" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-[90%] self-end rounded-xl rounded-br-sm bg-[#d9fdd3] px-3 py-1.5 text-[#111b21] shadow-sm">
            Forest House свободен: 74 000 ₸ за ночь. Отправляю ссылку на предоплату.
            <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-black/45">10:42 <CheckCheck className="h-3 w-3 text-[#53bdeb]" /></span>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div key="hold" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="self-center">
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold text-white transition-colors duration-500", step >= FINAL ? "bg-emerald" : "bg-amber")}>
              {step >= FINAL ? <><Check className="h-3 w-3" strokeWidth={3} /> Оплата получена · бронь подтверждена</> : <><Clock3 className="h-3 w-3" /> Номер удержан до 18:40</>}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

const TodayCard = ({ step }: { step: number }) => (
  <div className="w-[230px] rounded-2xl border border-border bg-white p-4 shadow-[0_30px_70px_-30px_rgba(16,24,40,0.4)]">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="font-semibold uppercase tracking-wider">Сегодня</span>
      <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden />
    </div>
    <div className="num mt-2 text-2xl font-semibold tracking-tight">{step >= FINAL ? "8,55" : "8,40"} млн ₸</div>
    <div className="mt-0.5 text-[11px] text-muted-foreground">выручка за день · загрузка <span className="num">{step >= FINAL ? "84" : "82"}%</span></div>
    <AnimatePresence>
      {step >= FINAL && (
        <motion.div key="new" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-lg bg-emerald/10 px-2.5 py-1.5 text-[11px] font-medium text-emerald">
          +148 000 ₸ · бронь из WhatsApp
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const HeroComposition = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(FINAL);
      return;
    }
    const timers = [900, 2300, 3900].map((delay, i) => window.setTimeout(() => setStep(i + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div className="hero-composition" aria-label="Пример: обращение в WhatsApp становится бронью в шахматке и попадает в выручку дня" role="img">
      <div className="hero-board">
        <MiniChessboard step={step} />
      </div>
      <div className="hero-chat">
        <ChatCard step={step} />
      </div>
      <div className="hero-today">
        <TodayCard step={step} />
      </div>
    </div>
  );
};
