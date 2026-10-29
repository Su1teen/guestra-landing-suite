import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroComposition } from "@/components/product/HeroComposition";
import { useDemoModal } from "@/components/layout/DemoModal";

const facts = ["WhatsApp, Telegram и телефон", "Шахматка, касса и ночной аудит", "Отчёты по каждому объекту и сети", "Интерфейс на русском"];

export const Hero = () => {
  const { open } = useDemoModal();
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div className="container-wide px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">PMS · CRM · AI-администратор</p>
          <h1 className="mx-auto mt-5 max-w-[24ch] text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]">
            Гостиничная система, где AI доводит обращение до&nbsp;оплаченной брони
          </h1>
          <p className="lede mx-auto mt-6 max-w-2xl">
            AI-администратор отвечает гостям в WhatsApp, Telegram и по телефону, проверяет свободные номера и цены в PMS и держит номер, пока гость оплачивает. Сложный разговор забирает сотрудник — со всей перепиской и историей гостя.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 w-full rounded-full px-7 text-[15px] shadow-lg shadow-primary/25 sm:w-auto" onClick={() => open("demo")}>
              Запросить демо
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 w-full rounded-full px-7 text-[15px] sm:w-auto">
              <a href="#how">Как это работает <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl md:mt-16">
          <HeroComposition />
        </div>

        <ul className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:mt-24" aria-label="Коротко о Guestra">
          {facts.map((fact, i) => (
            <li key={fact} className="flex items-center gap-6">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" aria-hidden />}
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
