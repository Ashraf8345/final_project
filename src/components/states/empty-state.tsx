import * as React from "react"

import { SparkIcon } from "@/components/brand/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  action?: React.ReactNode
  icon?: React.ReactNode
}

export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <Card className={cn("border border-dashed border-border/80 bg-card/85", className)} {...props}>
      <CardHeader className="space-y-4">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-muted text-foreground">
          {icon ?? <SparkIcon className="size-4.5" />}
        </span>
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      {action ? <CardContent>{action}</CardContent> : null}
    </Card>
  )
}
