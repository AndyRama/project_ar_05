import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { AuthButtonClient } from "@/features/auth/auth-button-client";
import { SiteConfig } from "@/site-config";
// import { ThemeToggle } from "../theme/theme-toggle";

const NAV_LINKS = [
  { label: "Accueil",    href: "/" },
  { label: "Blog",         href: "/posts" },
  { label: "Prestations",      href: "/prestations" },
  { label: "Team",      href: "/team" },
  { label: "Avant/Après",      href: "/avant-apres" },
  // { label: "Contact",       href: "/contact" },
  // { label: "Á Propos",       href: "/about" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center
                       border-b border-border bg-background/80
                       backdrop-blur-md lg:h-[60px]">
      <div className="mx-auto flex w-full max-w-8xl items-center
                      justify-between px-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={SiteConfig.appIcon}
            alt="unlcoaching app logo"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="text-base font-bold text-foreground">
            Unlcoaching
          </span>
        </Link>

        {/* ── Nav desktop — pill ── */}
        <nav className="hidden items-center gap-1 rounded-md border
                        border-border bg-muted/50 px-2 py-1.5 lg:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-1.5 text-sm font-medium
                         text-muted-foreground transition-colors
                         hover:bg-muted hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Actions droite ── */}
        <div className="hidden items-center gap-3 lg:flex">
          <AuthButtonClient />
          {/* <Link
            href="/#audit-form"
            className="rounded-md bg-orange-500 px-4 py-2 text-sm
                       font-semibold text-white transition-all
                       hover:bg-orange-600 hover:shadow-lg
                       hover:shadow-orange-500/30 active:scale-95"
          >
            Prendre RDV
          </Link> */}
          {/* <ThemeToggle /> */}
        </div>

        {/* ── Mobile — Sheet ── */}
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Ouvrir le menu"
              className="rounded-md p-2 text-muted-foreground transition-colors
                         hover:bg-muted hover:text-foreground"
            >
              <Menu size={22} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex flex-col gap-4 border-border
                         bg-background p-6"
            >
              <div className="flex items-left gap-2">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src={SiteConfig.appIcon}
                    alt="Unlcoaching app logo"
                    width={24}
                    height={24}
                    className="rounded-sm"
                    />
                  <span className="text-base font-bold text-foreground">
                    Unlcoaching
                  </span>
                </Link>
                {/* <ThemeToggle /> */}
              </div>

              <hr className="border-border" />

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium
                               text-muted-foreground transition-colors
                               hover:bg-muted hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <hr className="border-border" />

              <div className="flex flex-col gap-2">
                <AuthButtonClient />
                {/* <Link
                  href="/#audit-form"
                  className="block w-full rounded-md bg-orange-500 py-3
                             text-center text-sm font-semibold text-white
                             transition-colors hover:bg-orange-400"
                >
                  Prendre RDV
                </Link> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}