import { BedDouble, BellRing, FileBarChart2, KeyRound, Link2, ListChecks, LockKeyhole, MessageSquareText, ReceiptText, ShieldCheck, TrendingUp, UserRoundCheck } from "lucide-react";
import { PageIntro } from "@/components/shared/PageIntro";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { OwnerDashboard } from "@/components/product/OwnerDashboard";
import { PortfolioDashboard } from "@/components/product/PortfolioDashboard";
import { OwnerReporting, OwnerSignals } from "@/components/product/OwnerSignals";
import { CRM } from "@/components/sections/CRM";
import { Guest360 } from "@/components/sections/Guest360";
import { PMS } from "@/components/sections/PMS";
import { Pricing } from "@/components/sections/Pricing";
import { Operations } from "@/components/sections/Operations";
import { AISales } from "@/components/sections/AISales";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { Integrations } from "@/components/sections/Integrations";
import { NoRipReplace } from "@/components/sections/NoRipReplace";
import { CTASection } from "@/components/sections/CTASection";

const DetailCards = ({ eyebrow, title, lede, items, alt = false }: {
  eyebrow: string; title: string; lede?: string; alt?: boolean;
  items: { title: string; text: string; icon: typeof TrendingUp }[];
}) => <section className={`section ${alt ? "bg-background-alt" : "bg-background"}`}>
  <div className="container-wide">
    <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
    <div className="mt-10 grid gap-3 md:grid-cols-3">
      {items.map((item, i) => <Reveal key={item.title} delay={i * 0.08}>
        <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-sm">
          <item.icon className="h-5 w-5 text-primary" />
          <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
        </div>
      </Reveal>)}
    </div>
  </div>
</section>;

export const OwnerPage = () => <main>
  <PageIntro eyebrow="Для собственника" title="Видите выручку, команду и операции" description="Guestra собирает коммерческие и операционные данные в одном кабинете. Смотрите результат по объектам, разбирайте отклонения и проверяйте действия команды." secondLink={{ label: "Посмотреть продукты", href: "/crm" }} />
  <section className="section bg-background">
    <div className="container-wide">
      <SectionHeader eyebrow="Кабинет собственника" title="Результат месяца и причины изменений" lede="Выручка, загрузка, ADR, RevPAR, прямые продажи и ежедневный отчёт - с переходом от сети к отдельному объекту." />
      <Reveal delay={0.1} className="mt-12"><OwnerDashboard /></Reveal>
      <p className="mt-3 text-xs text-muted-foreground">Визуальный пример. Показатели демонстрационные.</p>
    </div>
  </section>
  <OwnerSignals />
  <section className="section bg-background">
    <div className="container-wide">
      <SectionHeader eyebrow="Несколько объектов" title="Сеть видна целиком. Каждый объект - отдельно." lede="Сравнивайте результаты отелей и переходите к конкретному объекту, когда показатель требует объяснения." />
      <Reveal delay={0.1} className="mt-12"><PortfolioDashboard /></Reveal>
    </div>
  </section>
  <OwnerReporting />
  <CTASection />
</main>;

export const CRMPage = () => <main>
  <PageIntro eyebrow="CRM и продажи" title="Каждое обращение - до брони и оплаты" description="Смотрите, откуда пришёл запрос, кто ведёт гостя и на каком шаге остановилась продажа. История проживания помогает работать с повторными визитами." secondLink={{ label: "Как связана с PMS", href: "/pms" }} />
  <CRM />
  <Guest360 />
  <DetailCards eyebrow="Контроль продаж" title="Руководителю виден путь каждой заявки" items={[
    { icon: MessageSquareText, title: "Источник и диалог", text: "Обращение сохраняется вместе с каналом, датами поездки и запросом гостя." },
    { icon: ListChecks, title: "Следующее действие", text: "Менеджер видит, кому ответить, где нужна предоплата и какие заявки остались без движения." },
    { icon: ReceiptText, title: "Результат", text: "Подтверждённая бронь и оплата связываются с исходным обращением." },
  ]} />
  <CTASection />
</main>;

export const PMSPage = () => <main>
  <PageIntro eyebrow="PMS" title="Бронь, номер, тариф и платёж - в одной записи" description="Шахматка показывает занятость номерного фонда. В карточке брони видны гость, источник, условия проживания, оплата и связанные задачи." secondLink={{ label: "Посмотреть операции", href: "/operations" }} />
  <PMS />
  <Guest360 />
  <DetailCards eyebrow="Работа отеля" title="Данные PMS становятся основой для действий служб" items={[
    { icon: BedDouble, title: "Заезд и номер", text: "Статус готовности номера связан с датой заезда и задачами уборки." },
    { icon: TrendingUp, title: "Тарифы", text: "Изменение цены можно проследить до фактора спроса и ручного решения сотрудника." },
    { icon: ReceiptText, title: "Расчёты", text: "Оплаты и дополнительные услуги учитываются рядом с бронью и профилем гостя." },
  ]} />
  <CTASection />
</main>;

export const RevenuePage = () => <main>
  <PageIntro eyebrow="Revenue Management" title="Цена реагирует на спрос. Причины видны команде." description="Загрузка, темп бронирования, сезон и события влияют на рекомендуемый тариф. Сотрудник видит расчёт и может проверить изменение до публикации." secondLink={{ label: "Кабинет собственника", href: "/owner" }} />
  <Pricing />
  <DetailCards eyebrow="Контроль цены" title="Правила задаёт отель" items={[
    { icon: TrendingUp, title: "Факторы спроса", text: "Рекомендация показывает, какое влияние оказали загрузка, темп бронирования и дата." },
    { icon: ShieldCheck, title: "Нижняя граница", text: "Минимальный тариф ограничивает автоматическое снижение цены." },
    { icon: UserRoundCheck, title: "Ручное решение", text: "Изменение сотрудником фиксируется в истории и может быть проверено руководителем." },
  ]} />
  <CTASection />
</main>;

export const OperationsPage = () => <main>
  <PageIntro eyebrow="Операции" title="Службы знают задачи. Руководитель видит задержки." description="Подготовка номера, инженерные заявки и запросы гостей попадают к ответственным сотрудникам. Статус и срок исполнения видны без звонков между отделами." secondLink={{ label: "Кабинет собственника", href: "/owner" }} />
  <Operations />
  <DetailCards alt eyebrow="Контроль исполнения" title="Проблемы не исчезают в переписке" items={[
    { icon: ListChecks, title: "Задача и ответственный", text: "У заявки есть объект, номер, исполнитель, срок и история изменения статуса." },
    { icon: BellRing, title: "Просрочка", text: "Если задача выходит за срок, руководитель видит её в списке событий, требующих внимания." },
    { icon: MessageSquareText, title: "Связь с гостем", text: "Запрос гостя можно связать с исполненной задачей и последующим отзывом." },
  ]} />
  <CTASection />
</main>;

export const AIPage = () => <main>
  <PageIntro eyebrow="AI в Guestra" title="AI работает с данными отеля" description="В сценариях продаж AI проверяет наличие и тариф, ведёт диалог с гостем и передаёт сложные случаи сотруднику. Действия должны быть видны и проверяемы." secondLink={{ label: "CRM и продажи", href: "/crm" }} />
  <AISales />
  <VoiceAI />
  <DetailCards eyebrow="Управляемость" title="Ответ и действие должны иметь источник" items={[
    { icon: Link2, title: "Наличие и цена", text: "AI запрашивает данные из подключённой PMS, а не придумывает свободные номера или тариф." },
    { icon: UserRoundCheck, title: "Передача человеку", text: "Сложный запрос или исключение переходит сотруднику вместе с контекстом диалога." },
    { icon: ListChecks, title: "История действий", text: "Значимые действия в сценарии должны сохраняться для проверки." },
  ]} />
  <CTASection />
</main>;

export const IntegrationsPage = () => <main>
  <PageIntro eyebrow="Интеграции" title="Начинаем с систем, которые уже работают в отеле" description="Для каждого объекта сначала проверяем источники данных, доступность API и правила обмена. Затем определяем, какие показатели и процессы Guestra сможет связать." secondLink={{ label: "Данные собственника", href: "/owner" }} />
  <Integrations />
  <NoRipReplace />
  <DetailCards eyebrow="1С и отчётность" title="Согласуем данные до настройки обмена" items={[
    { icon: FileBarChart2, title: "Что нужно видеть", text: "Финансовая команда определяет показатели управленческого отчёта, план/факт и детализацию по объектам." },
    { icon: Link2, title: "Откуда брать", text: "Проверяем конфигурацию 1С, доступные выгрузки и API, затем составляем карту полей." },
    { icon: ListChecks, title: "Как сверять", text: "До запуска сравниваем цифры Guestra с исходными системами и фиксируем правила обновления." },
  ]} />
  <CTASection />
</main>;

export const SecurityPage = () => <main>
  <PageIntro eyebrow="Безопасность" title="Доступ к данным гостей и бизнеса - под контролем" description="Для каждого внедрения нужно определить, кто видит данные, какие действия записываются и где хранятся персональные сведения. Эти требования проверяются до работы с реальными данными." secondLink={{ label: "Обсудить интеграции", href: "/integrations" }} />
  <DetailCards eyebrow="Доступ" title="Каждому сотруднику - только необходимые данные" items={[
    { icon: KeyRound, title: "Роли", text: "Права задаются по должности, объекту и типу данных. Финансовые данные и гостевые профили требуют отдельных ограничений." },
    { icon: UserRoundCheck, title: "Подтверждение входа", text: "Для административных ролей предусматриваются дополнительные проверки входа и управление активными сессиями." },
    { icon: ListChecks, title: "Журнал действий", text: "Изменения бронирований, тарифов, возвратов и прав доступа должны оставлять проверяемую запись." },
  ]} />
  <DetailCards alt eyebrow="Данные" title="Защита должна проверяться технически" items={[
    { icon: LockKeyhole, title: "Хранение и передача", text: "До запуска подтверждаем размещение данных, шифрование, резервное копирование и правила удаления." },
    { icon: ShieldCheck, title: "Разделение объектов", text: "Данные разных компаний и сетей не должны пересекаться. Это проверяется тестами и аудитом доступа." },
    { icon: BellRing, title: "Проверка перед запуском", text: "Архитектурный обзор и внешнее тестирование защиты нужны до работы с реальными персональными данными." },
  ]} />
  <section className="px-5 pb-10 sm:px-8"><p className="container-wide text-sm text-muted-foreground">Описание выше - требования к внедрению. Конкретные меры и готовность интеграций подтверждаются в техническом обследовании.</p></section>
  <CTASection />
</main>;
