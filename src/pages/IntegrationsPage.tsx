import { PageIntro, PageSection } from "@/components/page/PageBlocks";
import { ContactSection } from "@/components/shared/ContactSection";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const groups: { title: string; items: { name: string; note: string; soon?: boolean }[] }[] = [
  {
    title: "Общение с гостями",
    items: [
      { name: "WhatsApp", note: "Входящие, AI-администратор, напоминания и ссылки на оплату" },
      { name: "Telegram", note: "Те же входящие и тот же AI, что в WhatsApp" },
      { name: "Телефония", note: "Голосовой AI-агент принимает входящие звонки" },
      { name: "Instagram", note: "Директ во входящих CRM", soon: true },
    ],
  },
  {
    title: "Продажи и каналы",
    items: [
      { name: "Календари OTA через iCal", note: "Занятость с Booking.com и других площадок в шахматке" },
      { name: "Ссылки на оплату", note: "Предоплата по ссылке с подтверждением брони после оплаты" },
      { name: "Менеджер каналов", note: "Цены, наличие и ограничения напрямую в OTA", soon: true },
      { name: "Модуль бронирования для сайта", note: "Прямые брони с сайта отеля", soon: true },
    ],
  },
  {
    title: "Учёт и отзывы",
    items: [
      { name: "Выгрузка для бухгалтерии", note: "Начисления и оплаты из PMS" },
      { name: "Импорт данных", note: "Номера, тарифы, брони и гости при переходе" },
      { name: "1С", note: "Обмен оплатами, услугами и документами", soon: true },
      { name: "Booking.com, Google, 2ГИС", note: "Отзывы в ленте репутации", soon: true },
    ],
  },
];

const tools = [
  ["search_accommodation", "Свободные категории и цена из PMS"],
  ["book_accommodation", "Бронь с проверкой цены и наличия"],
  ["book_service", "Услуга на свободный слот с начислением в фолио"],
  ["create_guest_request", "Просьба гостя как задача службе"],
  ["create_offer", "Коммерческое предложение в CRM"],
];

const IntegrationsPage = () => (
  <main>
    <PageIntro
      eyebrow="Интеграции"
      title="Каналы, оплаты и данные, с которыми работает Guestra"
      description="Мессенджеры и телефония подключаются к AI-администратору и CRM, календари площадок — к шахматке, бухгалтерия получает выгрузку из PMS. Ниже — что работает сейчас и что в разработке."
      secondary={{ label: "Как проходит внедрение", href: "/implementation" }}
    />

    <PageSection title="Что подключается">
      <div className="grid gap-10 lg:grid-cols-3">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.05}>
            <h3 className="border-b-2 border-foreground pb-3 text-[15px] font-semibold">{group.title}</h3>
            <ul className="divide-y divide-border/70">
              {group.items.map((item) => (
                <li key={item.name} className="py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <span className={cn("font-medium", item.soon && "text-foreground/70")}>{item.name}</span>
                    {item.soon && <StatusBadge className="mt-0.5" />}
                  </div>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </PageSection>

    <PageSection tone="ink" eyebrow="Для разработчиков" title="API, через которое работает сам AI" lede="AI-администратор не обращается к базе данных напрямую. Он вызывает те же функции PMS и CRM, что доступны интеграциям: с ключом доступа, правами на каждый объект и защитой от повторов.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-3 text-xs text-white/55">Функции для агентов · пример</div>
          <ul className="divide-y divide-white/10 font-mono text-[13px]">
            {tools.map(([name, text]) => (
              <li key={name} className="grid gap-1 px-5 py-3 sm:grid-cols-[230px_1fr] sm:gap-4">
                <span className="text-[hsl(222_100%_78%)]">{name}</span>
                <span className="font-sans text-white/65">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="space-y-5 text-sm leading-relaxed text-white/65">
          <li><b className="font-semibold text-white">Ключ на объект.</b> Доступ выдаётся к конкретному объекту и набору функций.</li>
          <li><b className="font-semibold text-white">Без дублей.</b> Повтор запроса с тем же ключом операции возвращает прежний результат.</li>
          <li><b className="font-semibold text-white">События.</b> PMS сообщает о бронях, услугах и оплатах подписанными веб-хуками.</li>
        </ul>
      </div>
    </PageSection>

    <ContactSection title="Расскажите, что работает в отеле сейчас" text="Перечислите системы и каналы, которыми пользуется команда. Предложим порядок подключения и скажем, что заработает сразу." />
  </main>
);

export default IntegrationsPage;
