export function BackgroundDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Primary radial glow — centered behind the hero content */}
      <div
        className="absolute top-1/4 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--accent), transparent 40%), transparent 70%)",
        }}
      />

      {/* Secondary glow — offset to the right to complement the GitHub preview */}
      <div
        className="absolute top-1/3 right-0 hidden h-[400px] w-[500px] translate-x-1/4 rounded-full opacity-20 blur-3xl lg:block"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--ring), transparent 50%), transparent 70%)",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  )
}
