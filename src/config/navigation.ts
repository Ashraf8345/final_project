export type AppHref = string

export type NavigationLink = {
  label: string
  href: AppHref
}

export type NavigationCta = NavigationLink

export const siteLogo = {
  label: "PortfolioGenie",
  href: "/",
} as const

export const marketingNavigationLinks: readonly NavigationLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/#templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
]

export const marketingNavigationCtas: Readonly<Record<"primary" | "secondary", NavigationCta>> = {
  primary: { label: "Get Started Free", href: "/signup" },
  secondary: { label: "Sign In", href: "/login" },
}
