import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { IntegrationGraph } from "@/components/product/IntegrationGraph";
import { integrations } from "@/data/demo";

export const Integrations = () => (
  <section id="integrations" className="ink section relative overflow-hidden">
    <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]" aria-hidden />
    <div className="container-wide relative">
      <SectionHeader
        eyebrow="Интеграции и источники данных"
        title="Разберём, какие системы можно подключить."
        lede="Схема показывает направления обмена. Для конкретного отеля проверяем API, состав данных и ограничения каждой системы до настройки интеграции."
        align="center"
      />
      <Reveal delay={0.1} className="mt-12">
        <IntegrationGraph />
      </Reveal>
      <p className="mt-5 text-center text-xs text-white/50">Схема возможной архитектуры, не список готовых коннекторов.</p>
      <Reveal delay={0.2} className="mt-10">
        <ul className="flex flex-wrap justify-center gap-2" aria-label="Список интеграций">
          {integrations.map((i) => (
            <li key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
              {i}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
