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
  avatarUrl: string
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
  username: "yousefdawood7",
  displayName: "Yousef Dawood",
  initials: "YD",
  avatarUrl: "https://avatars.githubusercontent.com/u/78578298?v=4",
  bio: "React && Next.js",
  location: "Egypt",
  website: "yousefdawood.me",
  followers: 18,
  following: 15,
  repositories: 21,
  pinnedRepos: [
    {
      name: "photoloop",
      description: "A modern platform for sharing photos, loops, and stories with the people who matter most",
      language: "TypeScript",
      languageColor: "oklch(0.65 0.12 250)",
      stars: 2,
      forks: 0,
    },
    {
      name: "Golden-Cart",
      description: "Full-stack e-commerce application built with modern web technologies",
      language: "TypeScript",
      languageColor: "oklch(0.65 0.12 250)",
      stars: 0,
      forks: 0,
    },
    {
      name: "simple-auth-system-demo",
      description: "Authentication system demo with session management and secure login flows",
      language: "TypeScript",
      languageColor: "oklch(0.65 0.12 250)",
      stars: 0,
      forks: 0,
    },
  ],
}
