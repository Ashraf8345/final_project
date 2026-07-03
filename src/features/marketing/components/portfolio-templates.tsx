"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { headingClassNames, bodyClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

interface Template {
  id: string
  name: string
  description: string
  inspiration: string
  accent: string
  previewStyle: React.ReactNode
}

export function PortfolioTemplates() {
  const prefersReducedMotion = useReducedMotion()

  const templates: Template[] = [
    {
      id: "sleek-dark",
      name: "Sleek Dark",
      description: "A gorgeous dark-mode layout designed with deep hues, crisp borders, and subtle glowing accent spots. Optimized for design engineers.",
      inspiration: "Vercel & Raycast",
      accent: "from-amber-500 to-rose-500",
      previewStyle: (
        <div className="relative h-48 w-full bg-zinc-950 rounded-t-xl border-b border-zinc-800 p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-zinc-800" />
              <div className="h-2 w-16 bg-zinc-800 rounded" />
            </div>
            <div className="h-4 w-12 bg-zinc-850 rounded border border-zinc-800" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-2/3 bg-zinc-850 rounded" />
            <div className="h-2 w-full bg-zinc-900 rounded" />
            <div className="h-2 w-4/5 bg-zinc-900 rounded" />
          </div>
          {/* Accent glow */}
          <div className="absolute -bottom-10 -right-10 size-24 bg-amber-500/10 rounded-full blur-2xl" />
        </div>
      ),
    },
    {
      id: "minimalist-mono",
      name: "Minimalist Mono",
      description: "Clean typography, high-contrast monochrome tones, and spacious grids. Designed for minimalists and backend engineers.",
      inspiration: "Linear",
      accent: "from-zinc-500 to-zinc-800",
      previewStyle: (
        <div className="relative h-48 w-full bg-white dark:bg-zinc-900 rounded-t-xl border-b border-border/40 p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-3 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
              <div className="h-1.5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
            </div>
          </div>
          <div className="h-6 w-full bg-zinc-100 dark:bg-zinc-800 rounded-sm border border-zinc-200 dark:border-zinc-700" />
        </div>
      ),
    },
    {
      id: "modern-editorial",
      name: "Modern Editorial",
      description: "Large, bold sans-serif display type paired with fluid, colorful gradient backdrops and responsive creative grids.",
      inspiration: "Stripe",
      accent: "from-emerald-500 to-teal-400",
      previewStyle: (
        <div className="relative h-48 w-full bg-zinc-50 dark:bg-zinc-950 rounded-t-xl border-b border-border/40 p-4 overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
          <div className="flex justify-between items-center">
            <div className="size-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[10px] font-bold">YD</div>
            <div className="flex gap-2">
              <div className="h-2 w-8 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-2 w-8 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded" />
            <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-4 w-12 bg-emerald-500/10 rounded" />
            <div className="h-4 w-12 bg-teal-500/10 rounded" />
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

  const cardVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <Section id="templates" spacing="xl" tone="default">
      <Container size="wide" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="px-3 py-1 font-mono uppercase tracking-wider text-[10px] border-border/60">
            Designs
          </Badge>
          <h2 className={cn(headingClassNames.h1)}>
            Curated developer templates
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            Choose a design system that fits your personal brand. All templates are fully responsive, accessible, and fast.
          </p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {templates.map((tpl) => (
            <motion.div key={tpl.id} variants={cardVariants} className="group flex flex-col">
              <Card className="flex flex-col h-full overflow-hidden border-border/50 bg-card/40 hover:border-border hover:shadow-lg transition-all duration-300">
                {tpl.previewStyle}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold">{tpl.name}</h3>
                      <Badge variant="outline" className="text-[9px] h-4.5 font-mono">
                        {tpl.inspiration}
                      </Badge>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {tpl.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border/30 mt-6 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Preview Theme</span>
                    <span className="text-sm transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
