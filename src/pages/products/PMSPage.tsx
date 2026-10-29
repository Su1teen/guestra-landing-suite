import { PageIntro, PageSection, Split, SplitText, GroupCapabilities, NextModule, Connections } from "@/components/page/PageBlocks";
import { PMSChessboard } from "@/components/product/PMSChessboard";
import { FrontDeskToday } from "@/components/product/FrontDeskToday";
import { FolioCard } from "@/components/product/FolioCard";
import { BookingWorkspace, ServiceSlots, GroupBlockCard, NightAuditCard } from "@/components/product/PMSWidgets";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/shared/Reveal";
import { pmsFaq } from "@/data/faq";

const PMSPage = () => (
  <main>
    <PageIntro
      layout="below"
      eyebrow="PMS"
      title="PMS, с которой работает весь отель"
      description="Шахматка, ресепшен, услуги, группы, фолио, касса и ночной аудит в одной системе. Брони из AI-администратора и CRM появляются в шахматке сразу, без ручного переноса."
      visual={<PMSChessboard />}
      secondary={{ label: "Управление доходами", href: "/revenue-management" }}
    />

    <PageSection title="Ресепшен и бронь">
      <div className="space-y-20">
        <Split visual={<FrontDeskToday />}>
          <SplitText
            eyebrow="Ресепшен"
            title="Заезды, проживающие и выезды на одном экране"
            lede="Администратор видит, кто приезжает сегодня, готов ли номер и что гость просил заранее. Заселить в неубранный номер можно только с отметкой об исключении."
            points={[
              { title: "Заселение без брони", text: "Гость с улицы оформляется за минуту, с проверкой наличия и цены." },
              { title: "Выезд с проверкой счёта", text: "Система напомнит о неоплаченном остатке и незакрытых услугах, а номер сразу уйдёт в уборку." },
            ]}
          />
        </Split>
        <Split reverse visual={<BookingWorkspace />}>
          <SplitText
            eyebrow="Карточка брони"
            title="Всё о проживании в одной карточке"
            lede="Даты, номер, гости, услуги, фолио, задачи, заметки и история изменений. Перенос дат и смена номера проверяют наличие и пересчитывают цену по каждой ночи."
          />
        </Split>
      </div>
    </PageSection>

    <PageSection tone="alt" eyebrow="Услуги и пакеты" title="Баня, SPA и трансфер продаются по свободному времени" lede="Каждая услуга привязана к ресурсу с вместимостью и рабочими часами. Её можно продать к проживанию, в пакете или гостю без проживания. Начисление сразу попадает в фолио.">
      <Reveal><ServiceSlots /></Reveal>
    </PageSection>

    <PageSection title="Группы, компании и деньги">
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <SplitText title="Группы и квоты" lede="Блок номеров с датами заезда и выезда, списком проживающих и сроком отпуска квоты." />
          <Reveal className="mt-6"><GroupBlockCard /></Reveal>
        </div>
        <div>
          <SplitText title="Фолио и касса" lede="Начисления, оплаты, депозиты и возвраты по каждой брони. Служебные счета для внутренних расходов." />
          <Reveal delay={0.05} className="mt-6"><FolioCard /></Reveal>
        </div>
        <div>
          <SplitText title="Ночной аудит" lede="За ночь система начисляет проживание, сверяет оплаты и закрывает день. Утром отчёт уже собран." />
          <Reveal delay={0.1} className="mt-6"><NightAuditCard /></Reveal>
        </div>
      </div>
    </PageSection>

    <PageSection tone="alt" eyebrow="Переход" title="Переезд с текущей PMS" lede="Номерной фонд, тарифы, будущие брони и база гостей переносятся импортом. Порядок перехода согласуем заранее, чтобы ресепшен не работал в двух системах дольше, чем нужно.">
      <ol className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Номера и тарифы", text: "Категории, номера, тарифные планы и ограничения." },
          { title: "Брони и гости", text: "Будущие брони с оплатами и база гостей с историей." },
          { title: "Услуги и правила", text: "Услуги, ресурсы, налоги и права сотрудников." },
        ].map((item, i) => (
          <li key={item.title} className="border-t-2 border-foreground pt-4">
            <span className="num text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ol>
    </PageSection>

    <GroupCapabilities groupId="stays" tone="default" />

    <PageSection tone="alt" title="Связь с другими модулями">
      <Connections
        module="PMS"
        from={["Брони от AI-администратора и CRM", "Занятость с OTA через iCal", "Рекомендованные цены"]}
        to={["Задачи уборки и техслужбы", "Фолио и ночной аудит", "Отчёты собственника"]}
      />
    </PageSection>

    <NextModule href="/revenue-management" />
    <ContactSection faq={pmsFaq} />
  </main>
);

export default PMSPage;
