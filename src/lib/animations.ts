import type { Transition, Variants } from "framer-motion"

export const motionDurations = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
} as const

export const springTransition = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.9,
} satisfies Transition

export const fadeUpTransition = {
  duration: motionDurations.normal,
  ease: [0.16, 1, 0.3, 1],
} satisfies Transition

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeUpTransition,
  },
} satisfies Variants

export const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
} satisfies Variants
