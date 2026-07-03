import { AnnouncementBanner } from "@/features/hero/components/announcement-banner"
import { HeroActions } from "@/features/hero/components/hero-actions"
import { heroAnnouncement, heroDescription, heroHeadline } from "@/features/hero/lib/hero-data"
import { bodyClassNames, headingClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

export function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
      <AnnouncementBanner href={heroAnnouncement.href}>
        {heroAnnouncement.text}
      </AnnouncementBanner>

      <div className="max-w-2xl space-y-6">
        <h1 className={cn(headingClassNames.display, "max-w-[18ch]")}>
          {heroHeadline}
        </h1>
        <p className={cn(bodyClassNames.lead, "max-w-xl lg:max-w-lg")}>
          {heroDescription}
        </p>
      </div>

      <HeroActions />
    </div>
  )
}
