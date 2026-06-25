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
    <Layout>
      <LayoutHeader>
        <Badge variant="outline">Échec du paiement</Badge>
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
      <LayoutContent className="flex items-center gap-2">
        <Link href="/" className={buttonVariants({ variant: "invert" })}>
          Accueil
        </Link>
        <ContactSupportDialog />
      </LayoutContent>
    </Layout>
  );
}
