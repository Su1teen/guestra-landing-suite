import { PageIntro, PageSection, Split, SplitText, GroupCapabilities, NextModule, Connections } from "@/components/page/PageBlocks";
import { CRMKanban } from "@/components/product/CRMKanban";
import { GuestTimeline } from "@/components/product/GuestTimeline";
import { InboxPreview, ClassificationCard, PaymentHoldCard, SalesPerformance, SegmentCard, ReputationCard } from "@/components/product/CRMWidgets";
import { Reminders } from "@/components/product/ModuleLinkFragments";
import { ContactSection } from "@/components/shared/ContactSection";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Reveal } from "@/components/shared/Reveal";
import { crmFaq } from "@/data/faq";

const stages = [
  { title: "Новый запрос", text: "Гость написал или позвонил. Обращение создаётся само, с каналом и историей." },
  { title: "Клиент думает", text: "Предложение отправлено. Система назначает напоминание, чтобы гость не потерялся." },
  { title: "Готов оплатить", text: "Гость согласен. Номер удерживается, уходит ссылка на оплату." },
  { title: "Ожидает оплаты", text: "Удержание действует до назначенного времени, потом номер вернётся в продажу." },
  { title: "Подтверждено", text: "Оплата пришла, бронь в шахматке, напоминания гостю запланированы." },
];

const CRMPage = () => (
  <main>
    <PageIntro
      eyebrow="CRM и входящие"
      title="Каждое обращение доходит до брони или закрывается с причиной"
      description="WhatsApp, Telegram и звонки собираются в одних входящих. Рядом с перепиской — профиль гостя, свободные номера и следующий шаг. Руководитель видит, где остановилась каждая продажа."
      visual={<InboxPreview />}
      secondary={{ label: "AI-администратор", href: "/ai" }}
    />

    <PageSection
      eyebrow="Обращения"
      title="Пять статусов от вопроса до оплаты"
      lede="Статусы те же, что в рабочем интерфейсе Guestra CRM. Карточку можно двигать вручную, а AI переводит её сам, когда гость отвечает или платит."
    >
      <Reveal><CRMKanban /></Reveal>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {stages.map((stage, i) => (
          <li key={stage.title}>
            <span className="num text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-sm font-semibold">{stage.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
          </li>
        ))}
      </ol>
    </PageSection>

    <PageSection tone="alt" title="Деньги и подсказки рядом с разговором">
      <div className="space-y-20">
        <Split visual={<PaymentHoldCard />}>
          <SplitText
            eyebrow="Оплата"
            title="Номер держится за гостем, пока он платит"
            lede="Когда гость согласен, CRM удерживает номер в PMS и отправляет ссылку на предоплату. Если оплата не пришла вовремя, удержание снимается само."
            points={[
              { title: "Бронь подтверждается оплатой", text: "Пока депозит не покрыт, бронь остаётся в статусе «Ожидает оплаты»." },
              { title: "Оплата наличными или переводом", text: "Сотрудник регистрирует платёж с номером квитанции, и бронь подтверждается так же." },
            ]}
          />
        </Split>
        <Split reverse visual={<ClassificationCard />}>
          <SplitText
            eyebrow="Классификация"
            title="Подсказка, с кем говорить в первую очередь"
            lede="Guestra оценивает каждое обращение: насколько оно конкретное, насколько вероятна бронь и чего не хватает для предложения. Причины видны, оценку можно поправить вручную."
          />
        </Split>
        <Split visual={<Reminders />}>
          <SplitText
            eyebrow="Напоминания"
            title="Гость получает всё нужное до заезда"
            lede="За три дня и накануне заезда уходит сообщение с маршрутом в 2ГИС и условиями отмены. Если даты меняются, напоминания переносятся, при отмене — отменяются."
          />
        </Split>
      </div>
    </PageSection>

    <PageSection eyebrow="Гости" title="Гость, который приезжал раньше, остаётся знакомым" lede="Брони, проживания, покупки, переписка и заметки собираются в одном профиле. Если гость бронирует для семьи или компании, Guestra различает бронирующего и проживающих.">
      <Reveal><GuestTimeline /></Reveal>
    </PageSection>

    <PageSection tone="alt" title="Руководителю продаж">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <SplitText title="Кто сколько продаёт и как быстро отвечает" lede="Обращения, доля дошедших до брони, время первого ответа и выручка по каждому сотруднику и по AI. Причины отказов собираются автоматически." />
          <Reveal delay={0.05} className="mt-6"><SalesPerformance /></Reveal>
        </div>
        <div>
          <SplitText title="Повторные продажи по истории" lede="Сегменты строятся по проживаниям и покупкам: например, кто брал SPA и давно не приезжал." />
          <Reveal delay={0.1} className="mt-6"><SegmentCard /></Reveal>
        </div>
      </div>
    </PageSection>

    <PageSection
      eyebrow="Репутация"
      title="Отзыв связан с проживанием и сотрудником"
      lede="Команда записывает отзывы, видит, к какому проживанию они относятся, и готовит ответ. Негатив без ответа не теряется в общей ленте."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal><ReputationCard /></Reveal>
        <div className="rounded-2xl border border-dashed border-border p-6">
          <h3 className="flex items-center gap-2 font-semibold">Отзывы с внешних площадок <StatusBadge /></h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Booking.com, Google и 2ГИС в той же ленте: оценка, текст, связь с проживанием и задача службе, если гость пожаловался.</p>
        </div>
      </div>
    </PageSection>

    <GroupCapabilities groupId="sales" />

    <PageSection title="Связь с другими модулями">
      <Connections
        module="CRM"
        from={["Свободные номера и цены из PMS", "Разговоры AI-администратора", "Оплаты по ссылкам"]}
        to={["Брони и услуги в PMS", "Напоминания гостю", "Отчёты по продажам"]}
      />
    </PageSection>

    <NextModule href="/pms" />
    <ContactSection faq={crmFaq} />
  </main>
);

export default CRMPage;
