import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { DynamicPricingDemo } from "@/components/product/DynamicPricingDemo";
import { ArrowUpRight, LockKeyhole, ScanEye, SlidersHorizontal } from "lucide-react";

const highlights = [
  {
    icon: SlidersHorizontal,
    title: "Реакция на спрос",
    text: "загрузка и booking pace влияют на рекомендацию",
  },
  {
    icon: LockKeyhole,
    title: "Ограничения отеля",
    text: "минимальная цена и правила задаются вручную",
  },
  {
    icon: ScanEye,
    title: "Объяснимый расчёт",
    text: "видно, какие факторы изменили тариф",
  },
];

export const Pricing = ({ dark = false }: { dark?: boolean }) => (
  <section id="pricing" className={`section ${dark ? "ink !pt-12 md:!pt-20" : "bg-background-alt"}`}>
    <div className="container-wide">
      <SectionHeader
        reveal={false}
        className="!max-w-4xl"
        ledeClassName="!max-w-3xl !text-sm sm:!text-[15px] !text-white/65 !leading-relaxed"
        eyebrow="Динамическое ценообразование"
        title="Тариф рассчитывается с учётом текущего спроса"
        lede="Guestra учитывает загрузку, темп бронирований, сезонность и события. Менеджер видит причины рекомендации и может изменить тариф вручную."
      />
      {dark && (
        <Reveal delay={0.06} className="mt-9">
          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] lg:grid-cols-[300px_1fr]">
            <div className="flex flex-col justify-between border-b border-white/10 bg-primary/10 p-6 sm:p-7 lg:border-b-0 lg:border-r">
              <div>
                <div className="num flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white sm:text-[42px]">+20%</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">ADR</span>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-xs text-white/50">Цена за номер</p>
                    <div className="num mt-0.5 flex items-baseline gap-2 text-[15px] sm:text-base">
                      <span className="text-white/40">60 000</span>
                      <span className="text-emerald/80">→</span>
                      <span className="font-semibold text-white">72 000 ₸</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Выручка за 100 ночей</p>
                    <div className="num mt-0.5 flex items-baseline gap-2 text-[15px] sm:text-base">
                      <span className="text-white/40">6,0</span>
                      <span className="text-emerald/80">→</span>
                      <span className="font-semibold text-white">7,2 млн ₸</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-white/40">Иллюстративный сценарий</p>
            </div>

            <div className="flex flex-col justify-center gap-4 p-6 sm:p-7 bg-[hsl(var(--ink))]">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <item.icon className="h-3.5 w-3.5 text-[#8baaff]" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/70">
                    <strong className="font-medium text-white">{item.title}</strong>
                    <span className="text-white/35"> - </span>
                    <span>{item.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1} className="mt-12">
        <DynamicPricingDemo />
      </Reveal>
      <p className={`mt-3 text-xs ${dark ? "text-white/45" : "text-muted-foreground"}`}>
        Интерактивный пример расчёта тарифа. Значения демонстрационные; сценарий ADR выше не является прогнозом.
      </p>
    </div>
  </section>
);
