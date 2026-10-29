import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { DynamicPricingDemo } from "@/components/product/DynamicPricingDemo";

const notes = [
  { title: "Согласование", text: "Рекомендованная цена ждёт утверждения. Кто и когда утвердил, видно в истории." },
  { title: "Ограничения", text: "Минимальный срок проживания, закрытие заезда и выезда по датам и тарифам." },
  { title: "Прогноз", text: "Загрузка и выручка на 30 дней вперёд по каждой категории номеров." },
];

export const Pricing = ({ withLink = true }: { withLink?: boolean }) => (
  <section id="pricing" className="section bg-background-alt">
    <div className="container-wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Управление доходами"
          title="Цена следует за спросом. Решение остаётся за вами."
          lede="Guestra рассчитывает тариф по загрузке, темпу бронирований, сезону и праздникам и показывает вклад каждого фактора."
        />
        {withLink && (
          <Link to="/revenue-management" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Подробнее об управлении доходами <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <Reveal delay={0.05} className="mt-12">
        <DynamicPricingDemo />
      </Reveal>
      <dl className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        {notes.map((note) => (
          <div key={note.title}>
            <dt className="text-sm font-semibold">{note.title}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{note.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
