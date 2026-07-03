import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google"

export const uiFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ui-face",
  fallback: ["Arial", "Helvetica", "sans-serif"],
})

export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
  fallback: ["Arial", "Helvetica", "sans-serif"],
})

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono-face",
  fallback: ["Consolas", "Courier New", "monospace"],
})

export const fontVariables = `${uiFont.variable} ${displayFont.variable} ${monoFont.variable}`
