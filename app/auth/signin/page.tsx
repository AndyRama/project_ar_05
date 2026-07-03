import { Typography } from "@/components/nowts/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { SocialProviders } from "@/lib/auth";
import { getUser } from "@/lib/auth/auth-user";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { SignInProviders } from "./sign-in-providers";

export const metadata: Metadata = {
  title: `Se connecter | ${SiteConfig.title}`,
  description:
    "Connectez-vous à votre compte pour accéder aux témoignages et gérer votre projets.",
};

export default async function AuthSignInPage() {
  const user = await getUser();
  if (user) {
    redirect("/account");
  }
  const providers = Object.keys(SocialProviders ?? {});
  return (
    <Card className="relative mx-auto h-auto w-full max-w-md lg:max-w-lg lg:p-6">
      <Link
        href="/"
        aria-label="Retour à l'accueil"
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Home className="size-5" />
      </Link>
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <div className="mx-auto mt-4 flex flex-row items-center gap-2">
          <Avatar className="size-8 rounded-md">
            <AvatarImage src={SiteConfig.appIcon} alt="app logo" />
            <AvatarFallback>
              {SiteConfig.title.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Typography variant="large">{SiteConfig.title}</Typography>
        </div>
        <CardDescription className="text-center">
          Veuillez vous connecter à votre compte pour continuer.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <SignInProviders providers={providers} />
      </CardContent>
    </Card>
  );
}