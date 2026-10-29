import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone, ShoppingBag, Star, AlertCircle } from "lucide-react";
import { timeline, guest } from "@/data/demo";
import { formatTenge } from "./AnimatedMetric";
import { viewportOnce } from "@/lib/motion";
import { Pill } from "./Pill";

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: 42, color: "text-whatsapp" },
  { icon: Phone, label: "Звонки", value: 6, color: "text-primary" },
  { icon: CalendarCheck, label: "Брони", value: 4, color: "text-violet" },
  { icon: ShoppingBag, label: "Покупки", value: 11, color: "text-amber" },
  { icon: AlertCircle, label: "Жалобы", value: 1, color: "text-rose" },
  { icon: Star, label: "Отзывы", value: 3, color: "text-emerald" },
];

export const GuestTimeline = () => (
  <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
    <div className="window-dark p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">Профиль гостя</div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet text-sm font-semibold">
          {guest.initials}
        </div>
        <div>
          <div className="font-semibold">{guest.name}</div>
          <div className="text-xs text-white/50">1 человек · 2 объекта · 4 проживания</div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {channels.map((c) => (
          <div key={c.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
            <c.icon className={`h-3.5 w-3.5 ${c.color}`} />
            <div className="num mt-1.5 text-base font-semibold leading-none">{c.value}</div>
            <div className="mt-0.5 text-[10px] text-white/50">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div className="text-[10px] uppercase tracking-wider text-white/55">Выручка от гостя в сети</div>
        <div className="num mt-1 text-2xl font-semibold">{formatTenge(guest.ltv)}</div>
        <div className="mt-1 text-[11px] text-white/50">Объект 01: 3 проживания · Объект 02: 1 проживание</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><div className="text-[10px] text-white/55">Отмены и неявки</div><div className="num mt-1 text-sm font-semibold">0</div><div className="mt-0.5 text-[10px] text-white/55">за все визиты</div></div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><div className="text-[10px] text-white/55">Лояльность</div><div className="mt-1 text-sm font-semibold">{guest.loyalty}</div><div className="mt-0.5 text-[10px] text-white/55">Статус в сети</div></div>
      </div>
    </div>

    <div className="window p-5 sm:p-7">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">История гостя</div>
      <ol className="relative mt-6">
        <div className="absolute bottom-3 left-[7px] top-3 w-px bg-border" aria-hidden />
        <motion.div
          className="absolute left-[7px] top-3 w-px origin-top bg-primary"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "calc(100% - 24px)" }}
          aria-hidden
        />
        {timeline.map((t, i) => (
          <motion.li
            key={t.year}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 + i * 0.25 }}
            className="relative flex gap-5 pb-8 pl-8 last:pb-0"
          >
            <span className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-primary bg-white" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <div className="num w-12 shrink-0 text-lg font-semibold leading-tight">{t.year}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{t.property}</span>
                <Pill tone={i === 2 ? "violet" : "primary"}>{t.kind}</Pill>
              </div>
              <div className="mt-0.5 text-sm text-muted-foreground">{t.detail}</div>
              {i === 1 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Pill>SPA ×2</Pill>
                  <Pill>Ресторан ×3</Pill>
                  <Pill tone="success">Отзыв 5★</Pill>
                </div>
              )}
              {i === 2 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Pill tone="violet">Другой объект</Pill>
                  <Pill tone="success">Тот же профиль</Pill>
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-5 text-sm font-medium">
        <span>1 человек</span>
        <span className="text-muted-foreground">→</span>
        <span>несколько объектов</span>
        <span className="text-muted-foreground">→</span>
        <span>несколько проживаний</span>
        <span className="text-muted-foreground">→</span>
        <span className="text-primary">одна история</span>
      </div>
    </div>
  </div>
);
