import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDemoModal from "@/components/BookDemoModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-24 pb-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background pointer-events-none" />
      
      <div className="container-tight mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The New Standard in Dubai PropTech
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
              The Operating Standard for{" "}
              <span className="text-primary">Short-Term Stays.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Guestra unites Holiday Home operators, Developers, and Government
              bodies into one hotel-grade check-in and compliance workflow.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg" 
                className="rounded-full px-8 text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/5 border-white/20"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </div>
          </motion.div>

          {/* App Screenshots - Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-0"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            
            {/* Left Phone - Scan Passport */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative z-10"
            >
              <div className="relative group">
                {/* Phone Frame */}
                <div className="relative w-[130px] sm:w-[161px] md:w-[207px] lg:w-[230px]">
                  <div className="relative rounded-[2rem] p-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                    <img 
                      src="/scan_passport.jpg"
                      className="w-full h-auto rounded-[1.5rem] shadow-lg"
                      alt="Passport Scanning"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl -z-10 group-hover:bg-blue-500/30 transition-colors" />
                </div>
              </div>
            </motion.div>

            {/* Right Phone - Profile Page (Main) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 8 }}
              animate={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative z-20"
            >
              <div className="relative group">
                {/* Phone Frame */}
                <div className="relative w-[130px] sm:w-[161px] md:w-[207px] lg:w-[230px]">
                  <div className="relative rounded-[2rem] p-2 bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl">
                    <img 
                      src="/profile_page.jpg"
                      className="w-full h-auto rounded-[1.5rem] shadow-lg"
                      alt="User Profile"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-primary/30 blur-3xl -z-10 group-hover:bg-primary/40 transition-colors" />
                </div>
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -bottom-3 -right-3 bg-green-500 rounded-xl px-3 py-2 shadow-lg shadow-green-500/30"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-xs font-semibold">Verified</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
