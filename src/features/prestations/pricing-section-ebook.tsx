"use client";

import { useState } from "react";
import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from "@/features/landing/section-layout";
import { PricingCard, type PricingCardProps } from "./pricing-card-ebook";

export type PricingProps = {
  cards: PricingCardProps[];
};

export const PricingEbook = (props: PricingProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleCards, setVisibleCards] = useState(3);

  // const showMoreCards = () => {
  //   setVisibleCards(visibleCards + 3);
  // };

  return (
    <SectionLayout
      size="lg"
      id="E-Books"
      className="flex w-full flex-col flex-wrap items-center gap-16"
    >
      <div className="space-y-2 text-center">
        <Typography
          variant="small"
          className="font-extrabold uppercase text-primary"
        >
          Autres contenus
        </Typography>
        <Typography variant="h2">Les E-Books</Typography>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {props.cards.slice(0, visibleCards).map((card, i) => (
          <PricingCard key={i} {...card} />
        ))}
      </div>
      
      {/* {visibleCards < props.cards.length && (
        <button
          onClick={showMoreCards}
          className="right-0 mt-4 rounded-[10px] bg-primary bg-gradient-to-r from-orange-400 to-orange-700 px-4 py-2 text-black hover:bg-transparent hover:text-white"
        >
          voir plus de contenue
        </button>
      )} */}
    </SectionLayout>
  );
};
