import { ArrowRight, Layers, Building2, MessageSquare, Cpu, Users, Plug, Scaling, BarChart3, Repeat, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { useDemoModal } from "@/components/layout/DemoModal";

const factors = [
  { icon: Layers, t: "Модули" },
  { icon: Building2, t: "Объекты" },
  { icon: MessageSquare, t: "Объём коммуникаций" },
  { icon: Cpu, t: "Нагрузка AI" },
  { icon: Users, t: "Пользователи" },
  { icon: Plug, t: "Интеграции" },
  { icon: Scaling, t: "Масштаб" },
];

const steps = [
  {
    num: "01",
    title: "Базовый период",
    text: "До начала работы фиксируется исходный уровень показателей.",
  },
  {
    num: "02",
    title: "Согласованные метрики",
    text: "Собственник и Guestra заранее определяют, какие результаты учитываются.",
  },
  {
    num: "03",
    title: "Измерение результата",
    text: "Рост рассчитывается относительно baseline и прозрачно отображается в аналитике.",
  },
];

const metrics = [
  { icon: BarChart3, label: "Прямые бронирования" },
  { icon: ShoppingCart, label: "Дополнительная выручка" },
  { icon: Repeat, label: "Повторные гости" },
];

export const BusinessModel = () => {
  const { open } = useDemoModal();
  return (
    <section id="model" className="section bg-background-alt">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Модель сотрудничества"
          title="Часть стоимости можно связать с результатом."
          lede="Основная модель Guestra - подписка, зависящая от выбранных модулей и масштаба использования. Дополнительно часть вознаграждения может быть привязана к измеримому приросту бизнеса."
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="window h-full p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">01 · Платформа</div>
              <h3 className="mt-2 text-xl font-semibold">Подписка на платформу</h3>
              <p className="mt-2 text-sm text-muted-foreground">Стоимость зависит от того, что и в каком объёме вы используете:</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {factors.map((f) => (
                  <li key={f.t} className="flex items-center gap-2 rounded-lg border border-border bg-background-alt/60 px-2.5 py-2 text-xs font-medium">
                    <f.icon className="h-3.5 w-3.5 shrink-0 text-primary" /> {f.t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="window-dark h-full p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/45">02 · Результат</div>
              <h3 className="mt-2 text-xl font-semibold text-white">Модель, связанная с результатом</h3>
              <p className="mt-2 text-sm text-white/65">
                Опционально часть вознаграждения привязывается к измеримому приросту относительно базового периода.
              </p>

              <div className="mt-5 space-y-3">
                {steps.map((s) => (
                  <div key={s.num} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[11px] font-bold text-white">{s.num}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{s.title}</div>
                      <div className="mt-0.5 text-xs leading-relaxed text-white/60">{s.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Пример метрик</div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {metrics.map((m, i) => (
                    <span key={m.label} className="flex items-center gap-0">
                      <span className="flex items-center gap-1.5 rounded-lg bg-white/8 px-2.5 py-1.5 text-xs font-medium text-white/80">
                        <m.icon className="h-3.5 w-3.5 text-primary" />
                        {m.label}
                      </span>
                      {i < metrics.length - 1 && <ArrowRight className="mx-1 h-3 w-3 text-white/25" />}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/50">
                  <span className="rounded-md bg-primary/20 px-2 py-0.5 font-medium text-primary">Базовый период</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-white/25" />
                  <span className="text-white/70">Работа Guestra</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-white/25" />
                  <span className="font-medium text-emerald">Рост результата</span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-white/25" />
                  <span className="text-white/70">Performance component</span>
                </div>
              </div>

              <Button variant="secondary" className="mt-6 h-10 rounded-full bg-white px-5 text-ink hover:bg-white/90" onClick={() => open("demo")}>
                Обсудить конфигурацию
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
