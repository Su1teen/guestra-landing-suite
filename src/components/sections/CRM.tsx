import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { CRMKanban } from "@/components/product/CRMKanban";
import { GuestProfile } from "@/components/product/GuestProfile";

export const CRM = () => (
  <section id="crm" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="CRM для отеля"
        title="CRM, которая понимает, что такое бронь, гость и доп. услуга."
        lede="Не универсальная воронка, а гостиничный процесс: от обращения до подтверждённой предоплаты. Каждый лид связан с гостем, а гость — с историей проживаний."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <Reveal delay={0.1} className="min-w-0">
          <CRMKanban />
          <p className="mt-3 px-1 text-xs text-muted-foreground">
            Карточка «Анна Иванова» переходит в «Подтверждено» автоматически после получения предоплаты.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <GuestProfile />
        </Reveal>
      </div>
    </div>
  </section>
);
