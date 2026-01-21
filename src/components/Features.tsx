import { motion } from "framer-motion";
import { Link2, ShieldCheck, KeyRound, Code2 } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Unified Check-In",
    description:
      "Connects booking, registration, and access in one flow. Replaces 5+ disconnected tools.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description:
      "Automated guest verification and government-aligned audit trails.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: KeyRound,
    title: "Smart Access",
    description:
      "QR and Keyless entry integrated directly with building security systems.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description:
      "Full transparency for building management without operational overhead.",
    gradient: "from-orange-500/20 to-amber-500/20",
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
    <section id="features" className="section-padding bg-background">
      <div className="container-tight mx-auto">
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Everything you need. Nothing you don't.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 ${
                index === 0 ? "md:row-span-1" : ""
              }`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
