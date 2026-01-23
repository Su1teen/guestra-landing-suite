import { motion } from "framer-motion";
import { ShieldCheck, Building, BadgeCheck } from "lucide-react";

const complianceBadges = [
  {
    icon: Building,
    name: "DET",
    fullName: "Department of Economy and Tourism",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: ShieldCheck,
    name: "DTCM",
    fullName: "Dubai Tourism & Commerce Marketing",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: BadgeCheck,
    name: "SIRA",
    fullName: "Security Industry Regulatory Agency",
    color: "from-violet-500 to-violet-600",
  },
];

const ComplianceTrustBar = () => {
  return (
    <section className="py-16 bg-background-alt relative overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container-tight mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Header */}
          <p className="text-sm text-muted-foreground mb-8">
            Built strictly for{" "}
            <span className="text-foreground font-medium">Dubai's regulatory environment</span>
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {complianceBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group relative"
              >
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:border-primary/20 transition-all duration-300">
                  {/* Icon with gradient background */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Text */}
                  <div className="text-left">
                    <p className="text-lg font-semibold text-foreground">{badge.name}</p>
                    <p className="text-xs text-muted-foreground max-w-[140px] leading-tight">
                      {badge.fullName}
                    </p>
                  </div>
                </div>

                {/* Checkmark badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-xs text-muted-foreground/60"
          >
            Compliant processes verified for short-term rental operations in Dubai
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceTrustBar;
