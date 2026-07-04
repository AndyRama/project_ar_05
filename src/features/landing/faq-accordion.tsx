"use client";

import { Typography } from "@/components/nowts/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClientMarkdown } from "../markdown/client-markdown";
import Link from "next/link";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  faq: FaqItem[];
};

export const FAQSection = ({ faq }: FaqAccordionProps) => {

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Layout 2 colonnes */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

          {/* ── Colonne gauche : header ── */}
          <div className="lg:w-80 lg:shrink-0">
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-extrabold tracking-widest text-orange-700 uppercase dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
              FAQ
            </span>
            <Typography variant="h2" className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-4xl">
              Questions fréquentes
            </Typography>
            <Typography variant="p" className="mt-4 text-base text-muted-foreground text-pretty">
              Tout ce que vous voulez savoir avant de démarrer.
            </Typography>
            <p className="mt-6 text-sm text-muted-foreground">
              Vous ne trouvez pas votre réponse ?{" "}
              <br/>
              <Link
                href="mailto:lemurian734@gmail.com"
                className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
              >
                Posez-la directement →
              </Link>
            </p>
          </div>

          {/* ── Colonne droite : accordion ── */}
          <div className="flex-1">
            <Accordion type="single" collapsible>
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  data-testid="faq-item"
                >
                  <AccordionTrigger className="cursor-pointer text-left text-sm font-semibold transition-colors hover:text-orange-500 sm:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    <ClientMarkdown>{item.answer}</ClientMarkdown>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
        </div>
      </div>
    </section>
  );
};