import { motion } from "framer-motion";
import { Link2, ShieldCheck, KeyRound, FileSearch, Zap, Globe, ScanFace } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Unified Check-In",
    description:
      "Connects booking, registration, and access in one flow. Replaces 5+ disconnected tools.",
    gradient: "from-pink-500/20 to-rose-500/20",
    size: "normal",
    screenshot: "/scan_accesspoint.jpg",
  },
  {
    icon: ScanFace,
    title: "Identity Verification",
    description:
      "OCR passport scanning + biometric selfie match. Under 30 seconds, fully automated.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    size: "normal",
    screenshot: "/verify_selfie.jpg",
  },
  {
    icon: FileSearch,
    title: "Full Audit Trail",
    description:
      "Complete immutable history of every guest interaction. Builds trust with Developers and satisfies Government requirements. Every check-in, verification, and access event is logged and exportable.",
    gradient: "from-violet-500/20 to-purple-500/20",
    size: "large",
    highlight: true,
    badges: ["Government Ready", "Developer Access", "Exportable Reports"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "Automated guest verification and government-aligned audit trails. SIRA-compliant processes.",
    gradient: "from-green-500/20 to-emerald-500/20",
    size: "normal",
  },
  {
    icon: KeyRound,
    title: "Smart Access",
    description:
      "QR and Keyless entry integrated directly with building security systems.",
    gradient: "from-orange-500/20 to-amber-500/20",
    size: "normal",
    screenshot: "/smartkey_door.jpg",
  },
  {
    icon: Zap,
    title: "Instant Integration",
    description:
      "Connect to 50+ PMS platforms, smart locks, and building systems in minutes.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    size: "half",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description:
      "Guest communications in 12+ languages automatically.",
    gradient: "from-teal-500/20 to-cyan-500/20",
    size: "half",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Features = () => {
  return (
    <section id="features" className="py-32 bg-background">
      <div className="container-tight mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Platform Features
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-foreground">
            Everything you need. Nothing you don't.
          </h2>
        </motion.div>

        {/* Bento Grid 2.0 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature, index) => {
            // Determine grid span based on size
            const colSpan = feature.size === "large" 
              ? "md:col-span-2" 
              : feature.size === "full"
              ? "md:col-span-4"
              : feature.size === "half"
              ? "md:col-span-2"
              : feature.size === "small" 
              ? "md:col-span-1" 
              : "md:col-span-2";
            
            const rowSpan = feature.size === "large" ? "md:row-span-2" : "";
            
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group relative rounded-3xl border bg-white/5 backdrop-blur-xl shadow-xl overflow-hidden ${colSpan} ${rowSpan} ${
                  feature.highlight 
                    ? "border-primary/30 shadow-primary/10" 
                    : "border-white/10 hover:border-primary/20"
                }`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Highlight glow effect */}
                {feature.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                )}

                <div className={`relative z-10 h-full flex ${feature.screenshot ? "flex-col sm:flex-row" : "flex-col"} ${feature.highlight && !feature.screenshot ? "justify-center" : ""}`}>
                  {/* Text Content */}
                  <div className={`${feature.screenshot ? "sm:w-1/2 p-5 sm:p-6" : `p-6 ${feature.size === "large" ? "md:p-8" : ""}`} flex flex-col`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${
                      feature.highlight 
                        ? "bg-primary/20" 
                        : "bg-white/10"
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-6 h-6 ${
                        feature.highlight ? "text-primary" : "text-primary/80"
                      }`} />
                    </div>

                    {/* Highlight badge */}
                    {feature.highlight && (
                      <span className="inline-flex self-start items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Key Feature
                      </span>
                    )}

                    {/* Content */}
                    <h3 className={`font-semibold text-foreground mb-2 ${
                      feature.size === "large" ? "text-xl md:text-2xl" : "text-lg"
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-muted-foreground leading-relaxed flex-grow ${
                      feature.size === "large" ? "text-base" : "text-sm"
                    }`}>
                      {feature.description}
                    </p>

                    {/* Feature badges */}
                    {feature.badges && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                        {feature.badges.map((badge) => (
                          <span 
                            key={badge}
                            className="px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-foreground/80"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Screenshot Phone Mockup */}
                  {feature.screenshot && (
                    <div className="sm:w-1/2 flex items-center sm:items-end justify-center overflow-hidden py-4 sm:py-0">
                      <motion.div 
                        className="relative w-[100px] sm:w-[120px] lg:w-[140px] sm:translate-y-4"
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="rounded-t-[1.5rem] p-1.5 bg-white/10 backdrop-blur-xl border border-white/20 border-b-0 shadow-2xl">
                          <img 
                            src={feature.screenshot} 
                            className="w-full h-auto rounded-t-[1.2rem]" 
                            alt={feature.title}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        {/* Subtle glow */}
                        <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 opacity-50" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
