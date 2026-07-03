import * as React from "react"

import { gapClassNames } from "@/lib/responsive"
import { cn } from "@/lib/utils"

type StackGap = keyof typeof gapClassNames

type StackAlign = "start" | "center" | "end" | "stretch"

type StackJustify = "start" | "center" | "between"

const alignClassNames: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const justifyClassNames: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  direction?: "vertical" | "horizontal"
  responsive?: boolean
  gap?: StackGap
  align?: StackAlign
  justify?: StackJustify
  wrap?: boolean
}

export function Stack({
  as,
  className,
  direction = "vertical",
  responsive = false,
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  ...props
}: StackProps) {
  const Component = as ?? "div"

  return (
    <Component
      data-slot="stack"
      className={cn(
        "flex",
        direction === "vertical" && "flex-col",
        direction === "horizontal" && (responsive ? "flex-col sm:flex-row" : "flex-row"),
        gapClassNames[gap],
        alignClassNames[align],
        justifyClassNames[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  )
}
