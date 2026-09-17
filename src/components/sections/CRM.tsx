import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { CRMKanban } from "@/components/product/CRMKanban";
import { GuestProfile } from "@/components/product/GuestProfile";

export const CRM = () => (
  <section id="crm" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="CRM для отеля"
        title="От обращения до подтверждённой брони."
        lede="Менеджер видит запрос, предложенный номер, предоплату и историю гостя в одной цепочке. Руководитель может проверить, где заявка остановилась."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <Reveal delay={0.1} className="min-w-0">
          <CRMKanban />
          <p className="mt-3 px-1 text-xs text-muted-foreground">
            Демонстрационный сценарий: после предоплаты карточка «Анна Иванова» переходит в «Подтверждено».
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <GuestProfile />
        </Reveal>
      </div>
    </div>
  </section>
);
