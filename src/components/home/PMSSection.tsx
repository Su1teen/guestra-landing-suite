import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { PMSChessboard } from "@/components/product/PMSChessboard";
import { GuestProfile } from "@/components/product/GuestProfile";
import { FrontDeskToday } from "@/components/product/FrontDeskToday";
import { FolioCard } from "@/components/product/FolioCard";

const more = ["Группы и квоты", "Корпоративные клиенты", "Услуги по слотам", "Касса и депозиты", "Ночной аудит", "Тарифные планы"];

export const PMSSection = () => (
  <section id="pms" className="section bg-background">
    <div className="container-wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="PMS"
          title="PMS, с которой работает весь отель"
          lede="Шахматка по номерам и категориям, ресепшен, услуги, фолио и касса. Брони из AI и CRM появляются здесь сразу, без ручного переноса."
        />
        <Link to="/pms" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline">
          Подробнее о PMS <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Reveal delay={0.05} className="mt-12">
        <PMSChessboard />
      </Reveal>
      <p className="mt-3 text-xs text-muted-foreground">Нажмите на бронь, чтобы открыть карточку.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.05}><FrontDeskToday className="h-full" /></Reveal>
        <Reveal delay={0.1} className="hidden lg:block"><GuestProfile className="h-full" /></Reveal>
        <Reveal delay={0.15} className="hidden md:block"><FolioCard className="h-full" /></Reveal>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-1 text-muted-foreground">Ещё в PMS:</span>
        {more.map((item) => (
          <Link key={item} to="/pms" className="rounded-full border border-border bg-white px-3 py-1.5 text-foreground/80 transition hover:border-primary/30 hover:text-primary">
            {item}
          </Link>
        ))}
      </div>
    </div>
  </section>
);
