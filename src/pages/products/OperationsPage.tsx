import { PageIntro, PageSection, Split, SplitText, GroupCapabilities, NextModule, Connections } from "@/components/page/PageBlocks";
import { OperationsDashboard } from "@/components/product/OperationsDashboard";
import { HousekeepingBoard, ShiftsCard, MaintenanceCard, LostFoundCard } from "@/components/product/OpsWidgets";
import { CheckoutCleaning, GuestRequestTask } from "@/components/product/ModuleLinkFragments";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/shared/Reveal";

const OperationsPage = () => (
  <main>
    <PageIntro
      layout="below"
      eyebrow="Операции"
      title="Службы знают, что делать. Руководитель видит, что не сделано."
      description="Подготовка к заезду, уборка, техслужба и просьбы гостей приходят нужным сотрудникам с номером комнаты и сроком. Задержки поднимаются наверх, без звонков между отделами."
      visual={<OperationsDashboard />}
      secondary={{ label: "Кабинет собственника", href: "/owner" }}
    />

    <PageSection eyebrow="Уборка" title="Задания уборки с чек-листами и проверкой" lede="Задача создаётся после выезда или к заезду, назначается горничной и проходит проверку супервайзера. Номер для VIP-гостя получает приоритет автоматически.">
      <Reveal><HousekeepingBoard /></Reveal>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Reveal><ShiftsCard /></Reveal>
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-border bg-background-alt p-5">
            <h3 className="font-semibold">Выезд запускает уборку</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">После выезда номер становится грязным, а служба получает задачу. Заселить в непроверенный номер можно только с отметкой об исключении.</p>
            <div className="mt-4"><CheckoutCleaning /></div>
          </div>
        </Reveal>
      </div>
    </PageSection>

    <PageSection tone="alt" title="Техслужба и просьбы гостей">
      <div className="space-y-20">
        <Split visual={<MaintenanceCard />}>
          <SplitText
            eyebrow="Техслужба"
            title="Сломанный номер не продаётся"
            lede="Заявка может заблокировать номер. Пока она открыта, номер не предложит ни сотрудник, ни AI, а руководитель видит, сколько номеров сейчас вне продажи."
          />
        </Split>
        <Split reverse visual={<div className="space-y-4"><GuestRequestTask /><LostFoundCard /></div>}>
          <SplitText
            eyebrow="Запросы гостей"
            title="Просьба гостя становится задачей"
            lede="Запрос из переписки или с ресепшена уходит нужной службе со сроком. Найденные вещи учитываются с кодом и сроком хранения, гостю приходит уведомление."
          />
        </Split>
      </div>
    </PageSection>

    <GroupCapabilities groupId="operations" tone="default" />

    <PageSection tone="alt" title="Связь с другими модулями">
      <Connections
        module="Операции"
        from={["Заезды и выезды из PMS", "Просьбы гостей из переписки", "Заявки сотрудников"]}
        to={["Готовность номеров на ресепшен", "Блокировка номеров в продаже", "Отклонения в кабинет собственника"]}
      />
    </PageSection>

    <NextModule href="/owner" />
    <ContactSection />
  </main>
);

export default OperationsPage;
