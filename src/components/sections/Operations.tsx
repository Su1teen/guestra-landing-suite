import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { OperationsDashboard } from "@/components/product/OperationsDashboard";

export const Operations = () => (
  <section id="operations" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Операции отеля"
        title="Бронь создана — службы отеля уже в работе."
        lede="Уборка номеров, подготовка к заезду, запросы гостей, инженерные заявки и сбор отзывов запускаются автоматически по событиям, а не звонками между отделами. Команда видит задачи прямо на смартфонах."
      />
      <Reveal delay={0.1} className="mt-12">
        <OperationsDashboard />
      </Reveal>
    </div>
  </section>
);
