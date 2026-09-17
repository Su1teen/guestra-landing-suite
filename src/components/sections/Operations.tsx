import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { OperationsDashboard } from "@/components/product/OperationsDashboard";

export const Operations = () => (
  <section id="operations" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Операции отеля"
        title="У каждой задачи есть срок и ответственный."
        lede="Подготовка номера, запрос гостя или инженерная заявка получают исполнителя и статус. Руководитель видит просрочки и может разобрать, где задержался процесс."
      />
      <Reveal delay={0.1} className="mt-12">
        <OperationsDashboard />
      </Reveal>
    </div>
  </section>
);
