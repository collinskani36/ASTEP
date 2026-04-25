import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, Sparkles, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-image.jpg";

const pillars = [
  {
    icon: Heart,
    title: "Our Mission",
    text: "To walk alongside every individual we support — celebrating their strengths and helping them grow with dignity and joy.",
    bg: "bg-surface-lavender",
    color: "text-primary",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A community where every person — regardless of ability — is included, empowered and able to take the next step forward.",
    bg: "bg-surface-sage",
    color: "text-secondary",
  },
  {
    icon: Sparkles,
    title: "Our Values",
    text: "Compassion, respect, inclusion and progress — small steps every day that build into a brighter future.",
    bg: "bg-surface-peach",
    color: "text-primary",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-to-b from-background to-primary-soft/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 gradient-soft rounded-[3rem] -z-10" />
            <div className="rounded-[2rem] overflow-hidden shadow-card aspect-[4/5]">
              <img src={aboutImg} alt="Support worker and participant smiling together" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-lift p-4 max-w-[200px] border border-border/50">
              <p className="text-3xl font-display font-bold text-gradient">100%</p>
              <p className="text-xs text-muted-foreground">Person-centred care</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm font-medium text-secondary uppercase tracking-wider">About Astep</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
              We believe progress starts with <span className="text-gradient">small steps</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Astep Support Services was founded on a simple idea: that every person deserves to be seen, supported and celebrated for who they are. We provide warm, professional NDIS support to neurodiverse individuals, children and families across the community.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team takes the time to listen — to your story, your goals and your pace — then builds support around you. No two journeys look the same, and that's exactly how it should be.
            </p>
            <ul className="space-y-3">
              {[
                "NDIS Registered Provider",
                "Trauma-informed, neuro-affirming approach",
                "Local team that truly knows you",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Get Support <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${p.bg} rounded-3xl p-7 transition-smooth hover:-translate-y-1 hover:shadow-card`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-card ${p.color} flex items-center justify-center mb-5 shadow-soft`}>
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
