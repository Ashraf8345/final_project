import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { bodyClassNames, headingClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string
  title: string
  description: string
  actions?: React.ReactNode
  meta?: React.ReactNode
}

export function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  meta,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="max-w-3xl space-y-4">
        {eyebrow ? <Badge variant="outline">{eyebrow}</Badge> : null}
        <h1 className={headingClassNames.h1}>{title}</h1>
        <p className={cn(bodyClassNames.lead, "max-w-2xl")}>{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      {meta ? <div className={bodyClassNames.subtle}>{meta}</div> : null}
    </header>
  )
}
