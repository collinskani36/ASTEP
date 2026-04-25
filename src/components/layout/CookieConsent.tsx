import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("astep_cookie_consent");
    if (!accepted) {
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("astep_cookie_consent", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-40"
        >
          <div className="bg-card border border-border shadow-lift rounded-3xl p-5 flex gap-4 items-start">
            <div className="w-11 h-11 rounded-2xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm mb-1">A small note about cookies</p>
              <p className="text-xs text-muted-foreground mb-3">
                We use gentle cookies to improve your experience. By using our site, you agree to our cookie policy.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={accept}>Accept</Button>
                <Button size="sm" variant="ghost" onClick={accept}>Decline</Button>
              </div>
            </div>
            <button onClick={accept} aria-label="Close" className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
