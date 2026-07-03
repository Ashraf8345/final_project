import * as React from "react"

import { SkeletonGrid, SkeletonLines } from "@/components/states/skeletons"
import { cn } from "@/lib/utils"

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  compact?: boolean
}

export function LoadingState({
  className,
  compact = false,
  description = "Preparing the next view.",
  title = "Loading",
  ...props
}: LoadingStateProps) {
  return (
    <div
      data-slot="loading-state"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "space-y-6 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="max-w-md space-y-3">
        <p className="font-heading text-xl font-semibold text-foreground">{title}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        <SkeletonLines lines={compact ? 2 : 3} />
      </div>
      {!compact ? <SkeletonGrid count={3} /> : null}
    </div>
  )
}
