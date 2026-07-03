import type { Route } from "next"
import Link from "next/link"

import { marketingNavigationCtas } from "@/config/navigation"
import { ArrowUpRightIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationCtasProps {
  className?: string
  stacked?: boolean
}

export function NavigationCtas({ className, stacked = false }: NavigationCtasProps) {
  return (
    <div className={cn("flex items-center gap-3", stacked && "flex-col items-stretch", className)}>
      <Button
        render={<Link href={marketingNavigationCtas.secondary.href as Route} />}
        variant="ghost"
        size="lg"
        className={cn(stacked && "w-full justify-center")}
      >
        {marketingNavigationCtas.secondary.label}
      </Button>
      <Button
        render={<Link href={marketingNavigationCtas.primary.href as Route} />}
        variant="brand"
        size="lg"
        className={cn(stacked && "w-full justify-center")}
      >
        {marketingNavigationCtas.primary.label}
        <ArrowUpRightIcon className="size-4" />
      </Button>
    </div>
  )
}
