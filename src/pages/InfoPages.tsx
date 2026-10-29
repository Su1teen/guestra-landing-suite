import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { PageIntro, PageSection, Points } from "@/components/page/PageBlocks";
import { ContactSection } from "@/components/shared/ContactSection";
import { LeadForm } from "@/components/shared/LeadForm";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Reveal } from "@/components/shared/Reveal";
import { implementationSteps } from "@/data/implementation";
import { updates } from "@/data/updates";
import { capabilityGroups } from "@/data/capabilities";
import { homeFaq } from "@/data/faq";
import { mailtoHref, SALES_EMAIL } from "@/lib/lead";

/* ─── Внедрение ───────────────────────────────────────────────── */

const prepare = [
  "Список номеров и категорий, домиков и других объектов размещения",
  "Тарифы, условия отмены и предоплаты",
  "Будущие брони и база гостей в выгрузке из текущей системы",
  "Услуги: SPA, баня, трансфер, питание, с ценами и расписанием",
  "Номера WhatsApp и Telegram, которые будут подключены",
  "Список сотрудников и их роли",
];

const training = [
  { title: "Ресепшен", text: "Шахматка, заезд и выезд, карточка брони, касса смены." },
  { title: "Продажи", text: "Входящие, обращения, предложения, оплаты, работа вместе с AI." },
  { title: "Службы", text: "Задания уборки, чек-листы, заявки техслужбы и просьбы гостей." },
  { title: "Руководители", text: "Цены и согласование, отчёты, журнал решений, права сотрудников." },
];

export const ImplementationPage = () => (
  <main>
    <PageIntro
      eyebrow="Внедрение"
      title="Переход на Guestra без остановки работы отеля"
      description="Внедрение ведёт команда Guestra: от обследования до первых недель работы с гостями. Порядок и сроки фиксируем в плане до начала переноса данных."
      secondary={{ label: "Что подготовить", href: "#prepare" }}
    />

    <PageSection title="Три этапа">
      <ol className="grid gap-8 md:grid-cols-3">
        {implementationSteps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.06}>
            <li className="border-t-2 border-foreground pt-5">
              <span className="num text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </PageSection>

    <PageSection id="prepare" tone="alt" title="Что подготовить к старту" lede="Если чего-то нет в готовом виде, соберём вместе на обследовании.">
      <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
        {prepare.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />{item}
          </li>
        ))}
      </ul>
    </PageSection>

    <PageSection title="Обучение по ролям" lede="Каждый учится на своих экранах и своих задачах, а не на всей системе сразу.">
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        <Points items={training.slice(0, 2)} />
        <Points items={training.slice(2)} />
      </div>
    </PageSection>

    <PageSection tone="alt" title="AI-администратор выходит на работу постепенно" lede="Сначала AI отвечает под присмотром администратора: сотрудник видит каждый ответ и может забрать диалог. Сценарии и базу знаний правим по живым разговорам, а самостоятельность AI расширяем, когда команда в нём уверена.">
      <Link to="/ai" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Как работает AI-администратор <ArrowRight className="h-4 w-4" /></Link>
    </PageSection>

    <ContactSection faq={[homeFaq[3], homeFaq[2], homeFaq[4]]} />
  </main>
);

/* ─── Цены ────────────────────────────────────────────────────── */

const factors = [
  { title: "Номерной фонд", text: "Количество номеров, домиков и других единиц размещения." },
  { title: "Модули и каналы", text: "PMS, CRM, AI-администратор, голосовой агент и число подключённых каналов." },
  { title: "Число объектов", text: "Один отель или сеть, где у каждого объекта свои данные и общая картина у собственника." },
  { title: "Внедрение", text: "Объём переноса данных, настройка услуг и сценариев AI, обучение команды." },
];

export const PricingPage = () => (
  <main>
    <section className="pricing-intro relative border-b border-border pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="container-wide relative grid gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_520px] lg:gap-16">
        <div>
          <p className="eyebrow">Цены</p>
          <h1 className="mt-5 text-balance text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">Стоимость считаем под ваш отель</h1>
          <p className="lede mt-6 max-w-xl">Цена зависит от номерного фонда, набора модулей и числа объектов. Оставьте заявку, и мы пришлём расчёт с составом работ по внедрению.</p>
          <dl className="pricing-factors mt-10 grid gap-6 sm:grid-cols-2">
            {factors.map((f) => (
              <div key={f.title}>
                <dt className="font-semibold">{f.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Получить расчёт</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Укажите номерной фонд, чтобы расчёт был точнее.</p>
          <LeadForm intent="pricing" submitLabel="Получить расчёт" className="mt-6" />
        </div>
      </div>
    </section>

    <PageSection title="Что входит в платформу" lede="Все модули работают на одних данных и связаны между собой.">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
        {capabilityGroups.map((g) => (
          <Link key={g.id} to={g.href} className="group border-t border-border pt-4">
            <h3 className="flex items-center justify-between gap-2 font-semibold group-hover:text-primary">{g.title}<ArrowRight className="h-4 w-4 shrink-0 opacity-40" /></h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{g.items.filter((i) => !i.status).length} работающих возможностей</p>
          </Link>
        ))}
      </div>
    </PageSection>
  </main>
);

/* ─── Что нового ──────────────────────────────────────────────── */

export const UpdatesPage = () => (
  <main>
    <PageIntro
      eyebrow="Что нового"
      title="Как развивается Guestra"
      description="Новые функции и улучшения CRM, PMS и AI-администратора. Многие из них появились по просьбам команды отеля, который уже работает в Guestra."
      secondary={{ label: "Что в разработке", href: "#soon" }}
    />
    <section className="section bg-background">
      <div className="container-tight">
        <ol className="updates-timeline">
          {updates.map((u) => (
            <li key={u.title}>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <time className="num text-muted-foreground">{u.date}</time>
                <span className="rounded-full bg-background-alt px-2 py-0.5 font-semibold">{u.product}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{u.title}</h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{u.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <PageSection id="soon" tone="alt" title="Сейчас в работе">
      <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
        {capabilityGroups.flatMap((g) => g.items.filter((i) => i.status)).map((item) => (
          <li key={item.title} className="border-t border-border pt-4">
            <h3 className="flex items-center gap-2 font-semibold">{item.title} <StatusBadge /></h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
          </li>
        ))}
      </ul>
    </PageSection>
    <ContactSection />
  </main>
);

/* ─── Политика конфиденциальности ─────────────────────────────── */

export const PrivacyPage = () => (
  <main className="document-page px-5 pb-24 pt-28 sm:px-8 md:pt-36">
    <article className="container-tight max-w-3xl">
      <p className="eyebrow">Документы</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Политика конфиденциальности</h1>
      <p className="mt-4 text-sm text-muted-foreground">Редакция от 29 октября 2026 года</p>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/85 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        <section>
          <h2>О чём этот документ</h2>
          <p className="mt-3">Документ описывает, как Guestra обрабатывает данные, которые вы оставляете на сайте guestra.org: в формах заявки на демо, расчёт стоимости и обсуждение подключения.</p>
        </section>
        <section>
          <h2>Какие данные мы получаем</h2>
          <ul>
            <li>имя, рабочая почта, название отеля или компании;</li>
            <li>телефон, номерной фонд, роль и комментарий, если вы их указали;</li>
            <li>адрес страницы, с которой отправлена заявка, и метки рекламной кампании, если вы пришли по ссылке с ними;</li>
            <li>техническая информация о запросе: страна по IP-адресу и время отправки.</li>
          </ul>
        </section>
        <section>
          <h2>Зачем</h2>
          <p className="mt-3">Чтобы ответить на заявку, договориться о демо, подготовить расчёт и вести переписку о подключении Guestra. Мы не продаём данные и не передаём их третьим лицам для рекламы.</p>
        </section>
        <section>
          <h2>Как данные хранятся и передаются</h2>
          <p className="mt-3">Заявка передаётся по защищённому соединению и приходит письмом на {SALES_EMAIL}. Доступ к ней есть у сотрудников, которые отвечают на обращения. Для доставки писем используется почтовая инфраструктура хостинг-провайдера сайта.</p>
        </section>
        <section>
          <h2>Сколько храним</h2>
          <p className="mt-3">Столько, сколько нужно для переписки и подготовки договора. Если сотрудничество не началось, по вашему запросу удалим данные.</p>
        </section>
        <section>
          <h2>Ваши права</h2>
          <p className="mt-3">Вы можете узнать, какие ваши данные у нас есть, исправить их или попросить удалить. Напишите на <a href={mailtoHref("Персональные данные")} className="font-medium text-primary hover:underline">{SALES_EMAIL}</a>, ответим письменно.</p>
        </section>
        <section>
          <h2>Cookie и аналитика</h2>
          <p className="mt-3">Сайт использует только технически необходимые механизмы и обезличенную статистику посещений хостинг-провайдера без рекламных cookie.</p>
        </section>
        <section>
          <h2>Данные гостей в продукте</h2>
          <p className="mt-3">Этот документ касается сайта. Обработка данных гостей отеля в CRM и PMS Guestra регулируется договором с отелем. Подробнее о защите данных в продукте — на странице <Link to="/security" className="font-medium text-primary hover:underline">«Безопасность»</Link>.</p>
        </section>
      </div>
    </article>
  </main>
);
