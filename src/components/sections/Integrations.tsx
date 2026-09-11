import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { IntegrationGraph } from "@/components/product/IntegrationGraph";
import { integrations } from "@/data/demo";

export const Integrations = () => (
  <section id="integrations" className="ink section relative overflow-hidden">
    <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]" aria-hidden />
    <div className="container-wide relative">
      <SectionHeader
        eyebrow="Интеграции и архитектура"
        title="Подключается ко всему, что у вас уже есть."
        lede="Guestra — не ещё одна система рядом с остальными, а слой, который их связывает. Данные и события идут в обе стороны."
        align="center"
      />
      <Reveal delay={0.1} className="mt-12">
        <IntegrationGraph />
      </Reveal>
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
