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

interface ResetPasswordEmailProps {
  name?: string;
  url?: string;
}

export default function ResetPasswordEmail({
  name = "Developer",
  url = "#",
}: ResetPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head />

      <Preview>
        Reset your Devora password and regain access to your account.
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
                warning: "#f59e0b",
              },
            },
          },
        }}
      >
        <Body className="bg-background py-12 font-sans">
          <Container className="mx-auto max-w-[560px] rounded-2xl border border-solid border-border bg-card px-10 py-12">
            <Section className="text-center">
              <Text className="m-0 text-3xl">🔐</Text>

              <Heading className="m-0 mt-3 text-3xl font-bold text-foreground">
                Devora
              </Heading>

              <Text className="mt-2 text-sm text-muted">
                Secure account recovery
              </Text>
            </Section>

            <Section className="mt-10">
              <Heading className="m-0 text-2xl font-semibold text-foreground">
                Reset your password
              </Heading>

              <Text className="mt-6 text-base leading-7 text-muted">
                Hey <strong>{name}</strong> 👋
              </Text>

              <Text className="mt-4 text-base leading-7 text-muted">
                We received a request to reset the password for your Devora
                account.
              </Text>

              <Text className="mt-4 text-base leading-7 text-muted">
                Click the button below to create a new password. If you didn&apos;t
                request this, you can safely ignore this email and your current
                password will remain unchanged.
              </Text>
            </Section>

            <Section className="mt-10 text-center">
              <Button
                href={url}
                className="box-border rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white no-underline"
              >
                Reset my password
              </Button>
            </Section>

            <Hr className="my-10 border-none border-t border-solid border-border" />

            <Section>
              <Text className="mt-4 text-sm leading-7 text-muted">
                If you didn&apos;t request a password reset, you don&apos;t need to do
                anything. Your password has not been changed.
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
