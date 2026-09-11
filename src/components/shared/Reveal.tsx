import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export const Reveal = ({ delay = 0, children, ...props }: RevealProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
    transition={{ delay }}
    {...props}
  >
    {children}
  </motion.div>
);
