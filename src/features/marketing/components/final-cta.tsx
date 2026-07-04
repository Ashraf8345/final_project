import type { Route } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  GitHubIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { headingClassNames, bodyClassNames } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <Section id="cta" spacing="xl" tone="muted">
      <Container size="page" className="text-center space-y-8">
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <SparklesIcon className="size-3.5 text-amber-500" />
            Free forever — no credit card required
          </div>
          <h2 className={cn(headingClassNames.h1)}>
            Your GitHub profile deserves a portfolio
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            Stop spending weekends building portfolio sites from scratch.
            Connect your GitHub, let AI do the heavy lifting, and ship a
            professional web presence in minutes.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="brand" size="lg" className="gap-2 px-6">
            <GitHubIcon className="size-4" />
            Get Started Free
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2 px-6" asChild>
            <Link href={"/#templates" as Route}>View Templates</Link>
          </Button>
        </div>

        <p className={cn(bodyClassNames.caption, "pt-2")}>
          Join 2,000+ developers who already ship with Devora.
        </p>
      </Container>
    </Section>
  );
}
