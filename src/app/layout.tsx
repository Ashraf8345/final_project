import type { Metadata } from "next"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { fontVariables } from "@/lib/fonts"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "PortfolioGenie",
    template: "%s | PortfolioGenie",
  },
  description:
    "PortfolioGenie helps developers turn their GitHub profile into a polished portfolio, resume, and personal brand.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontVariables} h-full scroll-smooth antialiased`}>
      <body className="min-h-full font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
