"use client"

import * as React from "react"
import type { Route } from "next"
import Link from "next/link"
import { motion } from "framer-motion"

import { marketingNavigationLinks } from "@/config/navigation"
import { utilityClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

export function DesktopNavigation() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <nav
      className="hidden md:flex"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <ul className="flex gap-1 rounded-full border border-border/60 bg-background/70 p-1 backdrop-blur relative z-0">
        {marketingNavigationLinks.map((item, idx) => (
          <li key={item.label} className="relative">
            {hoveredIndex === idx && (
              <motion.div
                layoutId="navbar-hover-pill"
                className="absolute inset-0 bg-muted/75 dark:bg-muted/50 rounded-full"
                transition={{ type: "spring", bounce: 0.18, duration: 0.35 }}
              />
            )}
            <Link
              href={item.href as Route}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={cn(
                "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                hoveredIndex === idx
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                utilityClassNames.link
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

