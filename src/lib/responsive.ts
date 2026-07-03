export const maxWidthClassNames = {
  prose: "max-w-2xl",
  content: "max-w-3xl",
  section: "max-w-5xl",
  page: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const

export const sectionSpacingClassNames = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-24 lg:py-28",
  xl: "py-24 sm:py-28 lg:py-32",
} as const

export const gapClassNames = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
  '2xl': "gap-12",
} as const

export const responsive = {
  gutters: "px-4 sm:px-6 lg:px-8",
  guttersTight: "px-4 sm:px-5 lg:px-6",
  surfacePadding: "p-4 sm:p-6",
  displayWidth: maxWidthClassNames.content,
  sectionWidth: maxWidthClassNames.section,
  pageWidth: maxWidthClassNames.page,
  wideWidth: maxWidthClassNames.wide,
  sectionSpacing: sectionSpacingClassNames.lg,
} as const
