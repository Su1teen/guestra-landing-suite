import { motion } from "framer-motion";
import { Check, Building2, Shield } from "lucide-react";

const operatorBenefits = [
  "Digital Security Pass",
  "Automated Access Logs",
  "Rule Enforcement",
];

const developerBenefits = [
  "Seamless building security",
  "Elevated Living Experience",
  "Zero integration cost",
];

const Audience = () => {
  return (
    <section id="operators" className="py-32 bg-background-alt">
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
            Built For You
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-foreground">
            One platform. Two powerful perspectives.
          </h2>
        </motion.div>

        {/* Split Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Operators Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-card border border-border overflow-hidden group hover:border-primary/30 transition-colors duration-300"
          >
            {/* Content Row */}
            <div className="flex flex-col min-h-[350px] lg:min-h-[400px] lg:flex-row">
              {/* Text Content */}
              <div className="p-8 lg:p-12 lg:w-1/2">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <Shield className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">
                  Security & Lobby Control
                </h3>
                <p className="text-muted-foreground mb-8 text-base">
                  Automate guest verification and reduce lobby congestion.
                </p>

                <ul className="space-y-4">
                  {operatorBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone Mockup */}
              <div className="relative lg:w-1/2 flex items-end justify-center pb-0 px-6 lg:px-0">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative z-10 w-[160px] lg:w-[240px] translate-y-6"
                >
                  <div className="rounded-t-[2.5rem] p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 border-b-0 shadow-2xl">
                    <img 
                      src="/QR_checkin.jpg"
                      className="w-full h-auto rounded-t-[2rem]"
                      alt="QR Check-in for Operators"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Developers Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-card border border-border overflow-hidden group hover:border-primary/30 transition-colors duration-300"
          >
            {/* Content Row */}
            <div className="flex flex-col min-h-[350px] lg:min-h-[400px] lg:flex-row">
              {/* Text Content */}
              <div className="p-8 lg:p-12 lg:w-1/2">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">
                  For Community Management
                </h3>
                <p className="text-muted-foreground mb-8 text-base">
                  Protect your building, delight your residents
                </p>

                <ul className="space-y-4">
                  {developerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone Mockup */}
              <div className="relative lg:w-1/2 flex items-end justify-center pb-0 px-6 lg:px-0">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative z-10 w-[160px] lg:w-[240px] translate-y-6"
                >
                  <div className="rounded-t-[2.5rem] p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 border-b-0 shadow-2xl">
                    <img 
                      src="/smartkey_door.jpg"
                      className="w-full h-auto rounded-t-[2rem]"
                      alt="Smart Key Access for Buildings"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 bg-cyan-500/20 blur-2xl -z-10" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Audience;
