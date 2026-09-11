import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { OperationsDashboard } from "@/components/product/OperationsDashboard";

export const Operations = () => (
  <section id="operations" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Операции"
        title="Бронь создана — отель уже готовится."
        lede="Housekeeping, подготовка к заезду, запросы гостей, сервисные задачи и сбор отзывов запускаются событиями, а не звонками между отделами. Персонал видит задачи в телефоне."
      />
      <Reveal delay={0.1} className="mt-12">
        <OperationsDashboard />
      </Reveal>
    </div>
  </section>
);
