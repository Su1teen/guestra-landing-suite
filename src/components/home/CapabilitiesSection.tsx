import { SectionHeader } from "@/components/shared/SectionHeader";
import { CapabilityMap } from "@/components/product/CapabilityMap";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { capabilityCount } from "@/data/capabilities";

export const CapabilitiesSection = () => (
  <section id="capabilities" className="section bg-background-alt">
    <div className="container-wide">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Вся платформа"
          title="Всё, что умеет Guestra"
          lede={`${capabilityCount} возможностей в пяти направлениях работы отеля. Всё, кроме отмеченного, работает сейчас.`}
        />
        <p className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground"><StatusBadge /> — в разработке</p>
      </div>
      <div className="mt-12">
        <CapabilityMap />
      </div>
    </div>
  </section>
);
