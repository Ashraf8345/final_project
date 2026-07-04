# Devora — Development Roadmap

> Product feature definitions live in **docs/PRODUCT_SPEC.md**.
> Engineering rules and coding standards live in **AGENTS.md**.
> This roadmap describes what gets built and in what order.

---

# Status Legend

| Symbol | Meaning     |
| ------ | ----------- |
| ✅     | Completed   |
| 🚧     | In Progress |
| ⏳     | Not Started |
| ⛔     | Blocked     |

---

# Vision

Devora is a premium AI-powered SaaS that enables developers to transform their GitHub profile into a professional portfolio, resume, and personal brand.

The MVP focuses on helping developers launch a recruiter-ready portfolio in minutes.

Future versions will expand Devora into an AI-powered career platform for software engineers.

---

# Development Principles

Every phase must:

- Build upon previous phases.
- Produce reusable components.
- Follow AGENTS.md.
- Follow installed Skills automatically.
- Pass TypeScript.
- Pass ESLint.
- Meet WCAG AA accessibility.
- Be mobile-first.
- Be production-ready before moving forward.

---

# Core User Journey

1. Discover Devora.
2. Sign in.
3. Connect GitHub.
4. Import repositories.
5. AI analyzes profile.
6. Generate portfolio.
7. Customize portfolio.
8. Publish portfolio.
9. Generate resume.
10. Generate cover letter.
11. Track portfolio analytics.

Every implemented feature should improve one or more steps in this journey.

---

# Milestones

## 🚀 Milestone 1

Marketing Website

Phases 0 → 5

---

## 🚀 Milestone 2

Core SaaS

Phases 6 → 16

---

## 🚀 Milestone 3

Production Launch

Phases 17 → 18

---

# Development Phases

---

# Phase 0 — Foundation

**Status:** ✅

## Goal

Bootstrap the project.

## Deliverables

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Convex
- Better Auth
- Project Skills
- AGENTS.md
- Project configuration

## Exit Criteria

- Project builds successfully.
- TypeScript passes.
- ESLint passes.

---

# Phase 1 — Design System

**Status:** ✅

## Goal

Build the reusable design system.

## Deliverables

- Layout primitives
- Typography scale
- Color system
- Spacing system
- Shared UI components
- Theme support

## Exit Criteria

Reusable design system completed.

---

# Phase 2 — Navigation

**Status:** ✅

## Goal

Build responsive navigation.

## Deliverables

- Navbar
- Mobile navigation
- Footer
- Navigation links
- CTA buttons

## Exit Criteria

Responsive navigation across all breakpoints.

---

# Phase 3 — Hero

**Status:** ✅

## Goal

Create a premium hero experience.

## Deliverables

- Hero
- GitHub preview
- CTA
- Background effects
- Announcement banner

## Exit Criteria

Production-quality hero section.

---

# Phase 4 — Landing Page

**Status:** ✅

## Goal

Complete the marketing website.

## Deliverables

- How It Works
- Features
- AI Showcase
- Portfolio Templates
- Pricing
- FAQ
- CTA
- Footer polish

## Exit Criteria

Landing page complete.

---

# Phase 5 — SEO & Performance

**Status:** ⏳

## Goal

Optimize the marketing website.

## Deliverables

SEO

- Metadata
- Open Graph
- Twitter Cards
- robots.txt
- sitemap.xml
- Structured Data

Performance

- Image optimization
- Font optimization
- Lazy loading
- Bundle optimization
- Accessibility audit
- Lighthouse audit

## Exit Criteria

- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 90
- Lighthouse SEO ≥ 90

---

# 🚀 MVP Marketing Website Complete

The public marketing website is considered complete after Phase 5.

No further visual redesigns should be introduced unless fixing bugs or improving accessibility.

---

# Phase 6 — Authentication

**Status:** ⏳

## Goal

Implement secure authentication.

## Deliverables

- Better Auth
- GitHub
- Google
- Email
- Sessions
- Protected routes

## Exit Criteria

Users can securely authenticate.

---

# Phase 7 — Dashboard Foundation

**Status:** ⏳

## Goal

Build the authenticated application shell.

## Deliverables

- Sidebar
- Dashboard layout
- Navigation
- User menu
- Settings
- Empty states

## Exit Criteria

Dashboard shell complete.

---

# Phase 8 — GitHub Integration

**Status:** ⏳

## Goal

Import GitHub data.

## Deliverables

- OAuth connection
- Repository import
- Repository synchronization
- Language detection
- Featured repositories

## Exit Criteria

GitHub import works reliably.

---

# Phase 9 — AI Analysis Engine

**Status:** ⏳

## Goal

Generate structured developer insights.

## Deliverables

- Repository analysis
- Skill detection
- Tech stack detection
- Career summary
- Recommendations

## Exit Criteria

AI produces recruiter-ready outputs.

---

# Phase 10 — Portfolio Builder

**Status:** ⏳

## Goal

Generate customizable portfolios.

## Deliverables

- Portfolio generation
- Live preview
- Theme customization
- Editing
- Drafts
- Version history

## Exit Criteria

Users can build and publish portfolios.

---

# Phase 11 — Resume Builder

**Status:** ⏳

## Goal

Generate resumes.

## Deliverables

- AI resume
- ATS optimization
- PDF export
- DOCX export

## Exit Criteria

Resume generation complete.

---

# Phase 12 — Cover Letter Builder

**Status:** ⏳

## Goal

Generate personalized cover letters.

## Deliverables

- Job description analysis
- AI cover letters
- Export

## Exit Criteria

Cover letter generation complete.

---

# Phase 13 — Portfolio Templates

**Status:** ⏳

## Goal

Ship premium templates.

## Deliverables

- Five production templates
- Theme switching
- Responsive support

## Exit Criteria

Templates complete.

---

# Phase 14 — Portfolio Publishing

**Status:** ⏳

## Goal

Publish portfolios.

## Deliverables

- Drafts
- Publishing
- Portfolio URLs
- Custom domains
- SSL

## Exit Criteria

Users can publish portfolios.

---

# Phase 15 — Analytics

**Status:** ⏳

## Goal

Portfolio analytics.

## Deliverables

- Views
- Visitors
- Downloads
- Devices
- Countries
- Referrers

## Exit Criteria

Analytics dashboard complete.

---

# Phase 16 — Billing

**Status:** ⏳

## Goal

Subscription management.

## Deliverables

- Stripe
- Plans
- Feature gating
- Billing portal
- AI credits

## Exit Criteria

Subscriptions fully operational.

---

# 🚀 MVP Application Complete

The MVP SaaS is feature complete after Phase 16.

Future product expansion belongs in PRODUCT_SPEC.md.

---

# Phase 17 — Deployment

**Status:** ⏳

## Goal

Deploy production infrastructure.

## Deliverables

- Production deployment
- Environment variables
- Monitoring
- Logging
- Error tracking

## Exit Criteria

Application deployed successfully.

---

# Phase 18 — Final Polish

**Status:** ⏳

## Goal

Prepare for public launch.

## Deliverables

- Accessibility audit
- Performance audit
- Responsive audit
- QA
- Documentation

## Exit Criteria

Ready for launch.

---

# 🚀 Public Launch

Devora is publicly available.

---

# Definition of Done

The project is complete only when:

- Every phase is completed.
- Production deployed.
- TypeScript has zero errors.
- ESLint has zero errors.
- No duplicated code.
- Fully responsive.
- WCAG AA compliant.
- Core Web Vitals optimized.
- Feature gating works correctly.
- Ready for public launch.
