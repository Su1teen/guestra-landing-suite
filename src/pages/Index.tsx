import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Transformation } from "@/components/sections/Transformation";
import { AISales } from "@/components/sections/AISales";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { CRM } from "@/components/sections/CRM";
import { Guest360 } from "@/components/sections/Guest360";
import { PMS } from "@/components/sections/PMS";
import { Pricing } from "@/components/sections/Pricing";
import { Operations } from "@/components/sections/Operations";
import { Revenue } from "@/components/sections/Revenue";
import { Analytics } from "@/components/sections/Analytics";
import { MultiProperty } from "@/components/sections/MultiProperty";
import { Integrations } from "@/components/sections/Integrations";
import { NoRipReplace } from "@/components/sections/NoRipReplace";
import { Pilot } from "@/components/sections/Pilot";
import { BusinessModel } from "@/components/sections/BusinessModel";
import { Roadmap } from "@/components/sections/Roadmap";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Problem />
      <Transformation />
      <AISales />
      <VoiceAI />
      <CRM />
      <Guest360 />
      <PMS />
      <Pricing />
      <Operations />
      <Revenue />
      <Analytics />
      <MultiProperty />
      <Integrations />
      <NoRipReplace />
      <Pilot />
      <BusinessModel />
      <Roadmap />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
