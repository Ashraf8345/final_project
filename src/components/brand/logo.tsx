import Link from "next/link"

import { SparkIcon } from "@/components/brand/icons"
import { cn } from "@/lib/utils"

type LogoSize = "sm" | "md" | "lg"

const sizeClassNames: Record<LogoSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

const markClassNames: Record<LogoSize, string> = {
  sm: "size-8 rounded-xl",
  md: "size-10 rounded-2xl",
  lg: "size-12 rounded-2xl",
}

interface LogoProps {
  className?: string
  href?: string
  size?: LogoSize
  withTagline?: boolean
}

export function Logo({
  className,
  href = "/",
  size = "md",
  withTagline = false,
}: LogoProps) {
  const content = (
    <>
      <span
        className={cn(
          "inline-flex items-center justify-center border border-border/70 bg-card text-foreground shadow-sm",
          markClassNames[size]
        )}
      >
        <SparkIcon className="size-4.5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={cn("font-heading font-semibold tracking-tight", sizeClassNames[size])}>
          PortfolioGenie
        </span>
        {withTagline ? (
          <span className="text-xs text-muted-foreground">Developer portfolio infrastructure</span>
        ) : null}
      </span>
    </>
  )

  if (!href) {
    return <div data-slot="logo" className={cn("inline-flex items-center gap-3 text-foreground", className)}>{content}</div>
  }

  return (
    <Link
      href={href}
      data-slot="logo"
      className={cn(
        "inline-flex items-center gap-3 text-foreground transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {content}
    </Link>
  )
}
