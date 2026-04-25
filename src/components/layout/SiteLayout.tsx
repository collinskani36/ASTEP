import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { CookieConsent } from "./CookieConsent";
import { ScrollToTop } from "./ScrollToTop";

export const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  );
};
