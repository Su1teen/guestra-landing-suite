import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { ModuleLinkCard } from "@/components/product/ModuleLinkCard";
import { moduleLinks } from "@/data/moduleLinks";

export const ModuleLinksSection = () => (
  <section id="how" className="section scroll-mt-16 bg-background-alt">
    <div className="container-wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Как модули работают вместе"
          title="От сообщения гостя до отчёта собственника"
          lede="Продажи, бронирования, службы и финансы в Guestra работают на одних данных. Действие в одном модуле сразу видно в остальных, без пересылок и ручного переноса."
        />
        <Link to="/platform" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline">
          Весь путь брони <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {/* На телефоне — лента с прокруткой, на планшете и десктопе — сетка. */}
      <div className="scrollbar-none -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
        {moduleLinks.slice(0, 6).map((link, i) => (
          <Reveal key={link.title} delay={(i % 3) * 0.06} className="w-[84%] shrink-0 snap-start md:w-auto">
            <ModuleLinkCard link={link} className="h-full" />
          </Reveal>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground md:hidden">Листайте вбок, чтобы увидеть все связки.</p>
    </div>
  </section>
);
