import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GitForkIcon,
  GitHubIcon,
  LinkIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
} from "@/components/ui/icons"
import { heroGitHubProfile } from "@/features/hero/lib/hero-data"
import type { PinnedRepo } from "@/features/hero/lib/hero-data"

/* -------------------------------------------------------------------------- */
/*  Contribution Graph                                                        */
/* -------------------------------------------------------------------------- */

type ContributionLevel = 0 | 1 | 2 | 3 | 4

const levelClassNames: Record<ContributionLevel, string> = {
  0: "bg-muted/60",
  1: "bg-accent/40",
  2: "bg-accent/60",
  3: "bg-accent/80",
  4: "bg-accent",
}

/**
 * Deterministic contribution pattern — generates 52 × 7 cells.
 * Uses a simple hash so the pattern is stable across renders.
 */
function generateContributionPattern(): ContributionLevel[][] {
  const weeks: ContributionLevel[][] = []
  for (let w = 0; w < 52; w++) {
    const week: ContributionLevel[] = []
    for (let d = 0; d < 7; d++) {
      const hash = ((w * 7 + d) * 2654435761) >>> 0
      const level = (hash % 5) as ContributionLevel
      week.push(level)
    }
    weeks.push(week)
  }
  return weeks
}

const contributions = generateContributionPattern()

function ContributionGraph() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">1,247 contributions in the last year</p>
      <div className="flex gap-[3px] overflow-hidden">
        {contributions.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((level, di) => (
              <div
                key={di}
                className={`size-[10px] rounded-[2px] ${levelClassNames[level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Pinned Repo Card                                                          */
/* -------------------------------------------------------------------------- */

function PinnedRepoCard({ repo }: { repo: PinnedRepo }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border/60 bg-card/60 p-3">
      <div className="flex items-center gap-1.5">
        <span className="truncate text-sm font-medium text-foreground">{repo.name}</span>
      </div>
      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {repo.description}
      </p>
      <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
            aria-hidden="true"
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <StarIcon className="size-3" />
          {repo.stars.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <GitForkIcon className="size-3" />
          {repo.forks}
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  GitHub Preview                                                            */
/* -------------------------------------------------------------------------- */

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="font-semibold text-foreground">{value.toLocaleString()}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}

export function GitHubPreview() {
  const profile = heroGitHubProfile

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-md select-none rounded-2xl border border-border/60 bg-card/80 shadow-xl shadow-black/[0.03] backdrop-blur-sm dark:shadow-black/[0.12]"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/40 px-5 py-3">
        <GitHubIcon className="size-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">
          github.com/{profile.username}
        </span>
      </div>

      {/* Profile Section */}
      <div className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <Avatar size="lg" className="size-14 ring-2 ring-border/40">
            <AvatarFallback className="bg-muted text-base font-medium text-muted-foreground">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-heading text-base font-semibold tracking-tight text-foreground">
              {profile.displayName}
            </p>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPinIcon className="size-3.5" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1">
            <LinkIcon className="size-3.5" />
            {profile.website}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <StatItem label="followers" value={profile.followers} />
          <StatItem label="following" value={profile.following} />
          <StatItem label="repos" value={profile.repositories} />
        </div>
      </div>

      {/* Pinned Repos */}
      <div className="space-y-3 border-t border-border/40 p-5">
        <p className="text-xs font-medium text-muted-foreground">Pinned</p>
        <div className="grid gap-2">
          {profile.pinnedRepos.map((repo) => (
            <PinnedRepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="border-t border-border/40 p-5">
        <ContributionGraph />
      </div>

      {/* Generate Action */}
      <div className="border-t border-border/40 p-5">
        <Button variant="brand" size="lg" className="w-full" tabIndex={-1}>
          <SparklesIcon className="size-4" />
          Generate Portfolio
        </Button>
      </div>

      {/* Subtle highlight labels */}
      <div className="absolute -top-3 -right-3 z-10">
        <Badge className="bg-foreground text-background shadow-lg">
          <SparklesIcon className="size-3" />
          AI Ready
        </Badge>
      </div>
    </div>
  )
}
