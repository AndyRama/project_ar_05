import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SERVICES = [
  // { title: "Hostinger",  description: "Hébergement du site",                        link: "https://hostinger.fr/" },
	{ title: "Github",     description: "Dépôt du code source de l'application",      link: "https://github.com/" },
  { title: "Gmail",      description: "Adresse: unlcoachingpersonel@gmail.com",     link: "https://mail.google.com/" },
  { title: "Namecheap",  description: "Gestion du nom de domaine",                  link: "https://www.namecheap.com/" },
  { title: "NeonDb",     description: "Base de données de l'application",           link: "https://neon.tech/" },
  { title: "Resend",     description: "Emailing pour l'application",                link: "https://resend.com/" },
  { title: "Stripe",     description: "Paiement en ligne",                          link: "https://stripe.com/" },
  { title: "Wisewand",   description: "Création d'articles optimisés SEO",          link: "https://wisewand.ai/?fpr=andy78" },
];

export default async function ServicesPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Gestion des services</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <Card key={service.title} className="p-4">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="mt-2 w-fit rounded-[10px] hover:border hover:border-orange-600 hover:text-orange-600"
                >
                  <Link href={service.link} target="_blank" rel="noopener noreferrer">
                    Ouvrir {service.title}
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
}