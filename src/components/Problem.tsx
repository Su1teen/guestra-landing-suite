import { motion } from "framer-motion";

const Problem = () => {
  return (
    <section className="section-padding bg-background-alt">
      <div className="container-tight mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-6">
            Short-term rental is growing.{" "}
            <span className="text-muted-foreground">
              The process shouldn't be chaotic.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We replace fragmented tools, manual ID checks, and security conflicts
            with a single digital infrastructure layer.
          </p>

          {/* Visual divider */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px w-12 bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-12 bg-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
