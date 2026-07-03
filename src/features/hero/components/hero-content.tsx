"use client"

import { motion, useReducedMotion } from "framer-motion"

import { AnnouncementBanner } from "@/features/hero/components/announcement-banner"
import { HeroActions } from "@/features/hero/components/hero-actions"
import { heroAnnouncement, heroDescription, heroHeadline } from "@/features/hero/lib/hero-data"
import { bodyClassNames, headingClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export function HeroContent() {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUp}>
        <AnnouncementBanner href={heroAnnouncement.href}>
          {heroAnnouncement.text}
        </AnnouncementBanner>
      </motion.div>

      <div className="max-w-2xl space-y-6">
        <motion.h1 variants={fadeUp} className={cn(headingClassNames.display, "max-w-[18ch]")}>
          {heroHeadline}
        </motion.h1>
        <motion.p variants={fadeUp} className={cn(bodyClassNames.lead, "max-w-xl lg:max-w-lg")}>
          {heroDescription}
        </motion.p>
      </div>

      <motion.div variants={fadeUp}>
        <HeroActions />
      </motion.div>
    </motion.div>
  )
}
