import { ContactSupportDialog } from "@/features/contact/support/contact-support-dialog";
import { LogoSvg } from "@/components/svg/logo-svg";
import Link from "next/link";
import { Typography } from "../../components/nowts/typography";
import { buttonVariants } from "../../components/ui/button";

export function Page404() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <LogoSvg size={32} />
      <div className="space-y-3 text-center">
        <Typography variant="code" className="text-orange-500">404</Typography>
        <Typography variant="h1">Page introuvable</Typography>
        <Typography className="text-muted-foreground">
          Désolé, nous n'avons pas trouvé la page que vous cherchez.
        </Typography>
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