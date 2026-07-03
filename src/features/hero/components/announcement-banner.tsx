import type { Route } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

import { ChevronRightIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

interface AnnouncementBannerProps {
  children: ReactNode
  className?: string
  href?: Route
}

export function AnnouncementBanner({
  children,
  className,
  href,
}: AnnouncementBannerProps) {
  const classes = cn(
    "group/announcement inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200",
    href &&
      "hover:border-border hover:bg-muted hover:text-foreground hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  )

  const content = (
    <>
      <span aria-hidden="true">✨</span>

      <span>{children}</span>

      {href && (
        <ChevronRightIcon className="size-3.5 text-muted-foreground/60 transition-all duration-200 group-hover/announcement:translate-x-0.5 group-hover/announcement:text-foreground" />
      )}
    </>
  )

  if (!href) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}