import type { Route } from "next"
import Link from "next/link"

import { marketingNavigationLinks } from "@/config/navigation"
import { NavigationCtas } from "@/features/marketing-shell/components/navigation-ctas"
import { MenuIcon } from "@/components/ui/icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { utilityClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full border-border/70 bg-background/80 backdrop-blur"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-sm border-border/60 bg-background/96 px-6 py-5"
        >
          <SheetHeader className="px-0 pb-6">
            <SheetTitle>Navigate PortfolioGenie</SheetTitle>
            <SheetDescription>
              Explore the product, templates, pricing, and resources.
            </SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col">
            <div className="space-y-2">
              {marketingNavigationLinks.map((item) => (
                <SheetClose key={item.label} asChild>
                  <Link
                    href={item.href as Route}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "w-full justify-start rounded-2xl px-4 text-base",
                      utilityClassNames.link
                    )}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <Separator className="my-6" />
            <NavigationCtas stacked className="mt-auto" />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
