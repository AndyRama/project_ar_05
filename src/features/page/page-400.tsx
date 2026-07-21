import { ContactSupportDialog } from "@/features/contact/support/contact-support-dialog";
import { LogoSvg } from "@/components/svg/logo-subscribe";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Typography } from "../../components/nowts/typography";
import { buttonVariants } from "../../components/ui/button";

type Page400Props = PropsWithChildren<{
  title?: string;
}>;

export function Page400(props: Page400Props) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <LogoSvg size={32} />
      <div className="max-w-lg space-y-3 text-center">
        <Typography variant="code" className="text-orange-500">400</Typography>
        <Typography variant="h1">{props.title ?? "Requête invalide"}</Typography>
        {props.children ?? (
          <Typography className="text-muted-foreground">
            Il semblerait que nous rencontrions un problème technique. Pas
            d'inquiétude, notre équipe travaille dessus. En attendant, essayez
            de rafraîchir la page ou revenez un peu plus tard.
          </Typography>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className={buttonVariants({
            className: "bg-orange-500 text-white hover:bg-orange-400",
          })}
        >
          Retour à l'accueil
        </Link>
        <ContactSupportDialog />
      </div>
    </main>
  );
}