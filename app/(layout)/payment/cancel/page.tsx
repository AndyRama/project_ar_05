import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ContactSupportDialog } from "@/features/contact/support/contact-support-dialog";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import Link from "next/link";

export default function CancelPaymentPage() {
  return (
    <Layout className="flex min-h-[70vh]  flex-col items-center justify-center px-4 py-16">
      <LayoutHeader className="items-center text-center">
        <Badge
          variant="outline"
          className="mb-4 border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300"
        >
          Échec du paiement
        </Badge>
        <LayoutTitle>
          Nous sommes désolés, mais nous n'avons pas pu traiter votre paiement
        </LayoutTitle>
        <LayoutDescription>
          Nous avons rencontré un problème lors du traitement de votre paiement.
          <br />Veuillez vérifier vos informations de paiement et réessayer.<br />
          Si le problème persiste, n'hésitez pas à nous contacter pour obtenir de l'aide
          <br />
          Nous sommes là pour vous aider à résoudre cela en toute fluidité.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex items-center justify-center gap-2 pt-4">
        <Link
          href="/#begin"
          className={buttonVariants({ variant: "invert" })}
          style={{ backgroundColor: "#f97316" }}
        >
          Réessayer
        </Link>
        <ContactSupportDialog />
      </LayoutContent>
    </Layout>
  );
}