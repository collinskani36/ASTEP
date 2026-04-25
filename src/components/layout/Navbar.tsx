import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { navLinks, services } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-smooth",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border/50 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-18 md:h-20 items-center justify-between py-3">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href} className="relative group">
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                      isActive
                        ? "text-primary bg-primary-soft"
                        : "text-foreground/80 hover:text-primary hover:bg-primary-soft/60"
                    )
                  }
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </NavLink>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth">
                  <div className="bg-card rounded-2xl shadow-lift border border-border/50 p-2 w-72">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary-soft transition-smooth group/item"
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                          s.accent === "lavender" && "bg-surface-lavender text-primary",
                          s.accent === "sage" && "bg-surface-sage text-secondary",
                          s.accent === "peach" && "bg-surface-peach text-primary",
                          s.accent === "sky" && "bg-surface-sky text-secondary",
                        )}>
                          <s.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{s.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{s.short}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                    isActive
                      ? "text-primary bg-primary-soft"
                      : "text-foreground/80 hover:text-primary hover:bg-primary-soft/60"
                  )
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/contact">Get Support</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/refer-to-us">Refer to Us</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-11 h-11 rounded-full bg-primary-soft text-primary flex items-center justify-center"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-foreground/90 hover:bg-primary-soft transition-smooth font-medium"
                    >
                      {link.label}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              to={`/services/${s.slug}`}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-3 rounded-2xl font-medium transition-smooth",
                        isActive
                          ? "text-primary bg-primary-soft"
                          : "text-foreground/90 hover:bg-primary-soft"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-border">
                <Button asChild variant="outline">
                  <Link to="/contact">Get Support</Link>
                </Button>
                <Button asChild>
                  <Link to="/refer-to-us">Refer to Us</Link>
                </Button>
              </div>
              <a href="tel:1800278377" className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground py-2">
                <Phone className="w-4 h-4" /> 0796911236
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
