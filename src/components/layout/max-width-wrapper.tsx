import * as React from "react"

import { maxWidthClassNames, responsive } from "@/lib/responsive"
import { cn } from "@/lib/utils"

type MaxWidthSize = keyof typeof maxWidthClassNames

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: MaxWidthSize
  padded?: boolean
}

export function MaxWidthWrapper({
  as,
  className,
  size = "page",
  padded = true,
  ...props
}: MaxWidthWrapperProps) {
  const Component = as ?? "div"

  return (
    <Component
      data-slot="max-width-wrapper"
      className={cn(
        "mx-auto w-full",
        maxWidthClassNames[size],
        padded && responsive.gutters,
        className
      )}
      {...props}
    />
  )
}
