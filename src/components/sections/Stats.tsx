import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, HeartHandshake, Star, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Users, value: 200, suffix: "+", label: "Participants Supported" },
  { icon: HeartHandshake, value: 6, suffix: "", label: "Core Services" },
  { icon: Star, value: 5, suffix: "★", label: "Quality of Care" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "NDIS Registered" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (t: number) => {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-extrabold text-gradient">
      {n}{suffix}
    </span>
  );
};

export const Stats = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">Why families choose us</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl">Care that adds up to real impact</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
                <s.icon className="w-6 h-6" />
              </div>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
