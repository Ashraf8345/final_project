---
name: shadcn-workflow
description: |
  Use this skill whenever creating or modifying UI in this project.

  Applies to:

  - Landing pages
  - Dashboards
  - Forms
  - Navigation
  - Pricing pages
  - Marketing websites
  - Authentication screens
  - SaaS interfaces

  This skill ensures every interface is built using
  shadcn/ui first before creating custom components.
---

# Shadcn UI Workflow

This project follows a strict component-first workflow.

Never immediately write custom UI.

Instead follow the workflow below.

---

# Component Workflow

## Step 1

Identify every UI element required.

Examples

- Button
- Card
- Dialog
- Sheet
- Navigation Menu
- Dropdown Menu
- Badge
- Avatar
- Input
- Select
- Tabs
- Table
- Skeleton
- Accordion

---

## Step 2

Check if shadcn/ui already provides it.

If it exists

Use it.

Never recreate an existing component.

---

## Step 3

If the component does not exist

Install it.

Example

pnpm dlx shadcn@latest add button

Use the project's package manager.

---

## Step 4

Compose larger interfaces from shadcn primitives.

Prefer composition over creating large monolithic components.

---

## Step 5

Extract reusable project components.

Examples

HeroSection

PricingCard

DashboardSidebar

FeatureCard

PortfolioCard

These components should internally compose shadcn components.

---

## Step 6

Only create custom primitives when shadcn cannot solve the problem.

---

# Design Rules

Always

- Mobile first
- Accessible
- Responsive
- Keyboard navigable
- Semantic HTML

Never

- Recreate Button
- Recreate Card
- Recreate Input
- Recreate Dialog
- Hardcode colors
- Use inline styles

---

# Styling

Use

- Tailwind CSS
- class-variance-authority
- tailwind-merge

Avoid

Large custom CSS files.

---

# Icons

Always use Better Icons.

Never mix multiple icon systems.

---

# Animations

Read

references/animation-guidelines.md

---

# Layouts

Read

references/layout-patterns.md

---

# Component Organization

Read

references/component-order.md
