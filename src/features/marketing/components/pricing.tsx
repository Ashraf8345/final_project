"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { headingClassNames, bodyClassNames } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  highlight?: boolean;
  badge?: string;
  cta: string;
  features: string[];
}

const tiers: readonly PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description:
      "Perfect for getting started. Build one portfolio from your GitHub profile.",
    price: "$0",
    period: "forever",
    cta: "Get Started Free",
    features: [
      "1 portfolio site",
      "GitHub profile sync",
      "3 curated templates",
      "AI-generated bio",
      "Core Web Vitals optimized",
      "Devora.dev subdomain",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "For developers who want full control over their personal brand.",
    price: "$9",
    period: "/ month",
    highlight: true,
    badge: "Most Popular",
    cta: "Start Pro Trial",
    features: [
      "Unlimited portfolio sites",
      "Real-time GitHub sync",
      "All premium templates",
      "AI resume & cover letter",
      "Custom domain support",
      "SEO & analytics dashboard",
      "Priority support",
      "Remove Devora branding",
    ],
  },
  {
    id: "team",
    name: "Team",
    description:
      "For bootcamps, cohorts, and engineering teams managing developer profiles.",
    price: "$29",
    period: "/ month",
    cta: "Contact Sales",
    features: [
      "Everything in Pro",
      "Up to 25 team members",
      "Centralized admin dashboard",
      "Bulk portfolio generation",
      "Team branding & themes",
      "SSO authentication",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
] as const;

export function Pricing() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : 18,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Section id="pricing" spacing="md" tone="default">
      <Container size="wide" className="space-y-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Badge
            variant="outline"
            className="border-border/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
          >
            Pricing
          </Badge>

          <h2 className={cn(headingClassNames.h1)}>
            Simple, transparent pricing
          </h2>

          <p className={cn(bodyClassNames.lead)}>
            Start free. Upgrade when you need custom domains, AI resumes, or
            team features. No hidden fees.
          </p>
        </div>

        <motion.div
          className="grid items-start gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: { duration: 0.2 },
                    }
              }
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-colors duration-300",
                tier.highlight
                  ? "border-foreground/20 bg-foreground/[0.02] shadow-lg ring-1 ring-foreground/10"
                  : "border-border/60 bg-card/40 hover:border-border hover:shadow-md",
              )}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-foreground px-3 py-0.5 text-[10px] font-medium text-background shadow-sm">
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold">
                    {tier.name}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2">
                  <span className="font-heading text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant={tier.highlight ? "brand" : "outline"}
                  size="lg"
                  className="w-full gap-2"
                >
                  {tier.cta}
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>

              <ul
                role="list"
                className="mt-8 space-y-3 border-t border-border/40 pt-8"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckIcon className="h-3 w-3" />
                    </div>

                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
