"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "../theme/theme-toggle";
import { SiteConfig } from "@/site-config";
import { AuthButtonClient } from "@/features/auth/auth-button-client";


const NAV_LINKS = [
  { label: "Accueil",    href: "/" },
  { label: "Blog",         href: "/posts" },
  { label: "Prestations",      href: "/prestations" },
  { label: "Team",      href: "/team" },
  { label: "Avant/Après",      href: "/avant-apres" },
  { label: "Contact",       href: "/contact" },
] as const;

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function useBoundedScroll(threshold: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    const onChange = (current: number) => {
      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;
      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    };
    const deleteEvent = scrollY.on("change", onChange);
    const listener = () => onChange(window.scrollY);
    window.addEventListener("scroll", listener);
    return () => {
      deleteEvent();
      window.removeEventListener("scroll", listener);
    };
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export function LandingHeader() {
  const { scrollYBoundedProgress } = useBoundedScroll(400);
  const router = useRouter();

  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  return (
    <motion.header
      style={{
        height: useTransform(
          scrollYBoundedProgressDelayed,
          [0, 1],
          [72, 52]
        ),
      }}
      className="fixed inset-x-0 top-0 z-50 flex w-full
           border-b border-border bg-background/80
           shadow-sm backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-8xl items-center
                      justify-between px-6 lg:px-8">

        {/* ── Logo ── */}
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => router.push("/")}
        >
          <Image
            src={SiteConfig.appIcon}
            alt="mon agent ia app logo"
            width={24}
            height={24}
          />
          <motion.p
            style={{
              scale: useTransform(
                scrollYBoundedProgressDelayed,
                [0, 1],
                [1, 0.9]
              ),
            }}
            className="origin-left text-lg font-bold tracking-tight
                       text-foreground"
          >
            Unlcoaching
          </motion.p>
        </div>

        {/* ── Nav desktop — pill ── */}
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0]
            ),
          }}
          className="hidden items-center gap-1 rounded-md border
                     border-border bg-muted/50 px-2 py-1.5
                     text-sm font-medium backdrop-blur-sm lg:flex"
        >
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
        </motion.nav>

        {/* ── Actions droite ── */}
        <motion.div
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0]
            ),
          }}
          className="hidden items-center gap-3 lg:flex"
        >
          <AuthButtonClient />
          {/* <Link
            href="#audit-form"
            className="rounded-md bg-orange-500 border border-border px-4 py-2
            text-sm font-medium text-white transition-all
            hover:border-foreground/40 hover:text-foreground"
          >
            Prendre RDV
          </Link> */}
          <ThemeToggle />
        </motion.div>

        {/* ── Mobile — Sheet shadcn ── */}
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Ouvrir le menu"
              className="rounded-md p-2 muted-foreground transition-colors
                         hover:bg-muted hover:text-foreground"
            >
              <Menu size={22} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex flex-col gap-4 border-border
                         bg-background p-6"
            >
              {/* Header drawer */}
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => router.push("/")}
              >
                <Image
                  src={SiteConfig.appIcon}
                  alt="lemurian app logo"
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="text-base font-bold text-foreground">
                  Lemurian Agency
                </span>
                <ThemeToggle />
              </div>

              <hr className="border-white/10" />

              {/* Liens */}
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

              <hr className="border-white/10" />

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <AuthButtonClient />
                {/* <Link
                  href="#audit-form"
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
    </motion.header>
  );
}