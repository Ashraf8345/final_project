import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from "react-email";
import * as React from "react";

interface WelcomeEmailProps {
  name?: string;
}

export default function WelcomeEmail({
  name = "Developer",
}: WelcomeEmailProps) {
  const dashboardUrl = "http://localhost:3000/dashboard";

  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                background: "#09090b",
                foreground: "#fafafa",
                card: "#18181b",
                border: "#27272a",
                brand: "#3b82f6",
                brandHover: "#2563eb",
                muted: "#a1a1aa",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>Welcome to Devora!</Preview>
        <Body className="bg-background text-foreground font-sans my-auto mx-auto p-4">
          <Container className="border border-solid border-border rounded-xl bg-card p-8 max-w-xl mx-auto my-10">
            <Section className="mb-8">
              <Heading className="text-2xl font-bold text-center m-0">
                Devora
              </Heading>
            </Section>

            <Heading className="text-xl font-semibold m-0 mb-4">
              Welcome to Devora, {name}! 🎉
            </Heading>

            <Text className="text-base text-muted m-0 mb-4">
              We are thrilled to have you join our developer community. Devora
              is built to help you showcase your skills, projects, and work
              experience effortlessly.
            </Text>

            <Text className="text-base text-muted m-0 mb-6">
              To get started, log in to your dashboard, connect your GitHub
              account, and witness the magic of AI analyzing your repositories
              to build a beautiful, customized developer portfolio and resume in
              seconds.
            </Text>

            <Section className="text-center mb-8">
              <Button
                href={dashboardUrl}
                className="bg-brand text-foreground text-sm font-semibold px-6 py-3 rounded-lg no-underline inline-block box-border"
              >
                Go to Dashboard
              </Button>
            </Section>

            <Text className="text-base text-muted m-0 mb-6">
              Here&apos;s what you can do next:
            </Text>

            <Section className="mb-6 pl-4 border-l-2 border-solid border-border">
              <Text className="text-sm font-semibold text-foreground m-0 mb-1">
                1. Sync GitHub Profile
              </Text>
              <Text className="text-sm text-muted m-0">
                Instantly import your public repositories, contributions, and
                bio.
              </Text>
            </Section>

            <Section className="mb-6 pl-4 border-l-2 border-solid border-border">
              <Text className="text-sm font-semibold text-foreground m-0 mb-1">
                2. Customize Layout & Styling
              </Text>
              <Text className="text-sm text-muted m-0">
                Choose from premium developer themes (Sleek Dark, Minimalist
                Mono, Modern Editorial) and adjust styling dynamically.
              </Text>
            </Section>

            <Section className="mb-8 pl-4 border-l-2 border-solid border-border">
              <Text className="text-sm font-semibold text-foreground m-0 mb-1">
                3. Publish to Custom Domain
              </Text>
              <Text className="text-sm text-muted m-0">
                Deploy your new site with SSL and custom domain mapping at the
                edge.
              </Text>
            </Section>

            <Text className="text-sm text-muted m-0 mb-8">
              If you have any questions or feedback, feel free to reply to this
              email! We are always here to help.
            </Text>

            <Text className="text-xs text-muted/60 border-t border-solid border-border pt-6 m-0">
              The Devora Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
