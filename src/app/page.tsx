import { MarketingLayout } from "@/features/marketing-shell/components/marketing-layout"
import { PageLayout } from "@/features/marketing-shell/components/page-layout"
import { Grid } from "@/components/layout/grid"
import { Section } from "@/components/layout/section"
import { EmptyState } from "@/components/states/empty-state"
import { PageHeader } from "@/components/typography/page-header"
import { SectionHeader } from "@/components/typography/section-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { marketingNavigationLinks } from "@/config/navigation"

const shellFeatures = [
  {
    title: "Typography system",
    description: "Global UI, display, and monospace fonts are configured through next/font and reusable type utilities.",
  },
  {
    title: "Config-driven navigation",
    description: "Navbar, mobile menu, footer groups, and CTAs all read from shared configuration files.",
  },
  {
    title: "Reusable layout wrappers",
    description: "MarketingLayout and PageLayout give future pages a consistent shell without duplicating structure.",
  },
] as const

export default function Home() {
  return (
    <MarketingLayout>
      <PageLayout>
        <Section spacing="lg" container={false}>
          <PageHeader
            eyebrow="Phase 2"
            title="The reusable marketing shell is ready for future pages."
            description="Navigation, typography, layout, and footer are now centralized so Phase 3 can focus on content instead of rebuilding the frame."
            actions={
              <div className="flex flex-wrap items-center gap-2">
                {marketingNavigationLinks.map((item) => (
                  <Badge key={item.label} variant="outline">
                    {item.label}
                  </Badge>
                ))}
              </div>
            }
            meta="This page intentionally stays shell-focused and does not introduce hero, features, pricing, or other later-phase sections."
          />
        </Section>

        <Section tone="muted" spacing="lg" aria-labelledby="shell-foundations-heading">
          <SectionHeader
            id="shell-foundations-heading"
            eyebrow="Foundations"
            title="Every future marketing page can now inherit the same structure."
            description="The shell is sticky, responsive, theme-aware, and typed from configuration."
          />
          <Grid columns={3} className="mt-10">
            {shellFeatures.map((feature) => (
              <Card key={feature.title} className="border-border/70 bg-card/90">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="subtle" size="lg">Reusable primitive</Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section spacing="lg" aria-labelledby="shell-placeholder-heading">
          <EmptyState
            title="Phase 3 content has not started"
            description="The application shell is complete. Hero and marketing sections can now be added inside this layout without reworking navigation, typography, or footer architecture."
            action={<Button variant="brand">Ready for Hero</Button>}
          />
        </Section>
      </PageLayout>
    </MarketingLayout>
  )
}
