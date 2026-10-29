import { Link } from "react-router-dom";
import { PageIntro } from "@/components/page/PageBlocks";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/shared/Reveal";
import { Window } from "@/components/product/Window";

const sections = [
  {
    id: "access",
    title: "Доступ по роли и объекту",
    points: [
      "Права выдаются отдельно на брони, гостей, номера, уборку, цены, фолио, кассу, отчёты и настройки.",
      "Сотрудник видит только объекты, к которым у него есть доступ. Права настраиваются для каждого объекта сети.",
      "Финансовые данные брони открыты только ролям с доступом к фолио: администратор видит бронь, но не всю историю оплат.",
    ],
  },
  {
    id: "audit",
    title: "История изменений",
    points: [
      "Изменение брони, тарифа, цены и статуса номера сохраняется с автором и временем.",
      "Рекомендованная цена проходит согласование, ручные изменения тоже попадают в историю.",
    ],
  },
  {
    id: "ai",
    title: "AI и данные",
    points: [
      "AI-администратор не обращается к базе данных напрямую, только к функциям PMS и CRM с ключом доступа.",
      "Каждое действие агента проходит те же проверки, что и действие сотрудника: наличие, цена, права, правила отмены.",
      "Агент не показывает гостю внутренние заметки, финансовые данные брони и номера комнат без нужного контекста.",
      "Бронирование требует согласия гостя, а скидки и возвраты остаются за сотрудниками.",
    ],
  },
  {
    id: "isolation",
    title: "Разделение объектов",
    points: [
      "Данные каждого объекта и каждой сети изолированы: запросы ограничены объектом пользователя или ключа.",
      "Гость, который жил в нескольких объектах одной сети, связан с каждым из них явно, без смешения данных разных компаний.",
    ],
  },
  {
    id: "integrity",
    title: "Целостность операций",
    points: [
      "Номер блокируется на время брони и удержания: продать его дважды нельзя.",
      "Повтор запроса не создаёт дубль брони или услуги.",
      "События о бронях и оплатах отправляются подписанными веб-хуками.",
    ],
  },
];

const roles = [
  { role: "Горничная", rights: ["Свои задания уборки", "Чек-листы"] },
  { role: "Ресепшен", rights: ["Брони и гости", "Заезд и выезд", "Касса смены"] },
  { role: "Менеджер по доходам", rights: ["Цены и тарифы", "Отчёты о продажах"] },
  { role: "Собственник", rights: ["Все объекты", "Финансы и отчёты", "Журнал решений"] },
];

const SecurityPage = () => (
  <main>
    <PageIntro
      eyebrow="Безопасность"
      title="Каждый видит своё, каждое изменение на виду"
      description="Доступ к данным гостей и деньгам отеля настраивается по ролям и объектам. Действия сотрудников и AI-администратора проходят одни и те же проверки и оставляют след."
      visual={
        <Window title="Пользователи и роли" bodyClassName="divide-y divide-border/70 p-0">
          {roles.map((r) => (
            <div key={r.role} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold">{r.role}</span>
              <span className="flex flex-wrap gap-1.5">{r.rights.map((x) => <span key={x} className="rounded-md bg-background-alt px-2 py-1 text-[11px]">{x}</span>)}</span>
            </div>
          ))}
        </Window>
      }
    />

    <section className="section bg-background">
      <div className="container-wide grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Разделы" className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 text-sm">
            {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="block rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">{s.title}</a></li>)}
            <li><a href="#docs" className="block rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Документы</a></li>
          </ul>
        </nav>
        <div className="space-y-14">
          {sections.map((s) => (
            <Reveal key={s.id}>
              <section id={s.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
                <ul className="mt-5 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />{p}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
          <section id="docs" className="scroll-mt-24 rounded-2xl border border-border bg-background-alt p-6">
            <h2 className="text-xl font-semibold tracking-tight">Документы</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Как мы обрабатываем данные из заявок на сайте, описано в <Link to="/privacy" className="font-medium text-primary hover:underline">политике конфиденциальности</Link>. Вопросы о защите данных в продукте присылайте на sales@guestra.org, ответим письменно.
            </p>
          </section>
        </div>
      </div>
    </section>

    <ContactSection />
  </main>
);

export default SecurityPage;
