import { PageIntro, PageSection } from "@/components/page/PageBlocks";
import { BookingJourney } from "@/components/product/BookingJourney";
import { ModuleLinkCard } from "@/components/product/ModuleLinkCard";
import { CapabilityMap } from "@/components/product/CapabilityMap";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/shared/Reveal";
import { moduleLinks } from "@/data/moduleLinks";

const systems = [
  { name: "CRM", owns: "Гости как клиенты, диалоги, обращения, предложения, задачи продаж, маркетинг и отзывы." },
  { name: "PMS", owns: "Номера, цены, брони, проживания, услуги, фолио и оплаты, задачи служб, ночной аудит и отчёты." },
  { name: "AI-администратор", owns: "Разговоры в WhatsApp, Telegram и по телефону. Сам ничего не хранит и действует только через CRM и PMS." },
];

const PlatformPage = () => (
  <main>
    <PageIntro
      eyebrow="Как работает Guestra"
      title="Одна бронь проходит через всю систему"
      description="Посмотрите на выходные одной гостьи: от сообщения в WhatsApp до строки в отчёте собственника. На каждом шаге работает своя часть Guestra, а данные не нужно переносить руками."
      secondary={{ label: "Все возможности", href: "#capabilities" }}
    />

    <PageSection title="Выходные Анны в Guestra" lede="Нажмите на шаг, чтобы остановиться на нём.">
      <BookingJourney />
    </PageSection>

    <PageSection tone="alt" eyebrow="Устройство" title="У каждой системы своя ответственность" lede="CRM отвечает за отношения с гостем, PMS — за номера и деньги. AI-администратор работает поверх них и не может обойти их правила.">
      <div className="grid gap-4 md:grid-cols-3">
        {systems.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-white p-6">
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.owns}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Изменения в PMS передаются в CRM событиями, а повтор события не создаёт дублей. Поэтому бронь, оплата и статус номера совпадают на всех экранах.
      </p>
    </PageSection>

    <PageSection eyebrow="Связки" title="Где модули работают вместе">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {moduleLinks.map((link, i) => (
          <Reveal key={link.title} delay={(i % 3) * 0.05} className="h-full"><ModuleLinkCard link={link} /></Reveal>
        ))}
      </div>
    </PageSection>

    <PageSection id="capabilities" tone="alt" eyebrow="Вся платформа" title="Всё, что умеет Guestra" lede="Всё, кроме отмеченного, работает сейчас.">
      <CapabilityMap />
    </PageSection>

    <ContactSection />
  </main>
);

export default PlatformPage;
