import { motion } from "framer-motion";
import { MessageCircle, Bot, CalendarCheck, CreditCard, Bell, ConciergeBell, Star, Repeat } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { Pill } from "@/components/product/Pill";
import { viewportOnce } from "@/lib/motion";

const flow = [
  { icon: MessageCircle, t: "Гость пишет в WhatsApp" },
  { icon: Bot, t: "AI отвечает и предлагает вариант" },
  { icon: CalendarCheck, t: "Бронь создаётся в PMS" },
  { icon: CreditCard, t: "Предоплата получена" },
  { icon: Bell, t: "Housekeeping готовит домик" },
  { icon: ConciergeBell, t: "Ресторан и SPA — в профиле гостя" },
  { icon: Star, t: "После выезда — запрос отзыва" },
  { icon: Repeat, t: "Возвращается в другой объект ЛЕС" },
];

export const Pilot = () => (
  <section id="pilot" className="section bg-background">
    <div className="container-wide">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow="Пилот"
            title="Первый сценарий: сеть ЛЕС."
            lede="Стартуем с загородного комплекса ЛЕС Боровое и городского отеля ЛЕС Астана. Guestra подключается к текущему стеку и запускает единый путь гостя между объектами."
          />
          <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="window p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Объекты</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="font-medium">ЛЕС Боровое</span>
                  <Pill>загородный комплекс</Pill>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium">ЛЕС Астана</span>
                  <Pill>городской отель</Pill>
                </li>
              </ul>
            </div>
            <div className="window p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Текущий стек</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["CRM", "Bnovo", "Rosta", "WhatsApp", "АТС"].map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Модули Guestra</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["AI-продажи", "Voice AI", "Guest 360", "Операции", "Аналитика"].map((s) => (
                  <Pill key={s} tone="primary">
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="window-dark p-5 sm:p-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/45">Путь гостя от начала до конца</div>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {flow.map((f, i) => (
                <motion.li
                  key={f.t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm"
                >
                  <span className="num w-4 text-[11px] text-white/40">{i + 1}</span>
                  <f.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{f.t}</span>
                </motion.li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-white/50">Пилот измеряется относительно текущей базы: скорость ответа, доля прямых бронирований, доп. выручка и повторные визиты.</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
