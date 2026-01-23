import { motion } from "framer-motion";
import { Check, Building2, Home } from "lucide-react";

const operatorBenefits = [
  "Reduce operational costs",
  "Eliminate manual data entry",
  "Scale without adding staff",
];

const developerBenefits = [
  "Enhanced building security",
  "Happy residents",
  "Zero integration cost",
];

const Audience = () => {
  return (
    <section id="operators" className="py-32 bg-background-alt">
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
            Built For You
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-foreground">
            One platform. Two powerful perspectives.
          </h2>
        </motion.div>

        {/* Split Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Operators Card */}
          <motion.div
            id="operators"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative p-8 lg:p-10 rounded-2xl bg-card border border-border overflow-hidden group hover:border-primary/30 transition-colors duration-300"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Home className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-2">
                For Holiday Homes
              </h3>
              <p className="text-muted-foreground mb-8">
                Streamline your short-term rental operations
              </p>

              <ul className="space-y-4">
                {operatorBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Developers Card */}
          <motion.div
            id="developers"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative p-8 lg:p-10 rounded-3xl bg-card border border-border overflow-hidden group hover:border-primary/30 transition-colors duration-300"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent to-transparent rounded-bl-full" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-2">
                For Community Management
              </h3>
              <p className="text-muted-foreground mb-8">
                Protect your building, delight your residents
              </p>

              <ul className="space-y-4">
                {developerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Audience;
