import { Hero } from "@/components/sections/Hero";
import { ControlSection, PlatformSection, SecuritySection } from "@/components/sections/HomeSections";
import { HomePMSSection } from "@/components/sections/HomePMSSection";
import { Pricing } from "@/components/sections/Pricing";
import { AISales } from "@/components/sections/AISales";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => <main>
  <Hero />
  <ControlSection />
  <Pricing dark />
  <HomePMSSection />
  <PlatformSection />
  <AISales />
  <SecuritySection />
  <CTASection />
</main>;

export default Index;
