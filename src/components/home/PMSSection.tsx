import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { PMSChessboard } from "@/components/product/PMSChessboard";
import { GuestProfile } from "@/components/product/GuestProfile";
import { FrontDeskToday } from "@/components/product/FrontDeskToday";
import { FolioCard } from "@/components/product/FolioCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <Reveal delay={0.05} className="home-pms-stage mt-12">
        <PMSChessboard />
        <p className="mt-4 text-xs text-muted-foreground">Нажмите на бронь, чтобы открыть карточку. На узком экране шахматку можно прокручивать.</p>
      </Reveal>

      <Tabs defaultValue="desk" className="pms-workspace mt-7">
        <TabsList className="h-auto w-full justify-start gap-1 bg-transparent p-0">
          <TabsTrigger value="desk">Ресепшен</TabsTrigger><TabsTrigger value="guest">Профиль гостя</TabsTrigger><TabsTrigger value="folio">Фолио</TabsTrigger>
        </TabsList>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Заезды и выезды, история гостя и расчёты по проживанию — рядом с шахматкой. Выберите экран, чтобы посмотреть подробнее.</p>
          <div className="min-w-0"><TabsContent value="desk"><FrontDeskToday /></TabsContent><TabsContent value="guest"><GuestProfile /></TabsContent><TabsContent value="folio"><FolioCard /></TabsContent></div>
        </div>
      </Tabs>

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
