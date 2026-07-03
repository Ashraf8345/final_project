import type { Route } from "next"
import Link from "next/link"

import type { NavigationLink as NavigationLinkItem } from "@/config/navigation"
import { cn } from "@/lib/utils"

interface NavigationLinkProps {
  item: NavigationLinkItem
  className?: string
}

export function NavigationLink({ item, className }: NavigationLinkProps) {
  return (
    <Link
      href={item.href as Route}
      className={cn(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {item.label}
    </Link>
  )
}
