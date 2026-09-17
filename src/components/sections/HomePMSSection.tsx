import { ArrowRight, BedDouble, HeartHandshake, Star, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { GuestProfile } from "@/components/product/GuestProfile";
import { PMSChessboard } from "@/components/product/PMSChessboard";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

const guestFacts = [
  { icon: BedDouble, title: "Бронь и номер", text: "Даты, тариф, оплата и готовность номера находятся в карточке брони." },
  { icon: UserRound, title: "История гостя", text: "Проживания, покупки и предпочтения сохраняются в одном профиле." },
  { icon: Star, title: "Рейтинг гостя", text: "Внутренняя оценка помогает команде учитывать опыт прошлых визитов." },
  { icon: HeartHandshake, title: "Лояльность", text: "Статус гостя и причины для персонального предложения видны до следующего визита." },
];

export const HomePMSSection = () => <section className="section bg-background" id="pms-home">
  <div className="container-wide">
    <SectionHeader
      align="center"
      className="max-w-4xl"
      ledeClassName="!max-w-3xl !text-sm sm:!text-[15px] !leading-relaxed"
      eyebrow="PMS и гости"
      title="PMS связывает бронь, гостя, тариф и проживание"
      lede="В карточке брони доступны условия проживания, источник, оплата, услуги и история гостя. Изменения брони и статусов фиксируются и используются в CRM, Operations и аналитике."
    />
    <div className="mt-5 text-center">
      <Link to="/pms" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Подробнее о PMS <ArrowRight className="h-4 w-4" /></Link>
    </div>
    <Reveal delay={0.1} className="mt-10"><PMSChessboard /></Reveal>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_380px] lg:items-stretch">
      <div className="grid gap-3 sm:grid-cols-2">
        {guestFacts.map((fact, index) => <Reveal key={fact.title} delay={index * 0.06}>
          <div className="h-full rounded-2xl border border-border bg-background-alt p-5">
            <fact.icon className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-semibold">{fact.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.text}</p>
          </div>
        </Reveal>)}
      </div>
      <Reveal delay={0.15}><GuestProfile className="h-full" recommendation="Анна уже выбирала SPA. Предложить пакет к новому бронированию?" /></Reveal>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Интерфейс и данные гостя показаны на демонстрационном примере.</p>
  </div>
</section>;
