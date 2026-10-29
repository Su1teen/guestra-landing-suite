import { PageIntro, PageSection, Split, SplitText, GroupCapabilities, NextModule } from "@/components/page/PageBlocks";
import { Pricing } from "@/components/sections/Pricing";
import { RateHistory, RateCalendar, PaceChart, PriceImpactCalculator, ForecastStrip } from "@/components/product/RevenueWidgets";
import { PriceApproval } from "@/components/product/ModuleLinkFragments";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/shared/Reveal";

const RevenuePage = () => (
  <main>
    <PageIntro
      eyebrow="Управление доходами"
      title="Цена следует за спросом, а решение остаётся за отелем"
      description="Guestra рассчитывает тариф по загрузке, темпу бронирований, сезону и праздникам и показывает вклад каждого фактора. Новая цена вступает в силу после согласования, история изменений сохраняется."
      visual={<div className="space-y-4"><ForecastStrip /><PriceApproval /></div>}
      secondary={{ label: "Попробовать симуляцию", href: "#pricing" }}
    />

    <Pricing withLink={false} />

    <PageSection title="Контроль цены">
      <div className="space-y-20">
        <Split visual={<RateHistory />}>
          <SplitText
            eyebrow="Согласование"
            title="Кто и почему изменил цену"
            lede="Рекомендация ждёт утверждения. Ручные изменения тоже попадают в историю: видно, кто, когда и с какой цены на какую. Цена ниже заданной границы не пройдёт."
          />
        </Split>
        <Split reverse visual={<RateCalendar />}>
          <SplitText
            eyebrow="Тарифы и ограничения"
            title="Календарь тарифов по датам"
            lede="Базовая и действующая цена на каждую дату и ограничения: минимальный срок проживания, закрытый заезд или выезд. Тарифные планы отличаются условиями отмены, питанием и предоплатой."
          />
        </Split>
        <Split visual={<PaceChart />}>
          <SplitText
            eyebrow="Темп продаж"
            title="Как заполняются будущие даты"
            lede="Сравнение с прошлым годом по дням до заезда показывает, стоит ли поднимать цену или пора стимулировать спрос, пока ещё есть время."
          />
        </Split>
      </div>
    </PageSection>

    <PageSection tone="alt" eyebrow="Оценка" title="Сколько стоит один процент цены" lede="Подставьте цифры своего отеля. Расчёт показывает, что меняет даже небольшой рост средней цены при той же загрузке.">
      <Reveal><PriceImpactCalculator /></Reveal>
    </PageSection>

    <GroupCapabilities groupId="revenue" tone="default" />
    <NextModule href="/operations" />
    <ContactSection />
  </main>
);

export default RevenuePage;
