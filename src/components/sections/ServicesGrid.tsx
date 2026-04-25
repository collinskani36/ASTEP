import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentMap = {
  lavender: { bg: "bg-surface-lavender", text: "text-primary", bar: "bg-primary" },
  sage: { bg: "bg-surface-sage", text: "text-secondary", bar: "bg-secondary" },
  peach: { bg: "bg-surface-peach", text: "text-primary", bar: "bg-primary-glow" },
  sky: { bg: "bg-surface-sky", text: "text-secondary", bar: "bg-secondary" },
};

interface ServicesGridProps {
  showHeader?: boolean;
}

export const ServicesGrid = ({ showHeader = true }: ServicesGridProps) => {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container">
        {showHeader && (
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">What we offer</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Our Services</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Person-centred supports designed around you — your goals, your pace, your story.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const accent = accentMap[service.accent];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block bg-card rounded-3xl shadow-soft hover:shadow-lift hover:-translate-y-1 transition-smooth border border-border/40 overflow-hidden h-full"
                >
                  <div className={cn("relative aspect-[16/10] overflow-hidden", accent.bg)}>
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className={cn("absolute top-3 left-3 w-11 h-11 rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-soft", accent.text)}>
                      <service.icon className="w-5 h-5" />
                    </div>
                    <div className={cn("absolute top-0 left-0 right-0 h-1", accent.bar)} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-xl mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.short}</p>
                    <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", accent.text)}>
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
