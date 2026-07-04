# AGENTS.md

# PortfolioGenie

PortfolioGenie is a production-ready AI-powered SaaS that helps developers build beautiful portfolios, resumes, and personal branding assets from their GitHub profile.

The goal is to build a real SaaS product rather than a demo application.

---

# Tech Stack

Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

Backend

- Convex

Authentication

- Better Auth

AI

- Vercel AI SDK

Deployment

- Vercel

---

# Convex

This project uses Convex.

Before modifying any Convex code, always read

`convex/_generated/ai/guidelines.md`

Those guidelines override any prior knowledge about Convex APIs and patterns.

Always follow the official Convex recommendations.

---

# Skills

This repository contains project and framework skills.

Always use the most relevant installed Skills before implementing features.

Examples include

- portfoliogenie
- shadcn-workflow
- better-auth-best-practices
- better-auth-security-best-practices
- convex
- convex-setup-auth
- vercel-react-best-practices
- web-design-guidelines
- frontend-design
- better-icons

Do not duplicate guidance already provided by those Skills.

---

# Project Goals

Prioritize

- Production quality
- Maintainability
- Scalability
- Accessibility
- Performance
- Type safety
- Clean architecture

Avoid temporary or prototype implementations unless explicitly requested.

---

# Engineering Principles

Write code that is

- Modular
- Reusable
- Strongly typed
- Well documented
- Easy to maintain

Always

- Prefer composition over inheritance
- Prefer reusable components
- Prefer server components when possible
- Minimize client-side JavaScript
- Optimize bundle size
- Keep functions focused

Never

- Duplicate code
- Create unnecessary abstractions
- Ignore TypeScript errors
- Disable lint rules without justification

---

# UI Development

Always use the shadcn-workflow Skill when implementing UI.

Workflow

1. Check if shadcn/ui already provides the component.
2. Install missing shadcn components.
3. Compose interfaces using shadcn components.
4. Create custom components only when necessary.

Do not recreate components that already exist in shadcn/ui.

---

# Design Principles

The application should feel like a premium developer SaaS.

Design inspiration

- Vercel
- Linear
- Stripe
- Clerk
- Notion
- Raycast

Prioritize

- Excellent typography
- Consistent spacing
- Accessibility
- Responsive layouts
- Clean visual hierarchy
- Subtle animations

Avoid

- Generic AI website layouts
- Oversized gradients
- Excessive shadows
- Unnecessary animations
- Card-heavy interfaces

---

# Accessibility

All interfaces must

- Support keyboard navigation
- Use semantic HTML
- Have visible focus states
- Meet WCAG AA standards
- Respect prefers-reduced-motion

---

# Performance

Optimize for

- Core Web Vitals
- Fast initial load
- Code splitting
- Lazy loading
- Image optimization
- Minimal client bundles

Avoid unnecessary dependencies.

---

# Architecture

Follow a feature-based architecture.

Each feature owns

- Components
- Hooks
- Types
- Validation
- Server logic

Shared code should only exist when it is genuinely shared.

---

# Current Development Phase

Current milestone

Build the complete marketing website.

Implement

- Navbar
- Hero
- Features
- AI Features
- Portfolio Showcase
- Templates
- Pricing
- FAQ
- CTA
- Footer

Do not implement yet

- Authentication
- Dashboard
- Convex backend
- Billing
- AI generation
- GitHub synchronization

unless explicitly requested.

---

# Code Quality

Every change should

- Pass linting
- Preserve type safety
- Be production ready
- Follow existing conventions
- Reuse existing components whenever possible

Leave the codebase cleaner than you found it.

---

# Pull Request Expectations

Before completing work

- Check for duplicated code.
- Verify responsiveness.
- Verify accessibility.
- Verify TypeScript.
- Verify ESLint.
- Ensure components are reusable.
- Ensure new code follows the project architecture.

Always prefer long-term maintainability over short-term convenience.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
