"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagicBento, type BentoCardProps } from "@/components/ui/magic-bento";
import {
  GitHubIcon,
  SparklesIcon,
  PaletteIcon,
  GlobeIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  CheckIcon,
} from "@/components/ui/icons";
import { headingClassNames, bodyClassNames } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function BentoFeatures() {
  const cards: BentoCardProps[] = [
    {
      label: "Step 01",
      title: "Connect GitHub",
      description:
        "Securely link your GitHub account. We analyze only your public activity and public repositories.",
      icon: <GitHubIcon className="size-4.5 text-foreground/80" />,
      color: "var(--card)",
      className: "col-span-12 md:col-span-6 lg:col-span-6",
      children: (
        <div className="flex flex-1 items-center justify-center p-4 mt-2 w-full">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-xl border border-border/50 bg-background/60 p-4.5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                  YD
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    Yousef Dawood
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    @yousefdawood7
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="gap-1 text-[9px] h-5 bg-emerald-500/10 text-emerald-500 border-none px-2"
              >
                <ShieldCheckIcon className="size-3" />
                Linked
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
              <div className="bg-muted/30 border border-border/30 rounded-lg py-2">
                <span className="block text-muted-foreground text-[8px] uppercase tracking-wider">
                  Repositories
                </span>
                <span className="font-semibold text-foreground text-sm font-mono">
                  21
                </span>
              </div>
              <div className="bg-muted/30 border border-border/30 rounded-lg py-2">
                <span className="block text-muted-foreground text-[8px] uppercase tracking-wider">
                  Stars
                </span>
                <span className="font-semibold text-foreground text-sm font-mono">
                  2
                </span>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full gap-1.5 text-[10px] h-8.5 pointer-events-none bg-foreground text-background font-medium"
            >
              <GitHubIcon className="size-3.5" />
              Connected as @yousefdawood7
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "Step 02",
      title: "AI Analysis",
      description:
        "Our AI model crawls your contributions, reads pinned projects, identifies core languages, and drafts recruiter-ready summaries.",
      icon: <SparklesIcon className="size-4.5 text-amber-500" />,
      color: "var(--card)",
      className: "col-span-12 md:col-span-6 lg:col-span-6",
      children: (
        <div className="flex flex-1 flex-col justify-center p-4 mt-2 w-full">
          <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-xl border border-border/50 bg-background/60 p-4.5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                Analysis Engine
              </span>
              <SparklesIcon className="size-3.5 text-amber-500 animate-pulse" />
            </div>
            <div className="space-y-3">
              {/* Stacked Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] text-muted-foreground">
                  <span>Language Distribution</span>
                  <span className="font-semibold text-foreground">
                    100% Analyzed
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-sky-500"
                    style={{ width: "68%" }}
                    title="TypeScript (68%)"
                  />
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: "22%" }}
                    title="React (22%)"
                  />
                  <div
                    className="h-full bg-cyan-400"
                    style={{ width: "10%" }}
                    title="Tailwind (10%)"
                  />
                </div>
                <div className="flex gap-3 text-[8px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-sky-500" />
                    TS 68%
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-indigo-500" />
                    React 22%
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-cyan-400" />
                    Tailwind 10%
                  </span>
                </div>
              </div>

              {/* Status checklist */}
              <div className="space-y-1.5 border-t border-border/30 pt-2.5">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckIcon className="size-3 text-emerald-500" />
                    Indexed 21 Repositories
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckIcon className="size-3 text-emerald-500" />
                    Extracted tech stack narratives
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                    Drafting recruiter bio summaries...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Step 03",
      title: "Customize Portfolio",
      description:
        "Fine-tune generated descriptions, choose from premium design systems, and toggle sections to match your goals.",
      icon: <SlidersHorizontalIcon className="size-4.5 text-rose-500" />,
      color: "var(--card)",
      className: "col-span-12 md:col-span-6 lg:col-span-6",
      children: (
        <div className="flex flex-1 items-center justify-center p-4 mt-2 w-full">
          <div className="w-full max-w-[280px] sm:max-w-[320px] rounded-xl border border-border/50 bg-background/60 p-4.5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
              <PaletteIcon className="size-4 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground">
                Editor Preferences
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Colors Row */}
              <div className="space-y-1.5">
                <span className="block text-[9px] text-muted-foreground font-mono uppercase tracking-wider">
                  Accent Palette
                </span>
                <div className="flex gap-2.5">
                  <div className="size-5 rounded-full bg-indigo-500 ring-2 ring-indigo-500/25 ring-offset-2 ring-offset-background cursor-pointer" />
                  <div className="size-5 rounded-full bg-emerald-500 cursor-pointer" />
                  <div className="size-5 rounded-full bg-rose-500 cursor-pointer" />
                  <div className="size-5 rounded-full bg-amber-500 cursor-pointer" />
                  <div className="size-5 rounded-full bg-violet-500 cursor-pointer" />
                </div>
              </div>

              {/* Toggles List */}
              <div className="space-y-2 border-t border-border/30 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Show Repositories
                  </span>
                  <span className="size-2 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Show Contributions
                  </span>
                  <span className="size-2 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-xs opacity-50">
                  <span className="text-muted-foreground">Show Experience</span>
                  <span className="size-2 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Step 04",
      title: "Publish",
      description:
        "Instantly deploy your lightning-fast portfolio with custom domain configuration.",
      icon: <GlobeIcon className="size-4.5 text-sky-500" />,
      color: "var(--card)",
      className: "col-span-12 md:col-span-6 lg:col-span-3",
      children: (
        <div className="flex flex-1 items-center justify-center p-4 mt-2 w-full">
          <div className="w-full max-w-[200px] rounded-xl border border-border/50 bg-background/60 p-4 shadow-sm space-y-3.5 text-center">
            <div className="mx-auto size-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
              <GlobeIcon className="size-5.5" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-foreground">
                Custom Domains
              </p>
              <div className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-muted-foreground bg-muted/65 px-2.5 py-1 rounded border border-border/30 max-w-full">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">yousefdawood.me</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Success",
      title: "Result",
      description: "Your professional brand is online at your address.",
      icon: <CheckIcon className="size-4.5 text-emerald-500" />,
      color: "var(--card)",
      className: "col-span-12 md:col-span-12 lg:col-span-3",
      children: (
        <div className="flex flex-1 items-center justify-center p-4 mt-2 w-full">
          <div className="w-full max-w-[200px] rounded-xl border border-border/50 bg-background/60 overflow-hidden shadow-sm">
            {/* Mock browser header */}
            <div className="bg-muted/70 px-3 py-1.5 border-b border-border/40 flex items-center gap-1.5">
              <div className="flex gap-1">
                <div className="size-1.5 rounded-full bg-rose-500" />
                <div className="size-1.5 rounded-full bg-amber-500" />
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-background border border-border/40 rounded px-2 py-0.5 text-[7px] text-muted-foreground truncate w-full flex items-center gap-1 max-w-[120px]">
                <ShieldCheckIcon className="size-2 text-emerald-500" />
                yousefdawood.me
              </div>
            </div>

            {/* Mini preview inside */}
            <div className="p-3 text-center space-y-2">
              <div className="mx-auto size-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                <CheckIcon className="size-4.5" />
              </div>
              <div>
                <p className="text-[9px] font-semibold text-foreground">
                  Deployment Active
                </p>
                <p className="text-[8px] text-muted-foreground font-mono">
                  yousefdawood.me
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section id="how-it-works" spacing="xl" tone="default">
      <Container size="wide" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="px-3 py-1 font-mono uppercase tracking-wider text-[10px] border-border/60"
          >
            Workflow
          </Badge>
          <h2 className={cn(headingClassNames.h1)}>
            From Profile to Portfolio in minutes
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            Devora connects securely to compile a fully customized
            recruiter-ready landing page. Here is the process.
          </p>
        </div>

        <MagicBento
          cards={cards}
          glowColor="99, 102, 241" // Indigo-500 RGB
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          customLayout={true}
          className="grid grid-cols-12 gap-4 w-full"
        />
      </Container>
    </Section>
  );
}
