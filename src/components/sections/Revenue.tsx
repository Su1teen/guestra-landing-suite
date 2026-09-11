import { motion } from "framer-motion";
import { Utensils, Sparkles, Car, BedDouble } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedNumber, formatTenge } from "@/components/product/AnimatedMetric";
import { SystemEvent } from "@/components/product/SystemEvent";
import { guestRevenue } from "@/data/demo";
import { viewportOnce } from "@/lib/motion";

const icons = [BedDouble, Utensils, Sparkles, Car];
const total = guestRevenue.reduce((s, r) => s + r.value, 0);

export const Revenue = () => (
  <section className="ink section relative overflow-hidden">
    <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]" aria-hidden />
    <div className="container-wide relative">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="POS и дополнительная выручка"
          title={
            <>
             <span className="text-white/45"> Guestra </span> видит все услуги которыми пользуется гость.
            </>
          }
          lede="Чеки из ресторана и SPA, трансферы и доп. услуги привязываются к гостю и брони. Вы видите полную ценность гостя и понимаете, какие услуги растут."
        />

        <Reveal delay={0.1}>
          <div className="window-dark p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/45">Анна Иванова · проживание 18–20 октября</div>
              <span className="text-[11px] text-white/45">POS → Guestra</span>
            </div>

            <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-white/10" role="img" aria-label="Структура выручки по гостю">
              {guestRevenue.map((r, i) => (
                <motion.div
                  key={r.label}
                  style={{ background: r.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(r.value / total) * 100}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>

            <ul className="mt-5 divide-y divide-white/10">
              {guestRevenue.map((r, i) => {
                const Icon = icons[i];
                return (
                  <li key={r.label} className="flex items-center gap-3 py-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${r.color.replace(")", " / 0.18)")}`, color: r.color }}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm">{r.label}</span>
                    <span className="num text-xs text-white/45">{Math.round((r.value / total) * 100)}%</span>
                    <span className="num w-28 text-right text-sm">
                      <AnimatedNumber value={r.value} format={formatTenge} />
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-end justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/45">Итого по гостю</div>
                <div className="mt-1 text-xs text-white/50">Доп. услуги - {Math.round(((total - guestRevenue[0].value) / total) * 100)}% выручки</div>
              </div>
              <div className="num text-3xl font-semibold tracking-tight">
                <AnimatedNumber value={total} format={formatTenge} duration={1.6} />
              </div>
            </div>

            <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
              <SystemEvent label="Чек ресторана привязан к брони" meta="POS" dark />
              <SystemEvent label="LTV гостя обновлён" meta="Guest 360" dark />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
