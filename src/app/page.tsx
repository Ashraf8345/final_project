import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/brand/theme-toggle"
import { Container } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { Section } from "@/components/layout/section"
import { Stack } from "@/components/layout/stack"
import { EmptyState } from "@/components/states/empty-state"
import { ErrorState } from "@/components/states/error-state"
import { LoadingState } from "@/components/states/loading-state"
import { SkeletonCard, SkeletonGrid, SkeletonStat } from "@/components/states/skeletons"
import { PageHeader } from "@/components/typography/page-header"
import { SectionHeader } from "@/components/typography/section-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const installedComponents = [
  "accordion",
  "aspect-ratio",
  "avatar",
  "badge",
  "button",
  "card",
  "dropdown-menu",
  "input",
  "navigation-menu",
  "separator",
  "sheet",
  "skeleton",
  "tabs",
]

export default function Home() {
  return (
    <main>
      <Section spacing="xl" container={false}>
        <Container className="space-y-10">
          <Stack direction="horizontal" responsive align="center" justify="between" gap="md">
            <Logo withTagline />
            <ThemeToggle />
          </Stack>
          <PageHeader
            eyebrow="Phase 1"
            title="A reusable design foundation for the marketing site."
            description="This preview exercises the shared layout, brand, typography, state, and utility primitives without building any Phase 2 or later sections."
            actions={
              <>
                <Button variant="brand" size="lg">Primary action</Button>
                <Button variant="subtle" size="lg">Secondary action</Button>
              </>
            }
            meta="Built mobile-first with shadcn/ui primitives, semantic tokens, and shared layout abstractions."
          />
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="foundation-layout-heading">
        <SectionHeader
          id="foundation-layout-heading"
          eyebrow="Layout"
          title="Shared structure, not page-specific wrappers."
          description="The marketing site can now compose consistent spacing, width constraints, stacks, and responsive grids from a single foundation layer."
        />
        <Grid columns={3} className="mt-10">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Container</CardTitle>
              <CardDescription>Shared horizontal rhythm with width presets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Use for page-level alignment and section internals.</p>
              <Badge variant="outline">max-w-6xl</Badge>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Section</CardTitle>
              <CardDescription>Controls spacing and tonal surfaces.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Prevents random vertical spacing across the site.</p>
              <Badge variant="outline">py-20 to py-32</Badge>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Grid and Stack</CardTitle>
              <CardDescription>Responsive composition primitives for sections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Use for cards, feature rows, pricing columns, and CTAs.</p>
              <Badge variant="outline">8px spacing scale</Badge>
            </CardContent>
          </Card>
        </Grid>
      </Section>

      <Section aria-labelledby="foundation-typography-heading">
        <Stack gap="xl">
          <SectionHeader
            id="foundation-typography-heading"
            eyebrow="Typography"
            title="Deliberate hierarchy for a premium developer SaaS."
            description="Space Grotesk leads display moments, Manrope handles reading flow, and IBM Plex Mono stays reserved for labels and technical accents."
          />
          <MaxWidthWrapper size="content" className="space-y-6">
            <p className="font-mono text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
              Developer-first editorial system
            </p>
            <h3 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The design language stays minimal, spacious, and precise.
            </h3>
            <p className="text-lg leading-8 text-muted-foreground">
              The foundation sets typography, tokens, and interaction rules once so later marketing sections inherit the same rhythm instead of each section inventing its own visual logic.
            </p>
          </MaxWidthWrapper>
        </Stack>
      </Section>

      <Section tone="accent" aria-labelledby="foundation-states-heading">
        <SectionHeader
          id="foundation-states-heading"
          eyebrow="States"
          title="Empty, loading, and error patterns are ready before content sections land."
          description="These states are intentionally generic so features, showcases, and pricing blocks can reuse them without duplication."
        />
        <Grid columns={3} className="mt-10">
          <EmptyState
            title="No showcase items yet"
            description="When a section has no content, the user still gets direction instead of a blank region."
            action={<Button variant="brand">Add content</Button>}
          />
          <ErrorState
            description="This pattern keeps failure copy concise, specific, and paired with a single recovery path."
            action={<Button variant="outline">Retry request</Button>}
          />
          <LoadingState
            compact
            title="Loading templates"
            description="Skeletons preserve layout stability while content arrives."
          />
        </Grid>
      </Section>

      <Section aria-labelledby="foundation-skeletons-heading">
        <Stack gap="xl">
          <SectionHeader
            id="foundation-skeletons-heading"
            eyebrow="Skeletons"
            title="Skeleton primitives match the same surfaces and spacing as the final UI."
            description="That keeps loading states visually integrated instead of feeling like a disconnected fallback."
          />
          <Grid columns={3}>
            <SkeletonCard />
            <SkeletonCard />
            <div className="space-y-6">
              <SkeletonStat />
              <SkeletonStat />
            </div>
          </Grid>
          <Separator />
          <Stack gap="md">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Installed shadcn primitives for the marketing site
            </p>
            <div className="flex flex-wrap gap-2">
              {installedComponents.map((component) => (
                <Badge key={component} variant="outline">
                  {component}
                </Badge>
              ))}
            </div>
          </Stack>
          <SkeletonGrid count={3} />
        </Stack>
      </Section>
    </main>
  )
}
