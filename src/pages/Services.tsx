import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ReferralBanner } from "@/components/sections/ReferralBanner";

const Services = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="What we do"
        title={<>Supports built <span className="text-gradient">around you</span></>}
        subtitle="Six core services delivered with warmth and expertise — choose what fits, and we'll help you take the next step."
      />
      <ServicesGrid showHeader={false} />
      <ReferralBanner />
    </SiteLayout>
  );
};

export default Services;
