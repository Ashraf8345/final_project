---
name: portfoliogenie
description: |
  Use this skill whenever building, modifying, or designing PortfolioGenie.

  Applies to:
  - Landing pages
  - Marketing website
  - SaaS architecture
  - Dashboard
  - AI features
  - GitHub integration
  - Portfolio builder
  - Resume builder
  - Pricing
  - Billing
  - Feature gating
  - Design system
  - shadcn/ui implementation
---

# PortfolioGenie

PortfolioGenie is a premium AI-powered SaaS for developers.

Its purpose is to help developers build professional portfolios, resumes,
cover letters, and recruiter-ready personal branding by analyzing their GitHub profile.

The application should feel polished enough to launch as a real SaaS.

---

# Primary Goal

Whenever implementing features, prioritize:

- production quality
- scalability
- maintainability
- accessibility
- performance
- clean architecture
- reusable components

Never create prototype-quality code.

Never build temporary implementations unless explicitly requested.

---

# Current Development Phase

Current milestone:

Build the complete marketing website.

Until instructed otherwise, do NOT implement:

- Better Auth
- Convex backend
- AI generation
- Billing
- Dashboard logic

Focus only on creating a production-ready marketing experience.

---

# UI Development Workflow

Before creating any UI:

## Step 1

Check whether shadcn/ui already provides the component.

If it exists:

Use it.

Do not recreate it.

## Step 2

If the component is missing:

Install it using the project's package manager.

## Step 3

Compose interfaces from existing shadcn components.

Avoid custom implementations whenever possible.

## Step 4

Only build custom components if shadcn/ui cannot provide the required functionality.

## Step 5

Extract reusable components.

Never duplicate layouts or UI logic.

---

# Design Principles

The application should resemble premium developer SaaS products.

Design inspiration:

- Vercel
- Linear
- Stripe
- Clerk
- Notion
- Raycast

Prioritize

- whitespace
- typography
- hierarchy
- accessibility
- responsive layouts
- subtle animations
- fast loading

Avoid

- giant gradients
- dashboard card overload
- unnecessary decorations
- excessive shadows
- oversized icons

---

# Component Rules

Always prefer

- shadcn/ui
- Radix UI
- Tailwind CSS
- Better Icons

Build using

- reusable components
- composition
- feature-based architecture

Avoid

- duplicated components
- inline styles
- deeply nested JSX
- unnecessary wrappers

---

# Engineering Principles

Write code that is

- strongly typed
- modular
- reusable
- testable
- readable

Prefer

Server Components.

Use Client Components only when interactivity requires them.

Always consider

- bundle size
- Core Web Vitals
- accessibility
- SEO

---

# Landing Page Requirements

The marketing website should include

- Navigation
- Hero
- Social Proof
- Features
- AI Features
- Portfolio Showcase
- Templates
- Pricing
- FAQ
- CTA
- Footer

The landing page should feel production-ready.

Not like a generated template.

---

# SaaS Requirements

Design every feature with SaaS scalability in mind.

Assume the application supports

- subscriptions
- pricing plans
- organizations
- feature gating
- billing
- AI usage tracking
- analytics
- user roles

Even if these features are not yet implemented,
their architecture should be considered.

---

# Feature Architecture

Follow feature-based organization.

Each feature should own

- components
- hooks
- types
- validation
- server logic

Avoid placing unrelated files together.

---

# References

Read additional documentation only when needed.

## Branding

references/branding.md

Contains

- product identity
- design philosophy
- visual language

---

## Design System

references/design-system.md

Contains

- spacing
- typography
- color system
- accessibility
- shadcn conventions

---

## Architecture

references/architecture.md

Contains

- folder structure
- feature architecture
- coding conventions

---

## Dashboard

references/dashboard.md

Contains

- layouts
- navigation
- UX
- page organization

---

## AI

references/ai-features.md

Contains

- AI generators
- streaming
- structured output
- AI UX

---

## Pricing

references/pricing.md

Contains

- pricing plans
- feature gating
- AI credits
- subscriptions

---

# Working Style

Whenever implementing features

Think like a senior frontend engineer building a real SaaS.

Do not simply satisfy the prompt.

Improve the architecture when appropriate.

Prefer long-term maintainability over short-term convenience.

Always leave the codebase cleaner than you found it.
