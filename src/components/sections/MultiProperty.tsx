import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { PortfolioDashboard } from "@/components/product/PortfolioDashboard";

export const MultiProperty = () => (
  <section id="networks" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Для сетей и групп"
        title="Один отель или сеть — одна система."
        lede="Портфель, объект, отдел. Управляйте несколькими объектами из одного кабинета, а гости узнаются на уровне всей сети."
      />
      <Reveal delay={0.1} className="mt-12">
        <PortfolioDashboard />
      </Reveal>
    </div>
  </section>
);
