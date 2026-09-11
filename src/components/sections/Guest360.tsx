import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { GuestTimeline } from "@/components/product/GuestTimeline";

export const Guest360 = () => (
  <section id="features" className="section bg-background-alt">
    <div className="container-wide">
      <SectionHeader
        eyebrow="Guest 360"
        title="Мы помним каждого гостя."
        lede="Сообщения, звонки, брони, покупки, жалобы и отзывы — в одном профиле. Гость, который приезжал в Боровое, в Астане встречается как знакомый, а не как новый контакт."
        align="center"
      />
      <Reveal delay={0.1} className="mt-12">
        <GuestTimeline />
      </Reveal>
    </div>
  </section>
);
