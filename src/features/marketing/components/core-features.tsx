"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Badge } from "@/components/ui/badge"
import {
  GitHubIcon,
  SparklesIcon,
  PaletteIcon,
  GlobeIcon,
  CheckIcon,
} from "@/components/ui/icons"
import { headingClassNames, bodyClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

export function CoreFeatures() {
  const [activeTab, setActiveTab] = React.useState("github")
  const prefersReducedMotion = useReducedMotion()

  const categories = [
    {
      id: "github",
      label: "GitHub Sync",
      icon: <GitHubIcon className="size-4" />,
      title: "Direct GitHub Integration",
      description: "No manual data entry. We parse your public repositories, contributions, pinned projects, and profile details directly from GitHub API.",
      features: [
        "Automatic language analysis",
        "Weekly sync of stars and forks",
        "Visual contribution graph extraction",
      ],
      mock: (
        <div className="flex h-64 items-center justify-center bg-muted/10 rounded-xl border border-border/40 p-6">
          <div className="w-full max-w-sm space-y-4 bg-background border border-border/50 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <GitHubIcon className="size-5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold">yousefdawood7</p>
                <p className="text-[10px] text-muted-foreground">Connected 2 hours ago</p>
              </div>
              <Badge variant="secondary" className="text-[9px] h-4.5 bg-emerald-500/10 text-emerald-500 border-none">
                Active Sync
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Starred Projects</span>
                <span className="font-mono text-foreground font-semibold">2</span>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Repositories Indexed</span>
                <span className="font-mono text-foreground font-semibold">21</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ai",
      label: "AI Optimization",
      icon: <SparklesIcon className="size-4" />,
      title: "Recruiter-Optimized Summaries",
      description: "Our specialized AI reads your project descriptions and codebase tags to compose high-impact summaries that grab a recruiter's attention.",
      features: [
        "Codebase-aware bio writing",
        "Key skills and technologies tags extraction",
        "Grammar & SEO checks built-in",
      ],
      mock: (
        <div className="flex h-64 items-center justify-center bg-muted/10 rounded-xl border border-border/40 p-6">
          <div className="w-full max-w-sm space-y-4 bg-background border border-border/50 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">AI Draft</span>
              <SparklesIcon className="size-4 text-amber-500" />
            </div>
            <div className="p-3 bg-muted/30 border border-border/40 rounded-lg text-xs leading-relaxed text-foreground/90">
              &quot;A passionate software engineer in Egypt building modern user experiences using <span className="font-semibold text-amber-500">React</span> and <span className="font-semibold text-amber-500">Next.js</span>...&quot;
            </div>
            <div className="flex justify-end gap-2">
              <Badge variant="outline" className="text-[9px] h-4">Professional Tone</Badge>
              <Badge variant="outline" className="text-[9px] h-4">SEO Checked</Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "builder",
      label: "Portfolio Builder",
      icon: <PaletteIcon className="size-4" />,
      title: "Fully Customize Layouts",
      description: "Rearrange sections, toggle information, customize accent palettes, and tweak layouts using modular block controls.",
      features: [
        "Curated design systems (Vercel, Linear, Stripe)",
        "Section toggle (experience, education, repositories)",
        "Social links custom arrangement",
      ],
      mock: (
        <div className="flex h-64 items-center justify-center bg-muted/10 rounded-xl border border-border/40 p-6">
          <div className="w-full max-w-sm space-y-4 bg-background border border-border/50 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold">Toggles & Visibility</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border border-border/40 bg-muted/20 rounded-lg text-xs">
                <span>Pinned Repositories</span>
                <span className="text-[10px] text-emerald-500 font-semibold uppercase">Visible</span>
              </div>
              <div className="flex items-center justify-between p-2 border border-border/40 bg-muted/20 rounded-lg text-xs">
                <span>Contribution Heatmap</span>
                <span className="text-[10px] text-emerald-500 font-semibold uppercase">Visible</span>
              </div>
              <div className="flex items-center justify-between p-2 border border-border/40 bg-muted/20 rounded-lg text-xs opacity-50">
                <span>Education Block</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">Hidden</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "deployment",
      label: "Edge Deployment",
      icon: <GlobeIcon className="size-4" />,
      title: "Global CDN & Custom Domain",
      description: "Instantly deploy your web presence to Vercel's global edge network. Fully optimized, secure, and ready to share.",
      features: [
        "Connect your custom domain (`yousefdawood.me`)",
        "Free automatic SSL renewals",
        "99.9% uptime & global edge caching",
      ],
      mock: (
        <div className="flex h-64 items-center justify-center bg-muted/10 rounded-xl border border-border/40 p-6">
          <div className="w-full max-w-sm space-y-4 bg-background border border-border/50 rounded-xl p-5 shadow-sm text-center">
            <div className="mx-auto size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <GlobeIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold">Custom Domain Linked</p>
              <p className="text-[10px] text-muted-foreground">SSL Secure · CNAME Configured</p>
            </div>
            <div className="text-xs font-mono bg-muted px-3 py-1.5 rounded border border-border/40 break-all select-all">
              CNAME: cname.portfoliogenie.com
            </div>
          </div>
        </div>
      ),
    },
  ]

  const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0]

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = React.useState(false)
  const [showRightScroll, setShowRightScroll] = React.useState(false)

  const checkScroll = React.useCallback(() => {
    const element = scrollContainerRef.current
    if (!element) return

    const { scrollLeft, scrollWidth, clientWidth } = element
    setShowLeftScroll(scrollLeft > 2)
    setShowRightScroll(scrollLeft + clientWidth < scrollWidth - 2)
  }, [])

  React.useEffect(() => {
    const element = scrollContainerRef.current
    if (!element) return

    // Run check initially
    checkScroll()

    // Add resize listener
    window.addEventListener("resize", checkScroll)
    return () => {
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll, activeTab]) // Re-run if activeTab changes layout/dimensions

  return (
    <Section id="core-features" spacing="md" tone="default">
      <Container size="wide" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="px-3 py-1 font-mono uppercase tracking-wider text-[10px] border-border/60">
            Features
          </Badge>
          <h2 className={cn(headingClassNames.h1)}>
            Built for modern developers
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            PortfolioGenie integrates all the tools you need to establish a highly professional, lightning-fast digital footprint.
          </p>
        </div>

        <div className="w-full space-y-10">
          {/* Animated Tabs list without ugly borders */}
          <div className="relative flex justify-center max-w-full w-full px-4 sm:px-0">
            {/* Rounded Pill Wrapper with overflow-hidden to clip the fades */}
            <div className="relative flex items-center bg-muted/40 dark:bg-muted/20 rounded-full relative z-0 max-w-full overflow-hidden w-full sm:w-auto">
              {/* Left and Right Edge Fade Indicators (Clipped inside rounded-full) */}
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-muted to-transparent pointer-events-none z-10 block sm:hidden transition-opacity duration-250",
                  showLeftScroll ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                className={cn(
                  "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-muted to-transparent pointer-events-none z-10 block sm:hidden transition-opacity duration-250",
                  showRightScroll ? "opacity-100" : "opacity-0"
                )}
              />

              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-1 p-1 overflow-x-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth w-full"
              >
                {categories.map((cat) => {
                  const isActive = activeTab === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-feature-tab"
                          className="absolute inset-0 bg-background dark:bg-zinc-800 shadow-sm rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                        />
                      )}
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Animated Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 items-center lg:grid-cols-2 mt-0 focus-visible:outline-none min-h-[520px] sm:min-h-[460px] lg:min-h-[270px]"
          >
            {/* Feature Content */}
            <div className="space-y-6">
              <h3 className={cn(headingClassNames.h2)}>{activeCategory.title}</h3>
              <p className={cn(bodyClassNames.base)}>{activeCategory.description}</p>
              <ul className="space-y-3">
                {activeCategory.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <div className="mt-1 size-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <CheckIcon className="size-2.5" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature Interactive Mock */}
            <div>{activeCategory.mock}</div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
