import React from 'react';
import Link from 'next/link';

type PromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const PromoModal = ({ isOpen, onClose }: PromoModalProps) => {
  const [copied, setCopied] = React.useState(false);
  const promoCode = "UNLBOOSTER";

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="relative rounded-2xl bg-white p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Fermer"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-orange-100">
              <span className="text-3xl">🎉</span>
            </div>
            
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Votre Code Promo !
            </h2>
            
            <p className="mb-6 text-gray-600">
              Économisez <span className="font-bold text-orange-600">50€</span> sur tous les offres premium et compétition.
            </p>

            {/* Promo Code Box */}
            <div className="mb-6 rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 p-4">
              <p className="mb-2 text-sm font-medium text-gray-700">Code promo :</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold tracking-wider text-orange-600">
                  {promoCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-700"
                >
                  {copied ? '✓ Copié !' : 'Copier'}
                </button>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-6 rounded-lg bg-red-50 p-3">
              <p className="text-sm font-semibold text-red-600">
                ⏰ Plus que quelques jours pour en profiter !
              </p>
            </div>

            {/* CTA Button */}
            <Link href="/#begin" onClick={onClose}>
              <button
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 font-bold text-white transition-all hover:scale-105"
              >
                Commencer ma transformation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoModal;