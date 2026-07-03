import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { bodyClassNames, headingClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

type HeaderAlign = "left" | "center"

const alignClassNames: Record<HeaderAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
  align?: HeaderAlign
  actions?: React.ReactNode
}

export function SectionHeader({
  actions,
  align = "left",
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex flex-col gap-4", alignClassNames[align], className)}
      {...props}
    >
      {eyebrow ? <Badge variant="outline">{eyebrow}</Badge> : null}
      <div className="max-w-2xl space-y-3">
        <h2 className={headingClassNames.h2}>{title}</h2>
        {description ? (
          <p className={cn(bodyClassNames.lead, "max-w-xl")}>{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  )
}
