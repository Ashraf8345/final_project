import type { AppHref } from "@/config/navigation"

export type FooterLink = {
  label: string
  href: AppHref
}

export type FooterGroup = {
  title: string
  links: readonly FooterLink[]
}

export const footerGroups: readonly FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Templates", href: "/templates" },
      { label: "Pricing", href: "/pricing" },
      { label: "AI Portfolio Builder", href: "/features/portfolio-builder" },
      { label: "Resume Builder", href: "/features/resume-builder" },
      { label: "Cover Letter Generator", href: "/features/cover-letter" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

export const footerLegalLinks: readonly FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
]

export const footerSocialLinks: readonly FooterLink[] = []
