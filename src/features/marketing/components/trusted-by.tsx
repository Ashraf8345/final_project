import * as React from "react"
import { Container } from "@/components/layout/container"

export function TrustedBy() {
  return (
    <section className="border-t border-b border-border/40 bg-muted/20 py-8">
      <Container size="wide">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-center text-xs font-medium tracking-wider text-muted-foreground uppercase md:text-left">
            Trusted by developers from forward-thinking companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-45 grayscale transition-all duration-300 hover:opacity-75 hover:grayscale-0 dark:opacity-35 dark:hover:opacity-65">
            {/* Vercel Logo */}
            <svg className="h-5 w-auto fill-foreground" viewBox="0 0 116 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M57.5 0L115 100H0L57.5 0Z" />
            </svg>
            {/* Stripe Logo */}
            <svg className="h-5 w-auto fill-foreground" viewBox="0 0 80 33" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.7 13.1c0-3.3 2.3-5.2 6.1-5.2 3.1 0 5.4.9 6.7 1.6V2.2C52 1.5 49 1 45.8 1 34.9 1 29 7 29 16.7c0 10.4 6 15.6 17 15.6 3.6 0 6.6-.7 8-1.5v-7.1c-1.3.7-3.6 1.4-6.4 1.4-4-.1-6.9-1.9-6.9-12zm-33.1-.3c0-2.3 1.8-3.5 4.8-3.5 2.5 0 4.6.7 5.6 1.2V3.4c-1.2-.5-3.5-.9-5.9-.9-7.9 0-12.2 4.1-12.2 10.5 0 8.7 12 7.1 12 12.1 0 2.4-2.1 3.7-5.3 3.7-3 0-5.4-.9-6.7-1.6v7c1.4.7 4 1.2 7.1 1.2 8.3 0 12.7-4.1 12.7-10.6.1-9.2-12.1-7.4-12.1-12.6zm65 1.1h-4.3c-2.3 0-3.6 1.1-3.6 3.2v14.4h8.3V17.5c.2-2.3-1.1-3.6-3.4-3.6zm-17.7-1.1c.9 0 1.6.1 2 .2V3.8l-8.3 1.8v25.7h8.3V12.8zm17.9-6.1c0-1.8 1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2z" />
            </svg>
            {/* Linear Logo */}
            <svg className="h-5 w-auto fill-foreground" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 88C29 88 12 71 12 50S29 12 50 12s38 17 38 38-17 38-38 38zm18-50H32c-3.3 0-6 2.7-6 6v12c0 3.3 2.7 6 6 6h36c3.3 0 6-2.7 6-6V44c0-3.3-2.7-6-6-6z" />
            </svg>
            {/* Supabase Logo */}
            <svg className="h-5 w-auto fill-foreground" viewBox="0 0 584 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.2 0L5.3 64.9C1.8 69.3 4.9 75.9 10.5 75.9H44.6L20.8 116.5C18.1 121.2 24.3 125.7 28.1 121.2L82.1 53.6C85.5 49.3 82.4 42.9 76.8 42.9H46.2L64.1 3.5C66.1-1 59.8-4.6 56.2 0Z" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  )
}
