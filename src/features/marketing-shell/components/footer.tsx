import type { Route } from "next"
import Link from "next/link"

import { footerGroups, footerLegalLinks, footerSocialLinks } from "@/config/footer"
import { siteLogo } from "@/config/navigation"
import { Logo } from "@/components/brand/logo"
import { Container } from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { bodyClassNames, utilityClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <Container size="wide" className="space-y-10 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="max-w-sm space-y-5">
            <Logo href={siteLogo.href} withTagline />
            <p className={bodyClassNames.base}>
              Build a portfolio, resume, and developer brand system from the work you already ship.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h2 className={cn(utilityClassNames.eyebrow, "text-foreground")}>{group.title}</h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href as Route} className={cn(bodyClassNames.subtle, utilityClassNames.link)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-4">
              <h2 className={cn(utilityClassNames.eyebrow, "text-foreground")}>Legal</h2>
              <ul className="space-y-3">
                {footerLegalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href as Route} className={cn(bodyClassNames.subtle, utilityClassNames.link)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {footerSocialLinks.length > 0 ? (
                <div className="space-y-3 pt-4">
                  <h3 className={cn(utilityClassNames.eyebrow, "text-foreground")}>Social</h3>
                  <ul className="space-y-3">
                    {footerSocialLinks.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href as Route} className={cn(bodyClassNames.subtle, utilityClassNames.link)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PortfolioGenie. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <Link key={link.label} href={link.href as Route} className={utilityClassNames.link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
