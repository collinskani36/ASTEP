import { motion } from "framer-motion";
import { Heart, GraduationCap, Sun, Users, MapPin, Clock, Upload } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const values = [
  { icon: Heart, title: "Heart-led culture", desc: "We genuinely care about the people we support and each other." },
  { icon: GraduationCap, title: "Grow with us", desc: "Ongoing training, mentoring and pathways to senior roles." },
  { icon: Sun, title: "Flexible work", desc: "Shifts that fit your life — full-time, part-time or casual." },
  { icon: Users, title: "Real team", desc: "Small, supportive teams who actually know each other." },
];

// Empty roles array
const roles: any[] = [];

const WorkWithUs = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application received! We'll review and reach out soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Careers at Astep"
        title={<>Join our <span className="text-gradient">team</span></>}
        subtitle="Work alongside a heart-led crew making real difference in people's lives — every day."
      />

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-3xl p-6 shadow-soft border border-border/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-16 bg-primary-soft/40">
        <div className="container max-w-4xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-10">
            Open Roles
          </h2>

          <div className="text-center">
            {roles.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 border border-border/40 shadow-soft">
                <p className="text-muted-foreground text-sm">
                  No available slots at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {roles.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border/40 hover:shadow-card transition-smooth"
                  >
                    <div>
                      <h3 className="font-display font-semibold text-lg">{r.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1.5">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />{r.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />{r.location}
                        </span>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-3xl shadow-card p-8 md:p-10 border border-border/40">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              General application
            </h2>
            <p className="text-muted-foreground mb-6">
              Don't see the right role? We'd still love to hear from you.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Full name</Label>
                  <Input required className="h-12 rounded-2xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input required type="email" className="h-12 rounded-2xl" />
                </div>
              </div>

              <div>
                <Label className="mb-1.5 block">Role of interest</Label>
                <Input className="h-12 rounded-2xl" placeholder="e.g. Support Worker" />
              </div>

              <div>
                <Label className="mb-1.5 block">Resume / CV</Label>
                <label className="flex items-center justify-center gap-2 h-24 rounded-2xl border-2 border-dashed border-border bg-background hover:bg-primary-soft/40 cursor-pointer transition-smooth">
                  <Upload className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload (PDF, DOC)
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <Button type="submit" size="lg" variant="hero" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default WorkWithUs;