import Link from "next/link";
import Image from "next/image";
import { ScrollTopButton } from "./footer-scroll-top";
import { Mail, Instagram, Facebook, MapPin, ArrowUpRight } from "lucide-react";
import { SiteConfig } from "@/site-config";

const NAV_COLUMNS = [
  {
    title: "Site Map",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Blog", href: "/posts" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Prestations", href: "/prestations" },
      { label: "Team", href: "/team" },
      { label: "Avant-après", href: "/avant-apres" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "E-books", href: "/prestations" },
      { label: "Packs", href: "/team" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Espace client", href: "/signin" },
      { label: "Contact", href: "/contact" },
      {
        label: "Performance",
        href: "https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fproject-ar-05.vercel.app%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&utm_source=lh-chrome-ext",
        target: "_blank",
      },
      {
        label: "Co² Carbon ",
        href: "https://www.websitecarbon.com/website/project-ar-05.vercel.app/",
        target: "_blank",
      },
    ],
  },
] as const;

const CONTACT = [
  // { icon: Mail, label: "Email", value: "lemurian734@gmail.com", href: "mailto:lemurian734@gmail.com" },
  { icon: Instagram, label: "Instagram", value: "@unlcoaching.school", href: "https://www.instagram.com/unlcoaching.school/" },
  { icon: Facebook, label: "Facebook", value: "Unlcoaching", href: "https://www.facebook.com/Unlcoaching" },
] as const;

export function Footer() {
  return (
    <footer id="footer" className="border-border bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        {/* ── Grille principale ── */}
        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* ── Colonne gauche — brand + contact ── */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={SiteConfig.appIcon}
                alt="lemurian app logo"
                width={24}
                height={24}
              />
              <span className="text-foreground text-lg font-bold">
                Unlcoaching
              </span>
            </Link>

            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Coaching sportif sur mesure pour perdre du poids, retrouver la forme et
              gagner en confiance — un accompagnement humain, des résultats concrets.
            </p>

            {/* Contact */}
            <ul className="flex flex-col gap-3">
              {CONTACT.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="border-border bg-muted/30 flex size-8 shrink-0 items-center justify-center rounded-full border">
                    <Icon size={13} className="text-orange-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-orange-500 text-sm transition-colors"
                    >
                      {value}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonnes droite — nav 4 colonnes ── */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
            {NAV_COLUMNS.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-4">
                <h4 className="text-foreground border-l-2 border-orange-500 pl-3 text-sm font-semibold">
                  {title}
                </h4>
                <nav className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={"target" in link ? link.target : undefined}
                      rel={"target" in link && link.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bannière Zone d'intervention ── */}
        <div className="mt-12">
          <Link
            href="/zone-intervention"
            className="flex items-center justify-between rounded-xl border border-orange-500/20 bg-orange-500/5 px-6 py-4 transition-all hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-orange-500" />
                <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
                  Zone d'intervention
                </span>
              </div>
              <div className="h-4 w-px bg-orange-500/30" />
              <div>
                <p className="text-foreground text-sm font-semibold">
                  Nouvelle-Aquitaine
                </p>
                <p className="text-muted-foreground text-xs">
                  Bordeaux, Mérignac, Pessac, Talence et toute la région
                </p>
              </div>
            </div>
            <ArrowUpRight size={18} className="shrink-0 text-orange-500" />
          </Link>
        </div>

        {/* ── Bas de page ── */}
        <div className="border-border mt-4 flex flex-col items-center justify-end gap-4 border-t pt-2 sm:flex-row">
          <ScrollTopButton />
        </div>
      </div>
    </footer>
  );
}
