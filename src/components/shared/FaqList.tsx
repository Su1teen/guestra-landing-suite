import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";

/** Вопросы на нативных details/summary: работают без JS и в пререндере. */
export const FaqList = ({ items }: { items: FaqItem[] }) => (
  <div className="divide-y divide-border border-y border-border">
    {items.map((item) => (
      <details key={item.q} className="group py-1">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
          <span className="text-[15px] font-semibold leading-snug">{item.q}</span>
          <Plus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-45" aria-hidden />
        </summary>
        <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
      </details>
    ))}
  </div>
);

export const faqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
});
