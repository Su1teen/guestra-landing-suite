import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDemoModal from "@/components/BookDemoModal";

const socialLinks = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/",
  },
  {
    icon: Send,
    label: "Telegram",
    href: "https://t.me/",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:@guestra.com",
  },
];

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer id="contact" className="py-32 bg-background">
        <div className="container-tight mx-auto px-6 lg:px-8">
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-foreground mb-6">
              Ready to streamline your operations?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Join Dubai's leading properties already using Guestra
            </p>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              >
                Book a Demo
              </Button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-6"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={link.label}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                    <link.icon className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <div className="border-t border-border mt-20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">Guestra</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2026 Guestra. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;
