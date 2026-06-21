'use client';

import React from 'react';
import { Layout } from '@/features/page/layout';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Typography } from '@/components/nowts/typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { formatDate } from '@/lib/format/date';

type Post = {
  attributes: {
    title: string;
    description: string;
    date: string;
    coverUrl: string;
  };
  slug: string;
};

export const RecentPostCard = ({ post }: { post: Post }) => {
  const date = new Date(post.attributes.date);
  const author = 'Jeremy Prat';

  return (
    <Card className="transition-all hover:shadow-xl">
      <CardHeader className="h-fit">
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <img
            src={post.attributes.coverUrl}
            alt={post.attributes.title}
            className="size-full rounded-t object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="space-y-2">
        <Typography variant="p" className="!leading-tight">
          <span className="inline-block text-white">
            <span className="relative inline-block">
              <span className="text-white">
                {new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: '2-digit' })}
              </span>
              <span className="mx-3">•</span>
              <span className="text-white">{author}</span>
            </span>
          </span>
        </Typography>
        <CardTitle>{post.attributes.title}</CardTitle>
        <CardDescription className="pb-8">{post.attributes.description}</CardDescription>
        <div className="flex w-[250px] items-center justify-between">
          <Link
            href={`/posts/${post.slug}`}
            className="rounded-[5px] border border-gray-600 px-4 text-white hover:border-orange-500 xl:px-8"
          >
            Lire l&apos;article
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export const RecentPosts = () => {
  const posts: Post[] = [
    {
      attributes: {
        title: 'Pourquoi les regimes echouent et comment reussir votre transformation en 2026',
        description: 'Découvrez pourquoi le sommeil est un pilier essentiel pour optimiser vos performances sportives. Explorez ses bienfaits sur la récupération, la progression et l\'équilibre général.',
        date: '2026-02-19',
        coverUrl: '/images/article-10.jpg',
      },
      slug: '2026-02-19_Pourquoi_les_regimes_echouent_et_comment_reussir_votre_transformation_en_2026',
    },
    {
      attributes: {
        title: 'Guide complet des complements alimentaire dans le sport',
        description: 'Découvrez notre guide complet pour bien commencer à la salle de sport. Conseils pratiques, erreurs à éviter et astuces pour rester motivé, tout ce qu\'il faut savoir pour transformer votre première expérience en réussite !',
        date: '2026-02-20',
        coverUrl: '/images/article-complement-alimentaire.jpg',
      },
      slug: '2026-02-20_Guide_complet_des_complements_alimentaire_dans_le_sport',
    },
    {
      attributes: {
        title: 'La salle de sport quand on debute',
        description: "Découvrez notre guide complet pour bien commencer à la salle de sport. Conseils pratiques, erreurs à éviter et astuces pour rester motivé, tout ce qu'il faut savoir pour transformer votre première expérience en réussite !",
        date: '2026-02-09',
        coverUrl: '/images/salle-de-sport.jpg',
      },
      slug: '2026-02-09_La_salle_de_sport_quand_on_debute',
    },
    {
      attributes: {
        title: 'Comment perdre du poids de manière saine et durable',
        description: 'Explorez nos conseils pour perdre du poids de façon saine et durable. Découvrez des stratégies éprouvées pour allier alimentation équilibrée, activité physique adaptée et habitudes de vie saines.',
        date: '2026-02-02',
        coverUrl: '/images/post2.jpg',
      },
      slug: '2026-02-02_Comment_perdre_du_poids_de_maniere_saine_et_durable',
    },
  ];

  return (
    <Layout size="xl" >
      <div className="mx-auto -mt-32 mb-2 justify-center rounded-r-md md:flex md:px-4 max-w-7xl">
        <div className="relative mx-auto mt-10 w-full">
          <div className="grid w-full grid-cols-1 gap-6 text-gray-500 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <RecentPostCard key={index} post={post} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <Link
              href="/posts"
              className={cn(
                buttonVariants({ size: "sm", variant: "default" }),
                "text-base font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg bg-orange-600 hover:bg-orange-700",
              )}
            >
              Voir tous les articles
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecentPosts;