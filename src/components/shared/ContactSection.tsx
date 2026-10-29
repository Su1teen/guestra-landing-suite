import { Mail } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { FaqList } from "./FaqList";
import { mailtoHref, SALES_EMAIL } from "@/lib/lead";
import type { FaqItem } from "@/data/faq";

interface ContactSectionProps {
  faq?: FaqItem[];
  title?: string;
  text?: string;
}

/** Финальный блок страниц: вопросы слева, заявка справа. Без FAQ — заголовок и форма. */
export const ContactSection = ({
  faq,
  title = "Покажем Guestra на примере вашего отеля",
  text = "Онлайн, около часа. Разберём ваши сценарии: переписку с гостями, шахматку, задачи служб и отчёты. Честно скажем, что подключим сразу, а что потребует времени.",
}: ContactSectionProps) => (
  <section id="contact" className="contact-section section scroll-mt-20">
    <div className="container-wide">
      <div className="grid gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
        <div>
          {faq ? (
            <>
              <p className="eyebrow">Вопросы</p>
              <h2 className="headline mt-5">Что обычно спрашивают до демо</h2>
              <div className="mt-10"><FaqList items={faq} /></div>
            </>
          ) : (
            <>
              <p className="eyebrow">Демо</p>
              <h2 className="headline mt-5 max-w-xl">{title}</h2>
              <p className="lede mt-5 max-w-xl">{text}</p>
            </>
          )}
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" /> Удобнее письмом?
            <a href={mailtoHref("Вопрос о Guestra")} className="font-medium text-primary underline-offset-2 hover:underline">{SALES_EMAIL}</a>
          </p>
        </div>
        <div className="contact-form rounded-2xl bg-white p-6 sm:p-8">
          {faq && (
            <>
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </>
          )}
          <LeadForm className={faq ? "mt-6" : undefined} submitLabel="Запросить демо" />
        </div>
      </div>
    </div>
  </section>
);
