import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Music, Leaf, Coffee, Dumbbell, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import actArt from "@/assets/act-art.jpg";
import actMusic from "@/assets/act-music.jpg";
import actNature from "@/assets/act-nature.jpg";
import actCafe from "@/assets/act-cafe.jpg";
import actActive from "@/assets/act-active.jpg";
import actHobbies from "@/assets/act-hobbies.jpg";

const activities = [
  { icon: Palette, title: "Art & Creativity", desc: "Painting, crafts and self-expression in a relaxed setting.", color: "lavender", image: actArt },
  { icon: Music, title: "Music & Movement", desc: "Singing, dancing and gentle movement workshops weekly.", color: "peach", image: actMusic },
  { icon: Leaf, title: "Nature Walks", desc: "Bushwalks, beach trips and gardening for grounded calm.", color: "sage", image: actNature },
  { icon: Coffee, title: "Social Cafés", desc: "Meet new friends in welcoming weekly cafés and meetups.", color: "sky", image: actCafe },
  { icon: Dumbbell, title: "Active Living", desc: "Inclusive fitness, swimming and group sport programs.", color: "lavender", image: actActive },
  { icon: Camera, title: "Skills & Hobbies", desc: "Photography, cooking, gaming and lifelong learning clubs.", color: "peach", image: actHobbies },
];

const colorMap: Record<string, string> = {
  lavender: "bg-surface-lavender text-primary",
  sage: "bg-surface-sage text-secondary",
  peach: "bg-surface-peach text-primary",
  sky: "bg-surface-sky text-secondary",
};

export const GroupActivities = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary-soft/40">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">Together time</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Group Activities</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Connection, joy and growth — our group programs help build friendships and skills in inclusive, welcoming spaces.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="self-start md:self-end">
            <Link to="/group-activities">
              View All Activities <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-smooth border border-border/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className={cn("absolute top-3 left-3 w-10 h-10 rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-soft", colorMap[a.color])}>
                  <a.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-1.5">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
