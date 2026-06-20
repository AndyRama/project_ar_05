'use client'

import React from 'react';
import Link from 'next/link';

type PromoBannerProps = {
  onOpenModal?: () => void;
}

export const PromoBanner = ({ onOpenModal }: PromoBannerProps) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 sm:gap-3">
        <span className="hidden sm:inline">🎉</span>
        <span>
          Offre limitée: <span className="font-bold">-50€</span>  sur les programmes Premium et Compétition avec le code{" "}
          <span className="rounded bg-white/20 px-2 py-0.5 font-bold tracking-wider">
            UNLBOOSTER
          </span>
        </span>
        {onOpenModal ? (
          <button
            onClick={onOpenModal}
            className="ml-1 underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            En profiter
          </button>
        ) : (
          <Link
            href="/#begin"
            className="ml-1 underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            En profiter
          </Link>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white"
        aria-label="Fermer le bandeau"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default PromoBanner;