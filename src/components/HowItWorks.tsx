import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  CalendarSync,
  ScanFace,
  ShieldCheck,
  Building2,
  Bell,
  QrCode,
  LogOut,
  FileSearch,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: CalendarSync,
    title: "Booking Confirmation",
    description: "Automatic sync with your PMS and booking channels",
    tag: "Sync",
  },
  {
    number: 2,
    icon: ScanFace,
    title: "Guest Data Collection",
    description: "AI-powered OCR extracts ID information instantly",
    tag: "OCR",
  },
  {
    number: 3,
    icon: ShieldCheck,
    title: "Compliance Check",
    description: "Automated verification against DET/DTCM regulations",
    tag: "DET/DTCM",
  },
  {
    number: 4,
    icon: Building2,
    title: "Developer Approval",
    description: "Instant security clearance for building management",
    tag: "Auto-clearance",
  },
  {
    number: 5,
    icon: Bell,
    title: "Security Notification",
    description: "Digital pass sent to building security team",
    tag: "Digital Pass",
  },
  {
    number: 6,
    icon: QrCode,
    title: "Smart Access",
    description: "QR or keyless entry credentials generated automatically",
    tag: "QR/Keyless",
  },
  {
    number: 7,
    icon: LogOut,
    title: "Automatic Check-out",
    description: "Seamless departure with access revocation",
    tag: "Auto",
  },
  {
    number: 8,
    icon: FileSearch,
    title: "Full Audit Trail",
    description: "Immutable history for Government & Developers",
    tag: "Compliance",
    highlight: true,
  },
];

const TimelineStep = ({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[0];
  index: number;
  progress: number;
}) => {
  const isActive = progress > index / steps.length;
  const isHighlight = step.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={`relative flex items-start gap-6 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive
              ? isHighlight
                ? "rgb(34, 197, 94)"
                : "hsl(220, 100%, 50%)"
              : "hsl(220, 13%, 91%)",
          }}
          transition={{ duration: 0.15 }}
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
            isHighlight && isActive
              ? "shadow-lg shadow-green-500/40"
              : isActive
              ? "shadow-lg shadow-primary/40"
              : ""
          }`}
        >
          <step.icon
            className={`w-5 h-5 ${
              isActive ? "text-white" : "text-muted-foreground"
            }`}
          />
          
          {/* Pulse effect for highlight */}
          {isHighlight && isActive && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-green-500"
            />
          )}
        </motion.div>

        {/* Connecting line */}
        {index < steps.length - 1 && (
          <div className="w-0.5 h-24 bg-border relative overflow-hidden">
            <motion.div
              animate={{
                height: isActive ? "100%" : "0%",
              }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="absolute top-0 w-full bg-primary"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
        className={`flex-1 pb-12 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
      >
        <div
          className={`${
            isHighlight
              ? "bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/30"
              : "bg-white/5 border-white/10"
          } backdrop-blur-xl border rounded-2xl p-6 shadow-xl inline-block max-w-md ${
            index % 2 === 0 ? "" : "md:ml-auto"
          }`}
        >
          {/* Tag */}
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
              isHighlight
                ? "bg-green-500/20 text-green-400"
                : isActive
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step.tag}
          </span>

          <h3
            className={`text-lg font-semibold mb-2 ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span className="text-primary mr-2">0{step.number}.</span>
            {step.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>

          {isHighlight && (
            <div className="mt-4 pt-4 border-t border-green-500/20">
              <p className="text-xs text-green-400 font-medium">
                ✓ Government compliance ready
              </p>
              <p className="text-xs text-green-400 font-medium">
                ✓ Developer audit access
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="py-32 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container-tight mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            The Journey
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From booking to check-out, every step is automated, compliant, and
            connected.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Central line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {/* Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.number}
                step={step}
                index={index}
                progress={progress.get()}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            All 8 steps happen automatically. Zero manual intervention.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Average check-in time: 47 seconds
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
