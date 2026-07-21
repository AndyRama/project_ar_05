import { buttonVariants } from "@/components/ui/button";
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

type Page400Props = PropsWithChildren<{
  title?: string;
}>;

export function Error400(props: Page400Props) {
  return (
    <Card className="w-full border-orange-500/30">
      <CardHeader className="flex flex-col items-start gap-3">
        <LogoSvg size={32} />
        <Typography variant="code" className="text-orange-500">400</Typography>
        <CardTitle>{props.title ?? "Requête invalide"}</CardTitle>
        <CardDescription>
          Il semblerait que nous rencontrions un problème technique. Pas
          d'inquiétude, notre équipe travaille dessus. En attendant, essayez
          de rafraîchir la page ou revenez un peu plus tard.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row gap-2">
        <Link
          href="/"
          className={buttonVariants({
            className: "bg-orange-500 text-white hover:bg-orange-400",
          })}
        >
          Retour à l'accueil
        </Link>
        <ContactSupportDialog />
      </CardFooter>
    </Card>
  );
}