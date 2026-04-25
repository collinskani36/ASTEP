import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Stats } from "@/components/sections/Stats";

const Index = () => {
  return (
    <SiteLayout>
      <Hero />
      <ServicesGrid />
      <Stats />
    </SiteLayout>
  );
};

export default Index;