import { MarketingLayout } from "@/features/marketing-shell/components/marketing-layout";
import { Hero } from "@/features/hero/components/hero";
import { BentoFeatures } from "@/features/marketing/components/bento-features";
import { AIShowcase } from "@/features/marketing/components/ai-showcase";
import { CoreFeatures } from "@/features/marketing/components/core-features";
import { PortfolioTemplates } from "@/features/marketing/components/portfolio-templates";
import { Pricing } from "@/features/marketing/components/pricing";
import { Faq } from "@/features/marketing/components/faq";
import { FinalCta } from "@/features/marketing/components/final-cta";
import OneTap from "@/features/auth/components/one-tap";

export default function Home() {
  return (
    <MarketingLayout>
      <Hero />
      <BentoFeatures />
      <AIShowcase />
      <CoreFeatures />
      <PortfolioTemplates />
      <Pricing />
      <Faq />
      <FinalCta />
      <OneTap />
    </MarketingLayout>
  );
}
