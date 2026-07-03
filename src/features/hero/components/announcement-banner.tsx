import type { Route } from "next"
import Link from "next/link"

import { ChevronRightIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

interface AnnouncementBannerProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export function AnnouncementBanner({ children, className, href }: AnnouncementBannerProps) {
  const sharedClassName = cn(
    "group/announcement inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors",
    href && "hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  )

  const content = (
    <>
      <span className="text-sm">✨</span>
      <span>{children}</span>
      {href ? (
        <ChevronRightIcon className="size-3.5 text-muted-foreground/60 transition-transform group-hover/announcement:translate-x-0.5 group-hover/announcement:text-muted-foreground" />
      ) : null}
    </>
  )

  if (href) {
    return (
      <Link href={href as Route} className={sharedClassName}>
        {content}
      </Link>
    )
  }

  return <span className={sharedClassName}>{content}</span>
}
