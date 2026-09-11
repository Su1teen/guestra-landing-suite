import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { DynamicPricingDemo } from "@/components/product/DynamicPricingDemo";

export const Pricing = () => (
  <section id="pricing" className="section bg-background-alt">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Динамическое ценообразование"
        title="Цена меняется вместе со спросом. И вы понимаете почему."
        lede="Сезон, загрузка, темп бронирований и праздники учитываются автоматически. Каждый фактор виден, минимальная цена защищена."
      />
      <Reveal delay={0.1} className="mt-12">
        <DynamicPricingDemo />
      </Reveal>
    </div>
  </section>
);
