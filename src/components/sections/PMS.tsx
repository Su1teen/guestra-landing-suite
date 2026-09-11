import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { PMSChessboard } from "@/components/product/PMSChessboard";

const points = [
  { t: "Шахматка как в лучших PMS", d: "Даты сверху, номера и домики слева, брони — полосами. Перенос брони — одним движением." },
  { t: "Каждая бронь знает всё", d: "Источник, тариф, оплата, доп. услуги и гость из Guest 360 — в одной карточке." },
  { t: "Bnovo остаётся, пока вам удобно", d: "Guestra синхронизируется с текущей PMS и может заменить её, когда вы будете готовы." },
];

export const PMS = () => (
  <section id="pms" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="PMS"
        title="Управление номерным фондом без хаоса."
        lede="Шахматка, брони, оплаты и заезды — в одном окне, связанном с CRM, операциями и аналитикой."
      />
      <Reveal delay={0.1} className="mt-12">
        <PMSChessboard />
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.t} delay={0.1 + i * 0.08}>
            <div className="border-l-2 border-primary/30 pl-4">
              <div className="font-semibold">{p.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
