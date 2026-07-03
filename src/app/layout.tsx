import type { Metadata } from "next"

import { ThemeProvider } from "@/components/providers/theme-provider"

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
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth antialiased">
      <body className="min-h-full font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
