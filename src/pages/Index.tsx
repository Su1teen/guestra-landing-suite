import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import DeveloperSection from "@/components/DeveloperSection";
import ComplianceTrustBar from "@/components/ComplianceTrustBar";
import Audience from "@/components/Audience";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Problem />
        <Features />
        <DeveloperSection />
        <ComplianceTrustBar />
        <Audience />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
