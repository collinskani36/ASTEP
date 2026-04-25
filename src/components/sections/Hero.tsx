import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-secondary/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative pt-12 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Supporting Every Step Forward
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Every Small Step{" "}
            <span className="text-gradient">Leads to a Bigger</span>{" "}
            Future
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Astep is a heart-led NDIS support provider walking alongside neurodiverse individuals, children, and families — with care that honours every step, no matter how small.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="hero">
              <Link to="/contact">
                Get Support <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/refer-to-us">Refer to Us</Link>
            </Button>
          </div>

          <a href="tel:1800278377" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-secondary-soft text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-smooth">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Call us anytime</p>
              <p className="font-display font-semibold text-foreground">0796911236</p>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 gradient-warm rounded-[3rem] blur-2xl opacity-20" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-lift aspect-square">
            <img src={heroImg} alt="Hands of a diverse community supporting one another" width={1024} height={1024} className="w-full h-full object-cover" />
          </div>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lift p-4 flex items-center gap-3 border border-border/50"
          >
            <div className="flex -space-x-2">
              {["bg-surface-lavender", "bg-surface-sage", "bg-surface-peach"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-card ${c}`} />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">200+ Families</p>
              <p className="text-xs text-muted-foreground">Trust our care</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
