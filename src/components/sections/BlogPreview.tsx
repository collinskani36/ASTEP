import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export const blogPosts = [
  {
    slug: "small-steps-big-progress",
    category: "Wellbeing",
    title: "Small steps, big progress: celebrating everyday wins",
    excerpt: "Why the smallest daily moments are often the most meaningful — and how to spot them.",
    date: "12 Mar 2026",
    gradient: "from-surface-lavender to-surface-peach",
  },
  {
    slug: "neurodiversity-at-work",
    category: "Inclusion",
    title: "Building neurodiverse-friendly workplaces from day one",
    excerpt: "A practical guide for employers wanting to create truly inclusive teams.",
    date: "28 Feb 2026",
    gradient: "from-surface-sage to-surface-sky",
  },
  {
    slug: "supporting-siblings",
    category: "Family",
    title: "Supporting siblings: the often unseen members of the team",
    excerpt: "How families can hold space for siblings of children with disability.",
    date: "14 Feb 2026",
    gradient: "from-surface-peach to-surface-lavender",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">Stories & insights</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl">Latest from our blog</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-1 transition-smooth border border-border/40"
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${post.gradient} relative`}>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-primary">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-smooth">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-smooth" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
