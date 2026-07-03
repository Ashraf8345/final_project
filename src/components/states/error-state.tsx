import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description: string
  action?: React.ReactNode
}

export function ErrorState({
  action,
  className,
  description,
  title = "Something needs attention",
  ...props
}: ErrorStateProps) {
  return (
    <Card
      role="alert"
      className={cn("border border-destructive/20 bg-destructive/5", className)}
      {...props}
    >
      <CardHeader className="space-y-4">
        <span className="inline-flex h-7 w-fit items-center rounded-full border border-destructive/30 bg-background px-3 text-xs font-medium tracking-[0.14em] text-destructive uppercase">
          Error state
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
