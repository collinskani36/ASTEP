import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReferralBanner = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] gradient-warm p-10 md:p-16 text-center"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-2xl mx-auto text-primary-foreground">
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 leading-tight">
              Ready to take the first step?
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/85 mb-8">
              Whether for yourself, a loved one or a participant — we're here when you're ready.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="white">
                <Link to="/refer-to-us">
                  Refer to Us <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="whiteOutline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
