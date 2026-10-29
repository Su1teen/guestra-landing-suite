import { ArrowRight, FileClock, KeyRound, Layers3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { implementationSteps } from "@/data/implementation";

const trust = [
  { icon: KeyRound, title: "Права по роли и объекту", text: "Каждый сотрудник видит только то, что нужно для его работы." },
  { icon: FileClock, title: "История изменений", text: "Смена тарифа, брони, возврат и права доступа остаются в журнале." },
  { icon: ShieldCheck, title: "AI работает через проверки", text: "Каждое действие агента проходит правила системы, как действие сотрудника." },
  { icon: Layers3, title: "Объекты разделены", text: "Данные каждого объекта и сети изолированы друг от друга." },
];

export const ImplementationSection = () => (
  <section id="implementation" className="section bg-background">
    <div className="container-wide">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow="Внедрение" title="Подключаем без остановки работы отеля" />
          <ol className="mt-10 space-y-8">
            {implementationSteps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[40px_1fr] gap-4">
                <span className="num flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-semibold">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/implementation" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Как проходит внедрение <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="hidden rounded-3xl border border-border bg-background-alt p-6 sm:p-8 md:block">
          <p className="eyebrow">Данные и доступ</p>
          <ul className="mt-6 space-y-5">
            {trust.map((item) => (
              <li key={item.title} className="flex gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm"><item.icon className="h-4 w-4" /></span>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/security" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Как мы защищаем данные <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
