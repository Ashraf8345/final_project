import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "react-email";

interface VerifyEmailProps {
  name?: string;
  url?: string;
}

export default function VerifyEmail({
  name = "Developer",
  url = "#",
}: VerifyEmailProps) {
  return (
    <Html lang="en">
      <Head />

      <Preview>
        Verify your email to activate your Devora account and start building
        your portfolio.
      </Preview>

      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                background: "#09090b",
                card: "#18181b",
                foreground: "#fafafa",
                border: "#27272a",
                muted: "#a1a1aa",
                brand: "#3b82f6",
                brandHover: "#2563eb",
              },
            },
          },
        }}
      >
        <Body className="bg-background py-12 font-sans">
          <Container className="mx-auto max-w-[560px] rounded-2xl border border-solid border-border bg-card px-10 py-12">
            <Section className="text-center">
              <Text className="m-0 text-3xl">⚡</Text>

              <Heading className="m-0 mt-3 text-3xl font-bold text-foreground">
                Devora
              </Heading>

              <Text className="mt-2 text-sm text-muted">
                Built for developers.
              </Text>
            </Section>

            <Section className="mt-10">
              <Heading className="m-0 text-2xl font-semibold text-foreground">
                Verify your email
              </Heading>

              <Text className="mt-6 text-base leading-7 text-muted">
                Hey <strong>{name}</strong> 👋
              </Text>

              <Text className="mt-4 text-base leading-7 text-muted">
                Welcome to Devora!
              </Text>

              <Text className="mt-4 text-base leading-7 text-muted">
                You&apos;re one click away from turning your GitHub profile into a
                professional portfolio, resume, and personal brand.
              </Text>

              <Text className="mt-4 text-base leading-7 text-muted">
                Please verify your email to activate your account.
              </Text>
            </Section>

            <Section className="mt-10 text-center">
              <Button
                href={url}
                className="box-border rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white no-underline"
              >
                Verify my email
              </Button>
            </Section>

            <Hr className="my-10 border-none border-t border-solid border-border" />

            <Section>
              <Text className="mt-4 text-sm leading-7 text-muted">
                If you didn&apos;t create a Devora account, you can safely ignore
                this email.
              </Text>
            </Section>

            <Hr className="my-10 border-none border-t border-solid border-border" />

            <Section className="text-center">
              <Text className="mt-2 text-xs text-muted">
                Built with ❤️ for developers.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
