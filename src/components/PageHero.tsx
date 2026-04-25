import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow?: string;
  title: string | ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export const PageHero = ({ eyebrow, title, subtitle, children }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden gradient-hero pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container relative text-center max-w-3xl mx-auto">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-secondary mb-4 uppercase tracking-wider"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] mb-5"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
