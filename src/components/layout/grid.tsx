import * as React from "react"

import { gapClassNames } from "@/lib/responsive"
import { cn } from "@/lib/utils"

type GridColumns = 1 | 2 | 3 | 4

type GridGap = keyof typeof gapClassNames

type GridAlign = "start" | "center" | "stretch"

const columnClassNames: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
}

const alignClassNames: Record<GridAlign, string> = {
  start: "items-start",
  center: "items-center",
  stretch: "items-stretch",
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns
  gap?: GridGap
  align?: GridAlign
}

export function Grid({
  className,
  columns = 3,
  gap = "lg",
  align = "stretch",
  ...props
}: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "grid",
        columnClassNames[columns],
        gapClassNames[gap],
        alignClassNames[align],
        className
      )}
      {...props}
    />
  )
}
