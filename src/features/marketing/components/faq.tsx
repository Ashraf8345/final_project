import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { headingClassNames, bodyClassNames } from "@/lib/typography"
import { cn } from "@/lib/utils"

interface FaqItem {
  question: string
  answer: string
}

const faqItems: readonly FaqItem[] = [
  {
    question: "How does PortfolioGenie use my GitHub data?",
    answer:
      "We only read your public profile, public repositories, and contribution metadata through the official GitHub API. We never access private repos, private activity, or stored credentials. Your data is used exclusively to generate your portfolio content.",
  },
  {
    question: "Can I use my own custom domain?",
    answer:
      "Yes. On the Pro plan, you can connect any custom domain you own. We handle SSL certificate provisioning, CNAME configuration, and global CDN distribution automatically. Free plans use a portfoliogenie.dev subdomain.",
  },
  {
    question: "What AI model powers the content generation?",
    answer:
      "We use a combination of large language models optimized for technical writing. The AI analyzes your repository languages, README files, and contribution patterns to generate accurate, recruiter-friendly descriptions — not generic filler text.",
  },
  {
    question: "Can I edit the generated content?",
    answer:
      "Absolutely. Every generated section — bio, project descriptions, skills, and summaries — is fully editable. The AI provides a strong starting point, but you have complete control over the final output.",
  },
  {
    question: "How fast are the deployed portfolios?",
    answer:
      "All portfolios are pre-rendered as static HTML and served from a global edge network. Most sites score 95+ on Lighthouse performance audits with sub-second Time to First Byte across all regions.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The free plan includes one portfolio site, three templates, AI-generated bio, and a portfoliogenie.dev subdomain. No credit card required. Upgrade to Pro anytime for custom domains, AI resumes, and unlimited sites.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your Pro or Team subscription at any time from your dashboard. Your portfolio remains live until the end of your billing period, and your data is never deleted without your explicit request.",
  },
  {
    question: "Do you support team accounts?",
    answer:
      "Yes. The Team plan supports up to 25 members with centralized admin controls, bulk portfolio generation, shared branding themes, and SSO authentication. Ideal for bootcamps, cohorts, and engineering teams.",
  },
] as const

export function Faq() {
  return (
    <Section id="faq" spacing="xl" tone="default">
      <Container size="page" className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline" className="px-3 py-1 font-mono uppercase tracking-wider text-[10px] border-border/60">
            FAQ
          </Badge>
          <h2 className={cn(headingClassNames.h1)}>
            Frequently asked questions
          </h2>
          <p className={cn(bodyClassNames.lead)}>
            Everything you need to know about PortfolioGenie. Can&apos;t find the answer? Reach out to our support team.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-0">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/40 last:border-b-0">
                <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-foreground hover:text-foreground/80">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  )
}
