export const headingClassNames = {
  display: "font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl",
  h1: "font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl",
  h2: "font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
  h3: "font-heading text-2xl font-semibold tracking-tight sm:text-3xl",
  h4: "font-heading text-xl font-semibold tracking-tight sm:text-2xl",
} as const

export const bodyClassNames = {
  lead: "text-lg leading-8 text-balance text-muted-foreground sm:text-xl",
  base: "text-base leading-7 text-muted-foreground",
  subtle: "text-sm leading-6 text-muted-foreground",
  caption: "text-xs leading-5 text-muted-foreground",
} as const

export const utilityClassNames = {
  eyebrow: "font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
  code: "font-mono text-[0.95em] font-medium text-foreground",
  link: "transition-colors hover:text-foreground focus-visible:text-foreground",
} as const
