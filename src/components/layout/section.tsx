import * as React from "react"

import { Container } from "@/components/layout/container"
import { sectionSpacingClassNames } from "@/lib/responsive"
import { cn } from "@/lib/utils"

type SectionSpacing = keyof typeof sectionSpacingClassNames

type SectionTone = "default" | "muted" | "accent"

const toneClassNames: Record<SectionTone, string> = {
  default: "bg-transparent",
  muted: "bg-muted/35",
  accent: "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--accent),transparent_70%),transparent)]",
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  container?: boolean
  containerClassName?: string
  containerSize?: React.ComponentProps<typeof Container>["size"]
  spacing?: SectionSpacing
  tone?: SectionTone
}

export function Section({
  as,
  children,
  className,
  container = true,
  containerClassName,
  containerSize = "page",
  spacing = "lg",
  tone = "default",
  ...props
}: SectionProps) {
  const Component = as ?? "section"
  const content = container ? (
    <Container size={containerSize} className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  )

  return (
    <Component
      data-slot="section"
      className={cn(sectionSpacingClassNames[spacing], toneClassNames[tone], className)}
      {...props}
    >
      {content}
    </Component>
  )
}
