import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "The Astep team has been life-changing for our son. They see him for who he is and support his goals with so much patience and warmth.",
    name: "Sarah M.",
    role: "Parent of participant",
  },
  {
    quote: "I finally feel heard and supported. My mentor helps me build skills at my own pace and never makes me feel rushed. I'm growing every week.",
    name: "Jamie T.",
    role: "Participant, age 24",
  },
  {
    quote: "Professional, kind and incredibly responsive. Astep coordinates seamlessly with our family — they've become part of the team.",
    name: "Linh N.",
    role: "Carer & sibling",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[i];

  return (
    <section className="py-20 md:py-28 bg-primary-soft/40">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">Kind words</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl">From the people we walk with</h2>
        </div>

        <div className="relative bg-card rounded-3xl p-8 md:p-14 shadow-card border border-border/40 overflow-hidden">
          <Quote className="absolute top-6 left-6 w-20 h-20 text-primary/10" strokeWidth={1.5} />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 text-center"
            >
              <p className="text-lg md:text-2xl font-display text-foreground/90 leading-relaxed mb-8 max-w-2xl mx-auto">
                "{t.quote}"
              </p>
              <div>
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous"
              className="w-10 h-10 rounded-full bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground transition-smooth flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-smooth ${idx === i ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((v) => (v + 1) % testimonials.length)}
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground transition-smooth flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
