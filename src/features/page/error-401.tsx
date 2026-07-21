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

type Error401Props = PropsWithChildren<{
  title?: string;
}>;

export function Error401(props: Error401Props) {
  return (
    <Card className="w-full max-w-lg border-orange-500/30">
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