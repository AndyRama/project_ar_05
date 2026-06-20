'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Layout } from "@/features/page/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/nowts/typography";
import type { ComponentPropsWithoutRef } from "react";

export type CardImageProps = {
  title: string;
  years: string;
  image: string;
  index: number;
} & ComponentPropsWithoutRef<"div">;

export const CardImage = ({ title, years, image, index }: CardImageProps) => {
  const delay = index * 0.05;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.9,
        },
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Card className="border-none bg-transparent">
        <CardHeader className="p-0">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="h-[400px] w-full rounded-[10px] object-cover object-center transition-all duration-300 ease-in-out hover:rounded-[10px] group-hover:scale-110"
          />
        </CardHeader>
        <CardContent>
          <Typography className="mt-5 text-left text-lg font-bold uppercase tracking-[1px] text-orange-500">
            {title} {years}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CARDS = [
  {
    title: '#Arcachon #Team #Vélo #Event',
    years: '#2023',
    image: '/images/groupArcachon.jpg',
  },
  {
    title: '#Compétition #FR #Fitness',
    years: '#2024',
    image: '/images/fitnessFrance.jpg',
  },
  {
    title: '#Training #Remise #en #forme',
    years: '#2023',
    image: '/images/reducation.jpg',
  },
  {
    title: '#Concours #Prépa #Jeremy Prat',
    years: '#2024',
    image: '/images/coaching.jpg',
  },
];

export const CardGrid = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto -mt-32 mb-2 justify-center rounded-r-md md:flex md:px-4">
        <div
          className="mx-auto mt-10 grid
           w-full grid-cols-1 gap-4 text-gray-500 md:grid-cols-2 md:gap-6
           lg:w-10/12 lg:grid-cols-4"
        >
          {CARDS.map((card, index) => (
            <CardImage
              key={card.title}
              index={index}
              title={card.title}
              years={card.years}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CardGrid;