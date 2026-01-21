import { motion } from "framer-motion";
import { Mail, MessageCircle, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Mail,
    title: "Sales Inquiry",
    description: "Get in touch with our team",
    buttonText: "Contact Sales",
    href: "mailto:sales@guestra.com",
    variant: "default" as const,
  },
  {
    icon: MessageCircle,
    title: "Quick Chat",
    description: "Message us directly",
    buttonText: "WhatsApp Us",
    href: "https://wa.me/1234567890",
    variant: "outline" as const,
  },
  {
    icon: Calendar,
    title: "See it in action",
    description: "Schedule a walkthrough",
    buttonText: "Book a Demo",
    href: "https://calendly.com",
    variant: "outline" as const,
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="section-padding bg-foreground text-primary-foreground">
      <div className="container-tight mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Ready to streamline your operations?
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto">
            Join Dubai's leading properties already using Guestra
          </p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-4">
                <action.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-primary-foreground/60 mb-4">
                {action.description}
              </p>
              <Button
                asChild
                variant={action.variant}
                size="sm"
                className={`rounded-full w-full ${
                  action.variant === "default"
                    ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                    : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <a
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {action.buttonText}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">Guestra</span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              © 2026 Guestra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
