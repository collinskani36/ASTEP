import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { services } from "@/lib/site-data";
import { motion } from "framer-motion";

const ReferToUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Make a referral"
        title={<>Refer to <span className="text-gradient">Astep</span></>}
        subtitle="Whether for a participant, a loved one or yourself — share a few details and our intake team will be in touch within 1 business day."
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-3xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl shadow-card p-10 md:p-14 border border-border/40 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary/15 text-secondary flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-display font-bold text-3xl mb-3">Referral received</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Thank you for trusting us. Our intake team will be in touch within 1 business day to walk through next steps with care.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">Submit another</Button>
            </motion.div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-card rounded-3xl shadow-card p-8 md:p-10 border border-border/40 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 block">Participant name</Label>
                  <Input required className="h-12 rounded-2xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Date of birth</Label>
                  <Input required type="date" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Contact number</Label>
                  <Input required type="tel" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input required type="email" className="h-12 rounded-2xl" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="mb-1.5 block">NDIS number (optional)</Label>
                  <Input className="h-12 rounded-2xl" />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Support needs (tick all that apply)</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <label
                      key={s.slug}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-primary-soft/40 hover:bg-primary-soft cursor-pointer transition-smooth"
                    >
                      <Checkbox id={s.slug} />
                      <span className="text-sm font-medium">{s.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-1.5 block">Additional notes</Label>
                <Textarea rows={4} placeholder="Tell us anything that helps us prepare…" className="rounded-2xl" />
              </div>

              <label className="flex items-start gap-3 p-4 rounded-2xl bg-secondary-soft/50 cursor-pointer">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} className="mt-0.5" />
                <span className="text-sm text-foreground/85">
                  I have consent from the participant (or am authorised to refer on their behalf) to share these details with Astep Support Services.
                </span>
              </label>

              <Button type="submit" size="lg" variant="hero" className="w-full" disabled={!consent}>
                Submit Referral
              </Button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default ReferToUs;
