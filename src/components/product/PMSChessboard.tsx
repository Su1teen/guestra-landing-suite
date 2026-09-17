import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { X, MessageCircle, Globe, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { reservations, rooms, type Reservation } from "@/data/demo";
import { Pill } from "./Pill";
import { Window } from "./Window";
import { SystemEvent } from "./SystemEvent";
import { useStepper } from "@/hooks/use-stepper";

const days = ["14 окт", "15 окт", "16 окт", "17 окт", "18 окт", "19 окт", "20 окт", "21 окт"];
const weekday = ["Вт", "Ср", "Чт", "Пт", "Сб", "Вс", "Пн", "Вт"];
const CELL = 96;
const ROW = 52;
const LABEL = 132;

const barTone: Record<Reservation["tone"], string> = {
  primary: "bg-primary/15 border-primary/40 text-primary",
  violet: "bg-violet/15 border-violet/40 text-violet",
  success: "bg-emerald/15 border-emerald/40 text-emerald",
  warning: "bg-amber/15 border-amber/50 text-amber",
};

const paymentTone = { Оплачено: "success", Предоплата: "primary", Ожидает: "warning" } as const;

const sourceIcon = (s: string) =>
  s === "WhatsApp" ? <MessageCircle className="h-3 w-3 text-whatsapp" /> : s === "Звонок" ? <Phone className="h-3 w-3 text-primary" /> : <Globe className="h-3 w-3 text-cyan" />;

export const BookingModal = ({ r, onClose, dark }: { r: Reservation; onClose?: () => void; dark?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: 8 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96, y: 8 }}
    className={cn("w-[300px] max-w-[calc(100vw-32px)] rounded-2xl border p-4 shadow-2xl", dark ? "border-white/10 bg-ink-2 text-white" : "border-border bg-white")}
    role="dialog"
    aria-label={`Бронь: ${r.guest}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Бронь</div>
        <div className="mt-0.5 font-semibold">{r.guest}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="rounded-md p-1 opacity-60 hover:opacity-100" aria-label="Закрыть">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
      <div>
        <dt className="opacity-50">Номер</dt>
        <dd className="font-medium">{rooms[r.room]}</dd>
      </div>
      <div>
        <dt className="opacity-50">Даты</dt>
        <dd className="font-medium">
          {days[r.start]} - {days[Math.min(r.start + r.nights, days.length - 1)]}
        </dd>
      </div>
      <div>
        <dt className="opacity-50">Тариф / ночь</dt>
        <dd className="num font-medium">{r.rate}</dd>
      </div>
      <div>
        <dt className="opacity-50">Источник</dt>
        <dd className="flex items-center gap-1 font-medium">
          {sourceIcon(r.source)} {r.source}
        </dd>
      </div>
      <div>
        <dt className="opacity-50">Доп. услуги</dt>
        <dd className="font-medium">{r.services}</dd>
      </div>
      <div>
        <dt className="opacity-50">Оплата</dt>
        <dd>
          <Pill tone={paymentTone[r.payment]} dot>
            {r.payment}
          </Pill>
        </dd>
      </div>
    </dl>
    <div className="mt-3 grid gap-1.5">
      <SystemEvent label="Housekeeping уведомлён" dark={dark} meta="авто" />
      <SystemEvent label="Гость в Guest 360" dark={dark} meta="связан" />
    </div>
  </motion.div>
);

export const PMSChessboard = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [selected, setSelected] = useState<number | null>(null);
  // auto-demo: 0 idle → 1 drag Анна from 18 to 17 → 2 open modal → 3 close
  const step = useStepper(3, inView, { intervals: [2200, 1800, 3600], loopPause: 2500 });
  const shift = step >= 1 ? -1 : 0;
  const autoOpen = step === 2 && selected === null;
  const active = selected !== null ? reservations[selected] : autoOpen ? reservations[1] : null;

  return (
    <div ref={ref}>
      <Window
        title="Guestra PMS - Шахматка · Ваш отель"
        className={className}
        badge={
          <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-md bg-background-alt px-2 py-0.5">14–21 октября</span>
            <span className="num">Загрузка 82%</span>
          </span>
        }
        bodyClassName="relative"
      >
        <div className="scrollbar-none overflow-x-auto">
          <div style={{ width: LABEL + CELL * days.length }} className="relative select-none text-xs">
            <div className="sticky top-0 z-10 flex border-b border-border bg-white">
              <div className="shrink-0 border-r border-border px-3 py-2 font-semibold text-muted-foreground" style={{ width: LABEL }}>
                Номера
              </div>
              {days.map((d, i) => (
                <div key={d} className={cn("shrink-0 border-r border-border/60 px-2 py-2 text-center", (i === 4 || i === 5) && "bg-amber/[0.06]")} style={{ width: CELL }}>
                  <div className="font-semibold">{d}</div>
                  <div className="text-[10px] text-muted-foreground">{weekday[i]}</div>
                </div>
              ))}
            </div>

            <div className="relative">
              {rooms.map((room, ri) => (
                <div key={room} className="flex border-b border-border/60" style={{ height: ROW }}>
                  <div className="flex shrink-0 items-center gap-2 border-r border-border px-3 font-medium" style={{ width: LABEL }}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", ri < 5 ? "bg-emerald" : "bg-primary")} aria-hidden />
                    {room}
                  </div>
                  {days.map((_, di) => (
                    <div key={di} className={cn("shrink-0 border-r border-border/40", (di === 4 || di === 5) && "bg-amber/[0.04]")} style={{ width: CELL }} />
                  ))}
                </div>
              ))}

              {reservations.map((r, i) => {
                const isAnna = i === 1;
                const start = r.start + (isAnna ? shift : 0);
                return (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={() => setSelected(selected === i ? null : i)}
                    aria-label={`${r.guest}, ${rooms[r.room]}`}
                    className={cn(
                      "absolute flex h-8 items-center gap-1.5 overflow-hidden rounded-lg border px-2 text-left text-[11px] font-medium shadow-sm",
                      barTone[r.tone],
                      isAnna && "z-[2] ring-2 ring-primary/30",
                      selected === i && "ring-2 ring-primary",
                    )}
                    animate={{ left: LABEL + start * CELL + 6, top: r.room * ROW + (ROW - 32) / 2, width: r.nights * CELL - 12 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    whileHover={{ y: -1 }}
                  >
                    <span className="truncate">{r.guest}</span>
                    {isAnna && step === 1 && <span className="ml-auto shrink-0 rounded bg-primary px-1 text-[9px] text-white">перенос</span>}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
              <div className="pointer-events-auto">
                <BookingModal r={active} onClose={() => setSelected(null)} />
              </div>
            </div>
          )}
        </AnimatePresence>
      </Window>
    </div>
  );
};
