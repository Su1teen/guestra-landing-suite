import { Hero } from "@/components/sections/Hero";
import { ModuleLinksSection } from "@/components/home/ModuleLinksSection";
import { AISection } from "@/components/home/AISection";
import { PMSSection } from "@/components/home/PMSSection";
import { Pricing } from "@/components/sections/Pricing";
import { OwnerSection } from "@/components/home/OwnerSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ImplementationSection } from "@/components/home/ImplementationSection";
import { ContactSection } from "@/components/shared/ContactSection";
import { homeFaq } from "@/data/faq";

const Index = () => (
  <main>
    <Hero />
    <ModuleLinksSection />
    <AISection />
    <PMSSection />
    <Pricing />
    <OwnerSection />
    <CapabilitiesSection />
    <ImplementationSection />
    <ContactSection faq={homeFaq} />
  </main>
);

export default Index;
