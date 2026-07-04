"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SparklesIcon, GitHubIcon } from "@/components/ui/icons";
import { headingClassNames, bodyClassNames } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function AIShowcase() {
  const prefersReducedMotion = useReducedMotion();

  const rawJson = `{
  "username": "yousefdawood7",
  "name": "Yousef Dawood",
  "bio": "React && Next.js",
  "location": "Egypt",
  "repositories": [
    {
      "name": "photoloop",
      "stars": 2,
      "language": "TypeScript"
    }
  ]
}`;

  return (
    <Section id="ai-showcase" spacing="xl" tone="muted">
      <Container size="wide" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge
            variant="outline"
            className="px-3 py-1 font-mono uppercase tracking-wider text-[10px] border-border/60"
          >
            Transformation
          </Badge>
          <h2 className={cn(headingClassNames.h1)}>
            Turn raw data into opportunities
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            Recruiters don&apos;t read JSON or crawl repositories. Devora
            transforms your raw profile data into a high-converting editorial
            developer portfolio.
          </p>
        </div>

        <div className="grid gap-8 items-center lg:grid-cols-2">
          {/* Before: Raw Data */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold tracking-tight text-muted-foreground flex items-center gap-1.5">
                <GitHubIcon className="size-4 text-muted-foreground" />
                Raw GitHub JSON
              </span>
              <Badge variant="outline" className="text-[10px] h-4.5 font-mono">
                Input
              </Badge>
            </div>
            <Card className="overflow-hidden border-border/50 bg-neutral-950 text-neutral-200 font-mono text-xs p-5 shadow-inner">
              <pre className="overflow-x-auto leading-relaxed select-all">
                <code>{rawJson}</code>
              </pre>
            </Card>
          </div>

          {/* After: Transformed Portfolio */}
          <div className="space-y-4 relative">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1.5">
                <SparklesIcon className="size-4 text-amber-500 animate-pulse" />
                Transformed Portfolio
              </span>
              <Badge
                variant="default"
                className="text-[10px] h-4.5 font-mono shadow-sm"
              >
                AI Transformed
              </Badge>
            </div>

            {/* Visual Portfolio Card Mockup */}
            <Card className="relative overflow-hidden border-border/50 bg-card p-6 shadow-xl space-y-6">
              {/* Cover layout */}
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-semibold font-heading text-lg">
                  YD
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold">
                    Yousef Dawood
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    React & Next.js Engineer · Egypt
                  </p>
                </div>
              </div>

              {/* Bio summary */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                  Summary
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Creative software engineer focusing on high-performance React
                  applications, type-safe Next.js architecture, and interactive
                  web tools.
                </p>
              </div>

              {/* Featured Project Showcase */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                  Featured Project
                </span>
                <div className="p-3 border border-border/50 bg-muted/30 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">photoloop</span>
                    <Badge variant="secondary" className="text-[9px] h-4">
                      Active
                    </Badge>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    A modern platforms for sharing photos and stories with the
                    people who matter most, utilizing serverless architecture.
                  </p>
                </div>
              </div>

              {/* Sparkle decorative effect */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
