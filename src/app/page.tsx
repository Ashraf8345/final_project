import { MarketingLayout } from "@/features/marketing-shell/components/marketing-layout"
import { Hero } from "@/features/hero/components/hero"
import { TrustedBy } from "@/features/marketing/components/trusted-by"
import { HowItWorks } from "@/features/marketing/components/how-it-works"
import { AIShowcase } from "@/features/marketing/components/ai-showcase"
import { CoreFeatures } from "@/features/marketing/components/core-features"
import { PortfolioTemplates } from "@/features/marketing/components/portfolio-templates"

export default function Home() {
  return (
    <MarketingLayout>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <AIShowcase />
      <CoreFeatures />
      <PortfolioTemplates />
    </MarketingLayout>
  )
}
