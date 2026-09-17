import { ArrowRight, BarChart3, BedDouble, Bot, Check, ClipboardCheck, DatabaseZap, FileClock, KeyRound, LockKeyhole, MessageSquareText, PlugZap, ShieldCheck, TrendingUp, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";

const control = [
  { icon: BarChart3, title: "Выручка", text: "Выручка, загрузка, ADR, RevPAR и прогноз по каждому объекту." },
  { icon: UsersRound, title: "Команда", text: "Изменения брони и тарифа, скидки, возвраты и просроченные задачи." },
  { icon: ClipboardCheck, title: "Операции", text: "Готовность номеров, инженерные заявки и запросы гостей." },
  { icon: MessageSquareText, title: "Репутация", text: "Отзывы и причины негатива рядом с операционными событиями." },
];

const products = [
  { icon: MessageSquareText, title: "CRM и продажи", text: "От обращения до оплаченной брони и повторного визита.", href: "/crm", accent: "text-primary bg-primary/10", features: ["История диалога и источник", "Заявки без ответа", "Повторные продажи"], uiLabel: "Воронка · сегодня", uiValue: "2 ждут предоплаты", uiMeta: "Ответственный и следующее действие видны в карточке" },
  { icon: BedDouble, title: "PMS", text: "Номера, брони, заезды и профиль гостя в одном рабочем окне.", href: "/pms", accent: "text-cyan bg-cyan/10", features: ["Шахматка и карточка брони", "Оплата и доп. услуги", "Рейтинг и лояльность гостя"], uiLabel: "Бронь · Forest 101", uiValue: "18–20 октября", uiMeta: "Анна Иванова · предоплата получена" },
  { icon: TrendingUp, title: "Revenue", text: "Рекомендованный тариф меняется по спросу; причина видна команде.", href: "/revenue-management", accent: "text-emerald bg-emerald/10", features: ["Загрузка и темп брони", "Минимальная цена", "История изменения тарифа"], uiLabel: "Рекомендация · суббота", uiValue: "+15% к базовому тарифу", uiMeta: "Причина: высокая загрузка на дату" },
  { icon: ClipboardCheck, title: "Операции", text: "Задачи служб связаны с номером, гостем и сроком исполнения.", href: "/operations", accent: "text-amber bg-amber/10", features: ["Уборка к заезду", "Инженерные заявки", "Просрочки и ответственные"], uiLabel: "Housekeeping · сегодня", uiValue: "Номер 104 · проверка", uiMeta: "Ответственный: супервайзер · до 14:00" },
  { icon: Bot, title: "AI", text: "Диалог с гостем опирается на наличие, цену и историю визитов.", href: "/ai", accent: "text-violet bg-violet/10", features: ["Ответы по актуальному тарифу", "Передача менеджеру", "Контекст диалога в CRM"], uiLabel: "Запрос гостя", uiValue: "Forest House свободен", uiMeta: "Тариф проверен в PMS · предложение отправлено" },
  { icon: BarChart3, title: "Кабинет собственника", text: "Результат сети, отклонения и действия команды в одной управленческой картине.", href: "/owner", accent: "text-primary bg-primary/10", features: ["KPI по каждому объекту", "План/факт и ежедневный отчёт", "События, требующие решения"], uiLabel: "Сеть · месяц", uiValue: "221 млн ₸ · 3 объекта", uiMeta: "От результата сети - к конкретному объекту" },
];

export const ControlSection = () => <section className="section bg-background-alt !pb-12 md:!pb-16">
  <div className="container-wide">
    <SectionHeader
      align="center"
      eyebrow="Контроль бизнеса"
      title="Контроль ключевых показателей и отклонений в одном кабинете."
      lede="Guestra позволяет отслеживать динамику выручки и загрузки, действия сотрудников, состояние операций и изменения репутации."
    />
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {control.map((item, index) => <Reveal key={item.title} delay={index * 0.07}>
        <div className="h-full rounded-2xl border border-border bg-white p-5 shadow-sm">
          <item.icon className="h-5 w-5 text-primary" />
          <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
        </div>
      </Reveal>)}
    </div>
    <div className="mt-8 text-center">
      <Link to="/owner" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Кабинет собственника <ArrowRight className="h-4 w-4" /></Link>
    </div>
  </div>
</section>;

export const PlatformSection = () => <section className="section bg-background-alt pt-20 lg:pt-24">
  <div className="container-wide">
    <SectionHeader eyebrow="Продукты Guestra" title="Одна система для коммерческих и операционных процессов отеля" />
    <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => <Reveal key={product.href} delay={index * 0.06}>
        <Link to={product.href} className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${product.accent}`}><product.icon className="h-5 w-5" /></div>
          <h3 className="mt-5 flex items-center justify-between text-lg font-semibold">{product.title}<ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" /></h3>
          <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{product.text}</p>
          <div className="mt-5 space-y-2 border-t border-border pt-4">{product.features.map((feature) => <div key={feature} className="flex items-start gap-2 text-xs text-foreground/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />{feature}</div>)}</div>
          <div className="mt-6 rounded-xl border border-border/70 bg-background-alt p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{product.uiLabel}</div>
            <div className="num mt-2 text-sm font-semibold">{product.uiValue}</div>
            <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{product.uiMeta}</div>
          </div>
        </Link>
      </Reveal>)}
    </div>
  </div>
</section>;

export const IntegrationSection = () => <section className="section bg-background-alt">
  <div className="container-wide">
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <SectionHeader eyebrow="Интеграции" title="Цифры из разных систем должны сходиться" lede="Брони в PMS, продажи услуг в POS, обращения в телефонии и финансовые данные в 1С дают собственнику разные части картины. Guestra связывает их в отчёте после проверки источников и правил обмена." />
        <Link to="/integrations" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Как устроено подключение <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <Reveal delay={0.1}>
      <div className="window p-5 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><PlugZap className="h-4 w-4 text-primary" /> Источники данных</div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["PMS", "1С", "POS", "Телефония"].map((system) => <div key={system} className="rounded-xl border border-border bg-background-alt px-3 py-4 text-center text-sm font-semibold">{system}</div>)}
        </div>
        <div className="mx-auto my-4 h-8 w-px bg-primary/30" />
        <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-center">
          <p className="text-sm font-semibold text-primary">Guestra</p>
          <p className="mt-1 text-xs text-muted-foreground">Сверка и связь данных по объекту, гостю и операции</p>
        </div>
        <div className="mx-auto my-4 h-8 w-px bg-primary/30" />
        <div className="rounded-xl border border-border bg-white p-4 text-center text-sm font-medium">Кабинет собственника · Отчётность · События</div>
      </div>
      </Reveal>
    </div>
    <div className="mt-8 grid gap-3 md:grid-cols-3">
      {[
        { n: "01", title: "Проверить источники", text: "Уточняем конфигурацию PMS и 1С, доступные выгрузки и качество полей." },
        { n: "02", title: "Согласовать показатели", text: "Фиксируем, как считать выручку, загрузку и план/факт по каждому объекту." },
        { n: "03", title: "Сверить цифры", text: "Сравниваем отчёт с исходными системами до того, как он станет основой решений." },
      ].map((step) => <div key={step.n} className="rounded-2xl border border-border bg-white p-5"><div className="num text-xs font-semibold text-primary">{step.n}</div><h3 className="mt-3 font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p></div>)}
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><DatabaseZap className="h-4 w-4 text-primary" /><span>Можно начать с действующих систем и переходить на модули Guestra поэтапно. Доступность интеграций проверяется для конкретного отеля.</span></div>
  </div>
</section>;

export const SecuritySection = () => <section className="section bg-background">
  <div className="container-wide">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader eyebrow="Безопасность" title="Данные бизнеса и гостей - по ролям и с историей действий" lede="Собственник видит показатели сети. Управляющий работает со своим объектом. Сотрудник получает доступ к тем данным, которые нужны для его задач." />
      <Link to="/security" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline">Подробнее о безопасности <ArrowRight className="h-4 w-4" /></Link>
    </div>
    <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="grid gap-3">
        {[
          { icon: KeyRound, title: "Права по роли и объекту", text: "Финансовые показатели, карточки гостей и операции требуют разных уровней доступа." },
          { icon: FileClock, title: "История действий", text: "Изменение тарифа, брони, возврата или прав должно оставаться в журнале." },
          { icon: ShieldCheck, title: "Проверка перед запуском", text: "Размещение данных, резервные копии и правила удаления согласуются до работы с реальными данными." },
        ].map((item) => <div key={item.title} className="flex gap-3 rounded-2xl border border-border bg-background-alt p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><item.icon className="h-4 w-4" /></span><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p></div></div>)}
      </div>
      <Reveal delay={0.1}>
        <div className="window h-full overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex items-center gap-2 text-sm font-semibold"><LockKeyhole className="h-4 w-4 text-primary" /> Доступ и события</div><span className="rounded-full bg-emerald/10 px-2 py-1 text-[10px] font-semibold text-emerald">пример интерфейса</span></div>
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            <div className="rounded-xl bg-background-alt p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Роль</p><p className="mt-2 text-sm font-semibold">Управляющий · Объект 02</p><div className="mt-3 space-y-2 text-xs"><p>Брони и гости <span className="float-right text-emerald">Доступ</span></p><p>Отчёт объекта <span className="float-right text-emerald">Доступ</span></p><p>Финансы сети <span className="float-right text-muted-foreground">Закрыто</span></p></div></div>
            <div className="rounded-xl bg-background-alt p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Журнал</p><div className="mt-3 space-y-3 text-xs"><p className="border-l-2 border-primary pl-2"><strong>Тариф изменён</strong><br /><span className="text-muted-foreground">Forest House · 10:42 · Айдана</span></p><p className="border-l-2 border-amber pl-2"><strong>Возврат отправлен на проверку</strong><br /><span className="text-muted-foreground">Бронь 1842 · 09:18</span></p></div></div>
          </div>
          <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">Конкретные меры подтверждаются при техническом обследовании.</div>
        </div>
      </Reveal>
    </div>
  </div>
</section>;
