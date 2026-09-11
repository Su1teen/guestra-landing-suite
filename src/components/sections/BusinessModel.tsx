import { Layers, Building2, MessageSquare, Cpu, Users, Plug, Scaling } from "lucide-react";
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

export const BusinessModel = () => {
  const { open } = useDemoModal();
  return (
    <section id="model" className="section bg-background-alt">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Модель сотрудничества"
          title="Платформа + результат."
          lede="Стоимость зависит от конфигурации отеля, а часть вознаграждения может быть привязана к измеримому результату. Без фиксированного прайс-листа — конфигурация обсуждается на демо."
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
              <h3 className="mt-2 text-xl font-semibold">Модель, связанная с результатом</h3>
              <p className="mt-2 text-sm text-white/65">
                Опционально часть вознаграждения привязывается к измеримому прироcту относительно базового периода — например, по прямым бронированиям, доп. выручке или повторным гостям.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Базовый период фиксируется до старта", "Метрики согласуются с собственником", "Прозрачный расчёт в аналитике Guestra"].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span className="text-white/80">{t}</span>
                  </li>
                ))}
              </ul>
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
