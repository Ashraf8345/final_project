import * as React from "react"

import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  size?: React.ComponentProps<typeof Container>["size"]
}

export function PageLayout({ children, className, size = "wide" }: PageLayoutProps) {
  return (
    <Container size={size} className={cn("py-10 sm:py-14 lg:py-16", className)}>
      {children}
    </Container>
  )
}
