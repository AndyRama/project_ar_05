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
import Link from "next/link";
import { Home } from "lucide-react";

type Page400Props = PropsWithChildren<{
  title?: string;
}>;

export function Error400(props: Page400Props) {
  return (
    <Card className="border-orange-500/30 relative mx-auto h-auto w-full max-w-md lg:max-w-lg lg:p-6">
      <Link
        href="/"
        aria-label="Retour à l'accueil"
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Home className="size-5" />
      </Link>
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