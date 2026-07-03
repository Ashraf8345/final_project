import type { Route } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PlayIcon } from "@/components/ui/icons"
import { heroActions } from "@/features/hero/lib/hero-data"

export function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button asChild variant="brand" size="lg">
        <Link href={heroActions.primary.href as Route}>
          {heroActions.primary.label}
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link href={heroActions.secondary.href as Route}>
          <PlayIcon className="size-4" />
          {heroActions.secondary.label}
        </Link>
      </Button>
    </div>
  )
}
