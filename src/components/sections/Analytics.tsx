import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { OwnerDashboard } from "@/components/product/OwnerDashboard";

export const Analytics = () => (
  <section id="analytics" className="section bg-background-alt">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Аналитика для собственника"
        title="Собственник видит весь бизнес. Не только загрузку."
        lede="Выручка, ADR, RevPAR, доля прямых бронирований, повторные гости и доп. услуги — по каждому объекту и по сети. Ежедневный отчёт формируется сам."
      />
      <Reveal delay={0.1} className="mt-12">
        <OwnerDashboard />
      </Reveal>
    </div>
  </section>
);
