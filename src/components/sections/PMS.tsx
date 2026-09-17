import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { PMSChessboard } from "@/components/product/PMSChessboard";

const points = [
  { t: "Шахматка номеров", d: "Даты, номера и брони видны рядом. Перенос брони отражается в загрузке номерного фонда." },
  { t: "Карточка брони", d: "Источник, тариф, оплата, доп. услуги и профиль гостя собраны в одном месте." },
  { t: "Переход по плану отеля", d: "Возможность обмена с текущей PMS проверяем отдельно: важны доступный API, качество данных и правила синхронизации." },
];

export const PMS = () => (
  <section id="pms" className="section bg-background">
    <div className="container-wide">
      <SectionHeader
        eyebrow="PMS"
        title="Номерной фонд виден по датам и броням."
        lede="Шахматка, оплаты и заезды связаны с продажами, задачами служб и отчётностью собственника."
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
