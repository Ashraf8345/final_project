import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/brand/logo";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center justify-center mb-8 space-y-2">
        <Logo href="/" />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
          Devora
        </p>
      </div>

      <Card className="border border-border/60 bg-zinc-950/80 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1.5 pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
        {footer && (
          <CardFooter className="flex flex-col space-y-4 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
