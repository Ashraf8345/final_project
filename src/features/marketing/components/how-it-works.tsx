"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  GitHubIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SlidersHorizontalIcon,
  GlobeIcon,
  CheckIcon,
} from "@/components/ui/icons"
import { headingClassNames, bodyClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

interface Step {
  number: string
  title: string
  description: string
  visual: React.ReactNode
}

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const steps: Step[] = [
    {
      number: "01",
      title: "Connect GitHub",
      description: "Securely link your GitHub account in one click. We analyze only your public activity and public repositories.",
      visual: (
        <div className="flex h-40 items-center justify-center p-4">
          <div className="relative w-full max-w-[240px] rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <GitHubIcon className="size-6 text-foreground" />
              <Badge variant="secondary" className="gap-1 text-[10px] h-4.5">
                <ShieldCheckIcon className="size-3 text-emerald-500" />
                Secure
              </Badge>
            </div>
            <Button size="sm" className="w-full gap-1.5 pointer-events-none bg-foreground text-background">
              <GitHubIcon className="size-3.5" />
              Connect Profile
            </Button>
            <div className="absolute -bottom-2 -right-2 size-2 bg-emerald-500 rounded-full animate-ping" />
            <div className="absolute -bottom-2 -right-2 size-2 bg-emerald-500 rounded-full" />
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI model crawls your contributions, reads pinned projects, identifies core languages, and drafts recruiter-ready summaries.",
      visual: (
        <div className="flex h-40 flex-col justify-center p-4">
          <div className="w-full max-w-[240px] mx-auto rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Analyzing Repos</span>
              <SparklesIcon className="size-3.5 text-amber-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>simple-auth-system-demo</span>
                <span className="font-semibold text-amber-500 text-[10px]">98%</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500"
                  initial={{ width: "10%" }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <Badge variant="outline" className="text-[9px] h-4">TypeScript</Badge>
              <Badge variant="outline" className="text-[9px] h-4">Frontend</Badge>
              <Badge variant="outline" className="text-[9px] h-4">Auth</Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Customize Portfolio",
      description: "Fine-tune generated descriptions, choose from curated professional design systems, and toggle sections to match your goals.",
      visual: (
        <div className="flex h-40 items-center justify-center p-4">
          <div className="w-full max-w-[240px] rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <SlidersHorizontalIcon className="size-3.5 text-muted-foreground" />
              <span>Layout & Styling</span>
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Theme Accent</span>
                  <span className="font-mono text-foreground font-medium">Emerald</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full relative">
                  <div className="absolute top-1/2 left-2/3 -translate-y-1/2 size-2.5 rounded-full bg-emerald-500 shadow-sm border border-background" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Font Scale</span>
                  <span className="font-mono text-foreground font-medium">Spacious</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full relative">
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 size-2.5 rounded-full bg-foreground shadow-sm border border-background" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "04",
      title: "Publish Globally",
      description: "Instantly deploy your lightning-fast portfolio with clean developer-first layouts, optimized for Core Web Vitals and SEO.",
      visual: (
        <div className="flex h-40 items-center justify-center p-4">
          <div className="relative w-full max-w-[240px] rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm text-center space-y-2">
            <div className="mx-auto size-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckIcon className="size-4" />
            </div>
            <p className="text-xs font-semibold">Portfolio Live!</p>
            <div className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/40">
              <GlobeIcon className="size-3" />
              <span>yousefdawood.me</span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <Section id="how-it-works" spacing="xl" tone="default">
      <Container size="wide" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="px-3 py-1 font-mono uppercase tracking-wider text-[10px] border-border/60">
            Workflow
          </Badge>
          <h2 className={cn(headingClassNames.h1)}>
            From Profile to Portfolio in minutes
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            PortfolioGenie connects securely to compile a fully customized recruiter-ready landing page. Here is the process.
          </p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, idx) => (
            <motion.div key={step.number} variants={stepVariants} className="group relative flex flex-col justify-between">
              <Card className="relative flex flex-col justify-between h-full overflow-hidden border-border/50 bg-card/40 transition-all duration-300 hover:border-border hover:shadow-md hover:bg-card/75">
                <div className="absolute top-4 right-4 font-mono text-3xl font-extrabold tracking-tight opacity-10 select-none group-hover:opacity-20 transition-opacity">
                  {step.number}
                </div>
                <div className="p-6 pb-2">
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-foreground/90 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <div className="relative border-t border-border/30 bg-muted/10 group-hover:bg-muted/20 transition-colors mt-4">
                  {step.visual}
                </div>
              </Card>
              {idx < 3 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 border-t border-dashed border-border/60 lg:block -translate-y-1/2 z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
