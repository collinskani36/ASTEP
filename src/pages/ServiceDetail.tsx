import { Link, useParams } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/site-data";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase"; // Add this import

const accentMap = {
  lavender: "bg-surface-lavender text-primary",
  sage: "bg-surface-sage text-secondary",
  peach: "bg-surface-peach text-primary",
  sky: "bg-surface-sky text-secondary",
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [submitting, setSubmitting] = useState(false);

  if (!service) {
    return (
      <SiteLayout>
        <div className="container py-32 text-center">
          <h1 className="font-display text-3xl mb-4">Service not found</h1>
          <Button asChild><Link to="/services">View all services</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const enquiryData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      service_slug: service.slug,
      service_title: service.title,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([enquiryData]);

      if (error) throw error;

      toast.success("Enquiry sent! We'll be in touch soon.");
      form.reset();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <section className="gradient-hero pt-12 pb-12 md:pt-16">
        <div className="container">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" /> All services
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-soft", accentMap[service.accent])}>
              <service.icon className="w-9 h-9" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mb-2">{service.title}</h1>
              <p className="text-muted-foreground max-w-2xl">{service.short}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div>
            <div className={cn("aspect-[4/5] rounded-[2rem] overflow-hidden", accentMap[service.accent])}>
              <img src={service.image} alt={service.title} loading="lazy" width={800} height={1000} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">About this service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
              <p className="text-muted-foreground leading-relaxed">
                Our team takes time to understand what matters most to you, then builds a flexible plan that grows alongside your goals.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-xl mb-4">What's included</h3>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-soft/40">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-3xl shadow-card p-8 md:p-10 border border-border/40">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Enquire about this service</h2>
            <p className="text-muted-foreground mb-6">Leave a few details and our team will reach out with care.</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input name="name" required placeholder="Your name" className="h-12 rounded-2xl" />
              <Input name="email" required type="email" placeholder="Email address" className="h-12 rounded-2xl" />
              <Input name="phone" placeholder="Phone (optional)" className="h-12 rounded-2xl" />
              <Textarea name="message" required rows={4} placeholder={`Tell us a bit about your ${service.title.toLowerCase()} needs…`} className="rounded-2xl" />
              <Button type="submit" size="lg" variant="hero" className="w-full" disabled={submitting}>
                {submitting ? "Sending…" : "Send Enquiry"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ServiceDetail;