import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { cn } from "@/lib/utils";

const filters = ["All", "Social", "Skills", "Recreation", "Creative"];

const allActivities = [
  { title: "Saturday Social Café", category: "Social", desc: "Relaxed weekly café meetups in inner-city venues.", schedule: "Sat 10am", location: "Newtown", grad: "from-surface-lavender to-surface-peach" },
  { title: "Cooking Together", category: "Skills", desc: "Plan, shop and cook a meal as a friendly crew.", schedule: "Wed 4pm", location: "Marrickville", grad: "from-surface-sage to-surface-sky" },
  { title: "Art Studio", category: "Creative", desc: "Open studio with paint, clay and mixed media.", schedule: "Thu 2pm", location: "Glebe", grad: "from-surface-peach to-surface-lavender" },
  { title: "Bushwalk Crew", category: "Recreation", desc: "Gentle, accessible bushwalks every fortnight.", schedule: "Sun 9am", location: "Royal NP", grad: "from-surface-sage to-surface-lavender" },
  { title: "Photography Club", category: "Creative", desc: "Learn the basics and explore the city through a lens.", schedule: "Fri 11am", location: "CBD", grad: "from-surface-sky to-surface-peach" },
  { title: "Travel Training", category: "Skills", desc: "Confident commuting on buses, trains and rideshare.", schedule: "Tue 1pm", location: "Various", grad: "from-surface-lavender to-surface-sage" },
  { title: "Movie Nights", category: "Social", desc: "Sensory-friendly cinema outings monthly.", schedule: "Last Fri", location: "Bondi Junction", grad: "from-surface-peach to-surface-sky" },
  { title: "Beach Day", category: "Recreation", desc: "Inclusive beach picnics with accessible setups.", schedule: "Summer Sat", location: "Coogee", grad: "from-surface-sky to-surface-sage" },
  { title: "Music Jam", category: "Creative", desc: "Singing, drumming and improv sessions for all levels.", schedule: "Mon 5pm", location: "Surry Hills", grad: "from-surface-lavender to-surface-peach" },
];

const GroupActivitiesPage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allActivities : allActivities.filter((a) => a.category === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Together"
        title={<>Group <span className="text-gradient">Activities</span></>}
        subtitle="Joyful, inclusive programs designed to build connection, confidence and friendship."
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-smooth",
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-primary-soft/60 text-foreground/80 hover:bg-primary-soft"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.div
                key={a.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1 transition-smooth border border-border/40"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${a.grad} relative`}>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-primary">
                    {a.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{a.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{a.schedule}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{a.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default GroupActivitiesPage;
