import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { OwnerControlCenter } from "@/components/product/OwnerControlCenter";
import { TeamActivity } from "@/components/product/TeamActivity";

export const OwnerSection = () => (
  <section id="owner" className="home-owner section">
    <div className="container-wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Для собственника"
          title="Что происходит в отеле, видно без звонка управляющему"
          lede="Выручка, загрузка, ADR и RevPAR считаются из тех же броней и оплат, с которыми работает команда. Отдельно видны отклонения и решения сотрудников: ручная смена цены, возврат, задержка уборки."
        />
        <Link to="/owner" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline">
          Кабинет собственника <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="owner-stage mt-12 grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <Reveal delay={0.05} className="min-w-0"><OwnerControlCenter className="h-full" /></Reveal>
        <Reveal delay={0.12} className="min-w-0"><TeamActivity className="h-full" /></Reveal>
      </div>
    </div>
  </section>
);
