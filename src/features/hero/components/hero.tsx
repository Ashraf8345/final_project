import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { BackgroundDecorations } from "@/features/hero/components/background-decorations"
import { GitHubPreview } from "@/features/hero/components/github-preview"
import { HeroContent } from "@/features/hero/components/hero-content"

export function Hero() {
  return (
    <Section spacing="xl" container={false} className="relative overflow-hidden">
      <BackgroundDecorations />
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroContent />
          <div className="flex justify-center lg:justify-end">
            <GitHubPreview />
          </div>
        </div>
      </Container>
    </Section>
  )
}
