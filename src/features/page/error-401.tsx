import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoSvg } from "@/components/svg/logo-subscribe";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Typography } from "../../components/nowts/typography";
import { ContactSupportDialog } from "../contact/support/contact-support-dialog";
import { Home } from "lucide-react";

type Error401Props = PropsWithChildren<{
  title?: string;
}>;

export function Error401(props: Error401Props) {
  return (
    <Card className="relative mx-auto h-auto w-full max-w-md lg:max-w-lg lg:p-6 border-orange-500/30">
      <Link
        href="/"
        aria-label="Retour à l'accueil"
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Home className="size-5" />
      </Link>
      <CardHeader className="flex flex-col items-start gap-3">
        <LogoSvg size={32} />
        <Typography variant="code" className="text-orange-500">401</Typography>
        <CardTitle>{props.title ?? "Accès non autorisé"}</CardTitle>
        <CardDescription>
          Vous n'avez pas la permission d'accéder à cette ressource. Merci de
          vous connecter ou de contacter votre coach si vous pensez qu'il
          s'agit d'une erreur.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row gap-2">
        <ContactSupportDialog />
        <Button asChild className="bg-orange-500 text-white hover:bg-orange-400">
          <Link href="/auth/signin">Se connecter</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}