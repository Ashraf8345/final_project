import type { Route } from "next"
import Link from "next/link"

import { marketingNavigationLinks } from "@/config/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { utilityClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

export function DesktopNavigation() {
  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList className="gap-1 rounded-full border border-border/60 bg-background/70 p-1 backdrop-blur">
        {marketingNavigationLinks.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href as Route}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  utilityClassNames.link
                )}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
