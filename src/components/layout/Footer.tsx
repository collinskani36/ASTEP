import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { services } from "@/lib/site-data";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(261_40%_15%)] text-[hsl(250_30%_92%)] mt-20">
      <div className="container py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Col 1 */}
        <div className="space-y-5">
          <div className="bg-white/5 inline-block px-3 py-2 rounded-2xl backdrop-blur-sm">
            <Logo variant="light" />
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            Supporting Every Step Forward. Compassionate, person-centred NDIS support across the community.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                aria-label="social"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-smooth"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-display font-semibold text-base mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/#about" },
              { label: "Group Activities", to: "/group-activities" },
              { label: "Work With Us", to: "/work-with-us" },
              { label: "Blog", to: "/blog" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition-smooth">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-display font-semibold text-base mb-4">Our Services</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-white transition-smooth">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-display font-semibold text-base mb-4">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
              <a href="tel:1800278377" className="hover:text-white">0796911236</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
              <a href="mailto:hello@astepsupport.com.au" className="hover:text-white">hello@astepsupport.com.au</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
              <span>Zaburi , Junction street <br/>Kimumu</span>
            </li>
          </ul>
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 text-xs">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>NDIS Registered Provider</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Astep Support Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Welcome Pack</Link>
          </div>
        </div>
        <div className="container pb-6">
          <p className="text-[11px] text-white/50 leading-relaxed">
            <span className="font-medium text-white/70">Acknowledgement of Country.</span> Astep Support Services acknowledges the Traditional Custodians of the lands on which we live and work, and pays respect to Elders past, present and emerging.
          </p>
        </div>
      </div>
    </footer>
  );
};
