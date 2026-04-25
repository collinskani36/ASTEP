import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) next.name = "Please enter your name";
    if (!String(fd.get("email") || "").trim()) next.email = "Please enter your email";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(fd.get("email")))) next.email = "Enter a valid email";
    if (!String(fd.get("message") || "").trim()) next.message = "Please tell us a bit about how we can help";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("Message sent! We'll be in touch within 1 business day.");
    e.currentTarget.reset();
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get in touch"
        title={<>We'd love to <span className="text-gradient">hear from you</span></>}
        subtitle="Whether you have a question, want to make a referral, or just want a friendly chat — we're here."
      />

      <section className="py-16 md:py-20">
        <div className="container grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="bg-card rounded-3xl shadow-card p-8 md:p-10 border border-border/40">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Send us a message</h2>
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-1.5 block">Name</Label>
                    <Input id="name" name="name" className={`h-12 rounded-2xl ${errors.name ? "border-destructive" : ""}`} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5 block">Email</Label>
                    <Input id="email" name="email" type="email" className={`h-12 rounded-2xl ${errors.email ? "border-destructive" : ""}`} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block">Phone (optional)</Label>
                  <Input id="phone" name="phone" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <Label htmlFor="message" className="mb-1.5 block">Message</Label>
                  <Textarea id="message" name="message" rows={5} className={`rounded-2xl ${errors.message ? "border-destructive" : ""}`} />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" size="lg" variant="hero" className="w-full sm:w-auto">
                  Send Message <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, title: "Call us", value: "0796911236", sub: "Mon–Fri, 8am–6pm" },
              { icon: Mail, title: "Email", value: "hello@astepsupport.com.au", sub: "We reply within 1 business day" },
              { icon: MapPin, title: "Visit", value: "Zaburi, Junction lane", sub: "Uasin Gishu 2000" },
              { icon: Clock, title: "Hours", value: "Mon–Fri 8am–6pm", sub: "Weekend supports available" },
            ].map((c) => (
              <div key={c.title} className="bg-card rounded-2xl p-5 flex gap-4 border border-border/40 shadow-soft">
                <div className="w-11 h-11 rounded-2xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.title}</p>
                  <p className="font-display font-semibold">{c.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
            <div className="aspect-[4/3] rounded-2xl gradient-soft flex items-center justify-center border border-border/40">
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Map preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
