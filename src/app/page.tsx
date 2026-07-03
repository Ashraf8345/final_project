import { MarketingLayout } from "@/features/marketing-shell/components/marketing-layout"
import { Hero } from "@/features/hero/components/hero"
import { BentoFeatures } from "@/features/marketing/components/bento-features"
import { AIShowcase } from "@/features/marketing/components/ai-showcase"
import { CoreFeatures } from "@/features/marketing/components/core-features"
import { PortfolioTemplates } from "@/features/marketing/components/portfolio-templates"

export default function Home() {
  return (
    <MarketingLayout>
      <Hero />
      <BentoFeatures />
      <AIShowcase />
      <CoreFeatures />
      <PortfolioTemplates />
    </MarketingLayout>
  )
}
