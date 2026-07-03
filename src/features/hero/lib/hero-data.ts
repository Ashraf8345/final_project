import type { NavigationCta } from "@/config/navigation"

export type PinnedRepo = {
  name: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
}

export type GitHubProfileData = {
  username: string
  displayName: string
  initials: string
  bio: string
  location: string
  website: string
  followers: number
  following: number
  repositories: number
  pinnedRepos: readonly PinnedRepo[]
}

export const heroAnnouncement = {
  text: "Introducing AI-powered developer portfolios",
  href: "/#features",
} as const

export const heroHeadline = "Your GitHub profile, transformed into a portfolio that gets you hired" as const

export const heroDescription =
  "PortfolioGenie analyzes your GitHub profile and generates a polished portfolio, resume, and cover letter — optimized for recruiters and ready to share in minutes." as const

export const heroActions: Readonly<Record<"primary" | "secondary", NavigationCta>> = {
  primary: { label: "Get Started", href: "/signup" },
  secondary: { label: "View Demo", href: "/#demo" },
}

export const heroGitHubProfile: GitHubProfileData = {
  username: "sarahdev",
  displayName: "Sarah Chen",
  initials: "SC",
  bio: "Full-stack engineer · Open source contributor · Building developer tools",
  location: "San Francisco, CA",
  website: "sarahchen.dev",
  followers: 1284,
  following: 342,
  repositories: 47,
  pinnedRepos: [
    {
      name: "react-form-engine",
      description: "Type-safe form builder with validation, multi-step wizards, and accessible components",
      language: "TypeScript",
      languageColor: "oklch(0.65 0.12 250)",
      stars: 892,
      forks: 134,
    },
    {
      name: "cli-dashboard",
      description: "Beautiful terminal dashboards with real-time data and interactive widgets",
      language: "Rust",
      languageColor: "oklch(0.62 0.12 30)",
      stars: 2341,
      forks: 187,
    },
    {
      name: "ai-commit-review",
      description: "AI-powered code review bot that catches bugs before they reach production",
      language: "Python",
      languageColor: "oklch(0.68 0.12 80)",
      stars: 456,
      forks: 52,
    },
  ],
}
