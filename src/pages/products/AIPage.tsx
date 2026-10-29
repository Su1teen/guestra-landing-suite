import { PageIntro, PageSection, Split, SplitText, ConceptNote, NextModule, Connections } from "@/components/page/PageBlocks";
import { AISection } from "@/components/home/AISection";
import { VoiceCallDemo } from "@/components/product/VoiceCallDemo";
import { InboxPreview } from "@/components/product/CRMWidgets";
import { AIPermissions, KnowledgeBaseCard, AIAnalystConcept } from "@/components/product/AIWidgets";
import { RepeatGuest, ServicesToFolio } from "@/components/product/ModuleLinkFragments";
import { ContactSection } from "@/components/shared/ContactSection";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Reveal } from "@/components/shared/Reveal";
import { aiFaq } from "@/data/faq";

const AIPage = () => (
  <main>
    <PageIntro
      eyebrow="AI-администратор"
      title="Отвечает гостям сразу и доводит разговор до оплаченной брони"
      description="AI-администратор работает в WhatsApp, Telegram и по телефону. Он берёт наличие и цены из PMS, отправляет предложение, держит номер до оплаты и передаёт сложные случаи сотруднику вместе с перепиской."
      visual={<InboxPreview />}
      secondary={{ label: "Как это работает", href: "#chat" }}
    />

    <AISection id="chat" />

    <PageSection
      id="voice"
      tone="alt"
      eyebrow="Голосовой агент"
      title="Звонок не теряется, даже когда ресепшен занят"
      lede="Голосовой агент принимает входящий звонок, уточняет даты и состав гостей, называет цену из PMS и отправляет предложение в WhatsApp. Итог разговора сразу попадает в обращение в CRM."
    >
      <Reveal><VoiceCallDemo /></Reveal>
    </PageSection>

    <PageSection
      eyebrow="Полномочия"
      title="Что AI делает сам, а что оставляет людям"
      lede="AI вызывает те же функции PMS и CRM, что и сотрудник, и проходит те же проверки. Действия, которые меняют деньги и правила, остаются за командой."
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <Reveal><AIPermissions /></Reveal>
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p><b className="font-semibold text-foreground">Цена берётся в момент ответа.</b> Если тариф изменился, пока гость думал, система не даст забронировать по старой цене.</p>
          <p><b className="font-semibold text-foreground">Повтор не создаёт дубль.</b> Если гость дважды нажмёт «бронирую» или сообщение придёт повторно, бронь будет одна.</p>
          <p><b className="font-semibold text-foreground">Каждый шаг записан.</b> В обращении видно, что AI предложил, что гость принял и когда пришла оплата.</p>
        </div>
      </div>
    </PageSection>

    <PageSection tone="alt" title="Знает ваш отель и ваших гостей">
      <Split visual={<KnowledgeBaseCard />}>
        <SplitText
          title="Правила отеля — из базы знаний"
          lede="Условия отмены, предоплата, время заезда, маршрут, правила для животных. AI отвечает по ним, а не придумывает. Базу заполняем вместе при запуске."
        />
      </Split>
      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SplitText title="Узнаёт повторных гостей" lede="AI видит прошлые визиты, траты и пожелания. Гостю не нужно заново объяснять, что он любит и когда приезжает." />
          <div className="mt-6"><RepeatGuest /></div>
        </div>
        <div>
          <SplitText title="Предлагает услуги к месту" lede="SPA, баня, трансфер, ужин. AI предлагает то, что гость уже брал, проверяет свободное время и добавляет услугу в счёт после согласия." />
          <div className="mt-6"><ServicesToFolio /></div>
        </div>
      </div>
    </PageSection>

    <PageSection
      eyebrow="В разработке"
      title="Что появится дальше"
      lede="Над этими возможностями мы работаем сейчас."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <ul className="space-y-6">
          <li>
            <h3 className="flex items-center gap-2 font-semibold">AI-аналитик для руководителя <StatusBadge /></h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Вопрос о цифрах отеля обычными словами. Ответ строится по данным PMS и CRM: загрузка, отмены, изменения цен. Если нужно действие, AI предложит его, а решение останется за вами.</p>
          </li>
          <li>
            <h3 className="flex items-center gap-2 font-semibold">Instagram во входящих <StatusBadge /></h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Директ появится в тех же входящих, что WhatsApp и Telegram, с тем же AI-администратором.</p>
          </li>
        </ul>
        <div>
          <AIAnalystConcept />
          <ConceptNote />
        </div>
      </div>
    </PageSection>

    <PageSection tone="alt" title="Где AI берёт данные и куда их передаёт">
      <Connections
        module="AI-администратор"
        from={["Наличие и тарифы из PMS", "История гостя из CRM", "База знаний объекта"]}
        to={["Обращения и КП в CRM", "Брони и услуги в PMS", "Задачи для служб"]}
      />
    </PageSection>

    <NextModule href="/crm" />
    <ContactSection faq={aiFaq} />
  </main>
);

export default AIPage;
