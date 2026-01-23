import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDemoModal from "@/components/BookDemoModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 pb-32 overflow-hidden">
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

          {/* App Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 backdrop-blur-xl bg-white/10 border border-white/20">
              {/* Gradient placeholder for app mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent to-primary/10" />
              
              {/* Mockup frame */}
              <div className="absolute inset-4 rounded-xl bg-card/80 backdrop-blur-lg border border-white/30 shadow-2xl overflow-hidden">
                {/* App header simulation */}
                <div className="h-12 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                  <div className="w-3 h-3 rounded-full bg-accent-foreground/40" />
                </div>
                
                {/* Content placeholder */}
                <div className="p-6 space-y-4">
                  <div className="h-8 w-3/4 bg-muted rounded-lg" />
                  <div className="h-4 w-full bg-muted/60 rounded" />
                  <div className="h-4 w-5/6 bg-muted/60 rounded" />
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="h-20 bg-accent rounded-xl" />
                    <div className="h-20 bg-accent rounded-xl" />
                  </div>
                  <div className="h-12 w-full bg-primary/20 rounded-xl mt-4" />
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Guest Verified</p>
                    <p className="text-xs text-muted-foreground">ID Check Complete</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
