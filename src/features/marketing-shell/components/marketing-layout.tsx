import * as React from "react"

import { Footer } from "@/features/marketing-shell/components/footer"
import { Navbar } from "@/features/marketing-shell/components/navbar"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
