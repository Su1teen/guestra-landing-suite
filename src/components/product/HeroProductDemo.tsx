import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, MessageCircle, Phone, Utensils, CalendarDays } from "lucide-react";
import { heroScript } from "@/data/demo";
import { ChatWindow, useChatScript } from "./ConversationDemo";
import { GuestProfile } from "./GuestProfile";
import { RatePanel } from "./RatePanel";
import { Logo } from "@/components/layout/Logo";
import { SystemEvent } from "./SystemEvent";

const sources = [
  { label: "WhatsApp", icon: MessageCircle, color: "text-whatsapp" },
  { label: "АТС", icon: Phone, color: "text-primary" },
  { label: "PMS", icon: CalendarDays, color: "text-violet" },
  { label: "POS", icon: Utensils, color: "text-amber" },
];

const Sources = () => (
  <div className="relative mx-auto mb-6 hidden w-full max-w-3xl md:block" aria-hidden>
    <div className="grid grid-cols-4 gap-4">
      {sources.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="glass flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80"
        >
          <s.icon className={`h-3.5 w-3.5 ${s.color}`} />
          {s.label}
        </motion.div>
      ))}
    </div>
    <svg className="mx-auto mt-1 block h-14 w-full" viewBox="0 0 800 56" fill="none" preserveAspectRatio="none">
      {[100, 300, 500, 700].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 0 C ${x} 30, 400 26, 400 56`}
          stroke="hsl(var(--primary))"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          className="dash-flow"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </svg>
    <div className="mx-auto flex w-max items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white shadow-lg">
      <Logo light className="[&>span:first-child]:h-5 [&>span:first-child]:w-5 [&>span:last-child]:text-sm" />
      <span className="text-white/50">·</span>
      <span className="text-white/70">Единый operating layer</span>
    </div>
  </div>
);

export const HeroProductDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const state = useChatScript(heroScript, inView);
  const [hovered, setHovered] = useState(false);
  const confirmed = state.done >= heroScript.length;

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Sources />

      <div className="relative grid gap-4 md:grid-cols-[1fr_1.15fr_0.95fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:mt-6"
        >
          <ChatWindow script={heroScript} state={state} guestName="Анна Иванова" compact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Guestra CRM · карточка гостя</span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              AI активен
            </span>
          </div>
          <GuestProfile variant="hero" recommendation="Предложить домик Forest + SPA - гость покупал SPA в двух из трёх визитов." />

          <div className="mt-3 space-y-1.5">
            <AnimatePresence>
              {state.done >= 3 && <SystemEvent key="a" label="Данные получены из PMS" meta="0,4 с" />}
              {state.done >= 5 && <SystemEvent key="b" label="Бронь создана · CRM обновлена" meta="1,1 с" />}
              {confirmed && <SystemEvent key="c" label="Предоплата получена" meta="сейчас" />}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="md:mt-10"
        >
          <RatePanel />
        </motion.div>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-none absolute -bottom-5 left-1/2 z-20 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-xs font-medium text-white shadow-2xl sm:gap-2.5 sm:px-4 sm:text-sm"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="truncate">Бронь подтверждена · Forest House · 18–20 октября</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 0.9 : 0.6 }}
        className="pointer-events-none absolute -inset-x-10 -bottom-16 -top-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]"
      />
    </div>
  );
};
