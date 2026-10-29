import { PageIntro, PageSection, Split, SplitText, GroupCapabilities, NextModule } from "@/components/page/PageBlocks";
import { OwnerDashboard } from "@/components/product/OwnerDashboard";
import { PortfolioDashboard } from "@/components/product/PortfolioDashboard";
import { AttentionPanel, ManagementReport } from "@/components/product/OwnerSignals";
import { TeamActivity } from "@/components/product/TeamActivity";
import { FolioCard } from "@/components/product/FolioCard";
import { NightAuditClose } from "@/components/product/ModuleLinkFragments";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/shared/Reveal";

const OwnerPage = () => (
  <main>
    <PageIntro
      layout="below"
      eyebrow="Кабинет собственника"
      title="Выручка, решения команды и состояние отеля каждое утро в одном окне"
      description="Показатели считаются из тех же броней, оплат и задач, с которыми работает команда. Не нужно ждать отчёт управляющего или собирать таблицы из разных программ."
      visual={<OwnerDashboard />}
      secondary={{ label: "Несколько объектов", href: "#portfolio" }}
    />

    <PageSection eyebrow="Отклонения" title="Не искать проблему в отчёте, а видеть, где она появилась" lede="Ручная смена цены, возврат выше лимита, просроченная уборка, падение темпа продаж. События собираются в одном списке, а журнал показывает, кто принял решение.">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="min-w-0"><AttentionPanel className="h-full" /></Reveal>
        <Reveal delay={0.08} className="min-w-0"><TeamActivity className="h-full" /></Reveal>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">Журнал — не слежка, а ответ на вопрос «почему так получилось». Права на скидки, возвраты и изменение цен настраиваются по ролям.</p>
    </PageSection>

    <PageSection id="portfolio" tone="alt" eyebrow="Несколько объектов" title="Сеть целиком и каждый объект отдельно" lede="Сравнивайте выручку, загрузку и RevPAR и переходите к объекту, когда показатель требует объяснения. Гость, который жил в одном объекте, во втором уже знаком.">
      <Reveal><PortfolioDashboard /></Reveal>
    </PageSection>

    <PageSection title="Финансы">
      <div className="space-y-20">
        <Split visual={<ManagementReport />}>
          <SplitText
            eyebrow="Управленческий отчёт"
            title="План, факт и прогноз месяца"
            lede="Выручка по номерам и допуслугам, расходы и GOP по каждому объекту и сети. Факт с начала месяца и года сравнивается с планом, прогноз показывает, чем закончится месяц."
          />
        </Split>
        <Split reverse visual={<div className="space-y-4"><FolioCard /><NightAuditClose /></div>}>
          <SplitText
            eyebrow="Деньги по броням"
            title="Каждая оплата привязана к проживанию"
            lede="Фолио, касса, депозиты и возвраты ведутся в PMS. Ночной аудит закрывает день, и ежедневный отчёт собирается из тех же данных, что видит ресепшен."
          />
        </Split>
      </div>
    </PageSection>

    <GroupCapabilities groupId="finance" />
    <NextModule href="/ai" />
    <ContactSection />
  </main>
);

export default OwnerPage;
