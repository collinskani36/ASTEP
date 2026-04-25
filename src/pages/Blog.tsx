import { useState } from "react";
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = ["All", "Wellbeing", "Inclusion", "Family", "Stories"];

const posts = [
  { category: "Wellbeing", title: "Small steps, big progress: celebrating everyday wins", excerpt: "Why the smallest daily moments are often the most meaningful.", date: "12 Mar 2026", grad: "from-surface-lavender to-surface-peach" },
  { category: "Inclusion", title: "Building neurodiverse-friendly workplaces", excerpt: "A practical guide for employers wanting to create inclusive teams.", date: "28 Feb 2026", grad: "from-surface-sage to-surface-sky" },
  { category: "Family", title: "Supporting siblings: the unseen team members", excerpt: "How families can hold space for siblings of children with disability.", date: "14 Feb 2026", grad: "from-surface-peach to-surface-lavender" },
  { category: "Stories", title: "Maya's first solo bus ride: a year in the making", excerpt: "How travel training and gentle steps unlocked Maya's independence.", date: "30 Jan 2026", grad: "from-surface-sky to-surface-sage" },
  { category: "Wellbeing", title: "Sensory regulation tools that actually help", excerpt: "Five practical tools we use every week with our participants.", date: "12 Jan 2026", grad: "from-surface-lavender to-surface-sage" },
  { category: "Family", title: "Navigating your first NDIS plan meeting", excerpt: "What to expect, what to bring, and how to advocate for your loved one.", date: "02 Jan 2026", grad: "from-surface-peach to-surface-sky" },
];

const Blog = () => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = posts.filter(
    (p) => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="The Astep Journal"
        title={<>Stories & <span className="text-gradient">insights</span></>}
        subtitle="Reflections on care, inclusion and the everyday wins that shape our community."
      />

      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts…"
                className="h-12 pl-11 rounded-full border-border bg-card"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                    cat === c ? "bg-primary text-primary-foreground" : "bg-primary-soft/60 text-foreground/80 hover:bg-primary-soft"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <article
                key={i}
                className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1 transition-smooth border border-border/40"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${p.grad} relative`}>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-primary">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" /> {p.date}
                  </div>
                  <h3 className="font-display font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-smooth">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-smooth" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No posts match your search.</p>
          )}

          <div className="flex items-center justify-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-full bg-card border border-border hover:bg-primary-soft transition-smooth flex items-center justify-center" aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={cn(
                  "w-10 h-10 rounded-full text-sm font-medium transition-smooth",
                  n === 1 ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-primary-soft"
                )}
              >
                {n}
              </button>
            ))}
            <button className="w-10 h-10 rounded-full bg-card border border-border hover:bg-primary-soft transition-smooth flex items-center justify-center" aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Blog;
