import { motion } from "framer-motion";
import { 
  X,
  Check,
  ArrowRight
} from "lucide-react";

const painPoints = [
  "Juggling 5+ disconnected tools",
  "Manual ID verification delays",
  "Security conflicts with developers",
  "Government compliance stress",
];

const solutions = [
  "One unified platform",
  "Automated OCR & verification",
  "Built-in developer dashboard",
  "DET/DTCM ready workflows",
];

const Problem = () => {
  return (
    <section className="py-32 bg-background-alt overflow-hidden">
      <div className="container-tight mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-foreground mb-6">
            Short-term rental is growing.{" "}
            <span className="text-muted-foreground">
              The process shouldn't be chaotic.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Operators waste hours on manual workflows. Developers struggle with security oversight. Guests face friction at every step.
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Before - The Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 lg:p-10 shadow-xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">The Old Way</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Fragmented systems creating bottlenecks, compliance risks, and frustrated stakeholders.
              </p>

              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-foreground/80">{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Pain indicator */}
              <div className="mt-8 pt-6 border-t border-red-500/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-500/70 font-medium">Efficiency Score</span>
                  <span className="text-red-500 font-semibold">32%</span>
                </div>
                <div className="mt-2 h-2 bg-red-500/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "32%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-red-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* After - The Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-xl border border-primary/30 rounded-3xl p-8 lg:p-10 shadow-xl shadow-primary/10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">The Guestra Way</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                One unified infrastructure connecting operators, developers, and government compliance.
              </p>

              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={solution}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground/90 font-medium">{solution}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Success indicator */}
              <div className="mt-8 pt-6 border-t border-primary/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary/70 font-medium">Efficiency Score</span>
                  <span className="text-primary font-semibold">97%</span>
                </div>
                <div className="mt-2 h-2 bg-primary/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "97%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-3 -right-3 bg-primary rounded-xl px-3 py-1.5 shadow-lg shadow-primary/30 z-10"
            >
              <span className="text-white text-sm font-semibold">3x Faster</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Arrow indicator between cards (mobile) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex lg:hidden items-center justify-center my-6"
        >
          <ArrowRight className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Join <span className="text-primary font-semibold">50+ operators</span> who replaced their scattered workflows with one platform.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
