"use client"

import { motion, useReducedMotion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  const prefersReducedMotion = useReducedMotion()

  const cardVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <motion.div
      aria-hidden="true"
      className="relative w-full max-w-md select-none rounded-2xl border border-border/60 bg-card/80 shadow-xl shadow-black/[0.03] backdrop-blur-sm dark:shadow-black/[0.12]"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
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
            <AvatarImage
              src={profile.avatarUrl}
              alt={`${profile.displayName}'s avatar`}
            />
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
    </motion.div>
  )
}
