import * as React from "react"

import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  centerContent?: boolean
  size?: React.ComponentProps<typeof MaxWidthWrapper>["size"]
}

export function Container({
  as,
  centerContent = false,
  className,
  size = "page",
  ...props
}: ContainerProps) {
  const Component = as ?? "div"

  return (
    <MaxWidthWrapper
      as={Component}
      data-slot="container"
      size={size}
      className={cn(centerContent && "flex flex-col items-center", className)}
      {...props}
    />
  )
}
