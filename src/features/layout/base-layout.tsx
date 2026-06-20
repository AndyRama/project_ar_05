'use client'

import { useState } from "react";
import { Footer } from "@/features/layout/footer";
import { Header } from "@/features/layout/header";
import { PromoModal } from "@/features/landing/promo-modal";
import { PromoBanner } from "@/features/landing/promo-banner";
import type { PropsWithChildren } from "react";

export function BaseLayout(props: PropsWithChildren) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex min-h-full flex-col">
      <PromoBanner onOpenModal={() => setIsModalOpen(true)} />
      <Header />
      <div className="min-h-full flex-1">{props.children}</div>
      <Footer />
      <PromoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}