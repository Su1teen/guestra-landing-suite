import { motion } from "framer-motion";
import { Building2, ShieldCheck, BarChart3, Check } from "lucide-react";

const benefits = [
  "Real-time guest transparency",
  "Automated security clearance",
  "SIRA-compliant reporting",
  "Frictionless deployment",
];

const DeveloperSection = () => {
  return (
    <section id="developers" className="relative overflow-hidden">
      {/* Dark blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2040] to-[#0a1628]" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 py-32">
        <div className="container-tight mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                For Developers & Building Management
              </p>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-6">
                Zero Capital Expenditure.
              </h2>
              
              <p className="text-lg text-blue-100/70 leading-relaxed mb-8">
                Deploy Guestra across your entire portfolio without hardware costs or software fees. 
                We provide the infrastructure; you gain the transparency and security.
              </p>

              {/* Benefits list */}
              <ul className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-blue-100/80">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right - Rate Display */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Main rate card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
                {/* Glowing accent */}
                <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                
                <div className="text-center mb-8">
                  
                  
                  {/* Giant Zero */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="relative inline-block"
                  >
                    <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                      Zero
                    </span>
                    
                    {/* Glow behind */}
                    <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-primary/20 blur-2xl">
                      Zero
                    </div>
                  </motion.div>
                  
                  <p className="text-xl text-blue-100/70 mt-4">
                    Implementation cost for building management.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">100%</p>
                    <p className="text-xs text-blue-100/50">Building Coverage</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">24/7</p>
                    <p className="text-xs text-blue-100/50">Security Alerts</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-white">Full</p>
                    <p className="text-xs text-blue-100/50">Audit Access</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
