"use client";

import { siteLogo } from "@/config/navigation"
import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/brand/theme-toggle"
import { Container } from "@/components/layout/container"
import { DesktopNavigation } from "@/features/marketing-shell/components/desktop-navigation"
import { MobileNavigation } from "@/features/marketing-shell/components/mobile-navigation"
import { NavigationCtas } from "@/features/marketing-shell/components/navigation-ctas"
import { UserDropdown } from "@/features/marketing-shell/components/user-dropdown"
import { Authenticated } from "convex/react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <Container
        as="div"
        className="flex min-h-18 items-center justify-between gap-4 py-3"
        size="wide"
      >
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          <Logo href={siteLogo.href} />
          <DesktopNavigation />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <NavigationCtas />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Authenticated>
              <UserDropdown />
            </Authenticated>
          </div>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}
