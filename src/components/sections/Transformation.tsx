import { SectionHeader } from "@/components/shared/SectionHeader";
import { BeforeAfter } from "@/components/product/BeforeAfter";
import { Reveal } from "@/components/shared/Reveal";

export const Transformation = () => (
  <section className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="До и после"
        title="Те же люди. Те же системы. Другая операционная модель."
        lede="Guestra не добавляет ещё один инструмент к десяти существующим. Она делает их одной системой."
        align="center"
      />
      <Reveal className="mt-14" delay={0.1}>
        <BeforeAfter />
      </Reveal>
    </div>
  </section>
);
