import * as React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
}

export function SkeletonLines({ className, lines = 3, ...props }: SkeletonLinesProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-4",
            index === lines - 1 ? "w-3/5" : "w-full"
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonStat({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3 rounded-2xl border border-border/70 bg-card p-4", className)} {...props}>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-4 w-28" />
    </div>
  )
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={cn("border border-border/70", className)} {...props}>
      <CardHeader className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-7 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <SkeletonLines />
      </CardContent>
      <CardFooter className="justify-between">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  )
}

interface SkeletonGridProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
}

export function SkeletonGrid({ className, count = 3, ...props }: SkeletonGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-3", className)} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}
