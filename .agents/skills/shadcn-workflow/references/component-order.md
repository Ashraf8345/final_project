# Component Organization

Build interfaces in this order.

1.

Install all required shadcn components.

2.

Create layout components.

Examples

Navbar

Sidebar

Footer

Container

Section

3.

Create shared UI.

Examples

FeatureCard

PricingCard

StatsCard

PortfolioCard

4.

Build page sections.

Hero

Features

Pricing

FAQ

Testimonials

CTA

Footer

5.

Assemble the page.

Never build everything inside page.tsx.

---

Each component should have one responsibility.

Prefer composition.

Avoid giant files.

If a component exceeds roughly 200 lines,
consider splitting it.
