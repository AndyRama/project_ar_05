import React from 'react';
import Link from 'next/link';
import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from '@/features/landing/section-layout';

const TermsPage = () => {
  return (
    <>
    <SectionLayout size="lg" variant="default" className="mx-auto mt-[-20px] py-0 lg:py-0">
      {/* Header */}
      <header>
        <Typography variant="h1" className="mb-2 text-3xl font-bold">
          Mentions Légales
        </Typography>
      </header>

      <hr className="my-6" />

      {/* Éditeur */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Éditeur
        </Typography>
        <Typography variant="p" className="mb-4">
          Unlcoaching est une Entreprise individuelle(E.I) dont le siège social est situé au 
          Adresse du siège : 239 avenue Pasteur, 33600 PESSAC, France,
          représentée par Jérémy Prat en qualité de Représentant légal,<br />
          N° SIREN : 823 996 566   
        </Typography>
        <ul className="ml-6 space-y-2">
          <li>
            <Typography variant="p">
              N° de téléphone : 06 84 37 56 28
            </Typography>
          </li>
          <li>
            <Typography variant="p">
              Adresse mail : {' '}
              <Link href="mailto:contact@unlcoaching.com" className="text-orange-500 hover:underline">
                contact@unlcoaching.com
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="p">
              Identification TVA : FR 00 823996566
            </Typography>
          </li>
        </ul>
      </section>

      <hr className="my-6" />

      {/* Hébergeur */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Hébergeur
        </Typography>
        <Typography variant="p">
          Unlcoaching.fr est hébergé par Vercel Inc, dont le siège social est situé au Vercel Inc. 340 S Lemon Ave #4133WALNUT, California 91789
        </Typography>
      </section>

      <hr className="my-6" />

      {/* Accès au site */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Accès au site
        </Typography>
        <Typography variant="p">
          Tous les éléments présents sur le site, y compris les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo,
          sons, ainsi que toutes les applications informatiques, sont protégés par les lois en vigueur sur la propriété intellectuelle. Ils sont la propriété exclusive
          de l'éditeur ou de ses partenaires. Toute reproduction ou utilisation, sous quelque forme que ce soit, sans autorisation écrite préalable, est strictement interdite.
        </Typography>
      </section>

      <hr className="my-6" />

      {/* Protection des données */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Protection des données
        </Typography>
        <div className="space-y-4">
          <Typography variant="p">
            Les données personnelles recueillies via le site sont principalement utilisées pour la gestion des relations avec les utilisateurs. Les informations collectées sont protégées conformément aux lois en vigueur sur la protection des données.
          </Typography>
          <Typography variant="h3" className="mb-2 text-xl font-medium">
            Droits d'accès, de rectification et de suppression
          </Typography>
          <Typography variant="p">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation du traitement, et de portabilité de vos données. Pour exercer ces droits, vous pouvez nous contacter :
          </Typography>
          <ul className="ml-6 space-y-2">
            <li>
              <Typography variant="p">
                Par email : Unlcoaching contact@unlcoaching.com avec object supression de mes données
              </Typography>
            </li>
            <li>
              <Typography variant="p">
                Puis un email de confirmation vous sera envoyé attestant de la suppression de notre base de données de unlcoaching
              </Typography>
            </li>
          </ul>
        </div>
      </section>

      <hr className="my-6" />

      {/* Cookies */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Cookies
        </Typography>
        <Typography variant="p" className="mb-4">
          Un cookie est un fichier déposé sur votre terminal pour analyser la navigation ou améliorer l'expérience utilisateur. Vous pouvez gérer vos préférences en matière de cookies lors de votre première navigation sur le site.
        </Typography>
        <Typography variant="p" className="mb-4">
          Les cookies utilisés incluent :
        </Typography>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <Typography variant="p">
              <strong>Google Analytics</strong> : pour mesurer l'audience du site
            </Typography>
          </li>
          <li>
            <Typography variant="p">
              <strong>Google Tag Manager</strong> : pour gérer les balises Google
            </Typography>
          </li>
          <li>
            <Typography variant="p">
              <strong>Google Adsense</strong> : pour les annonces publicitaires
            </Typography>
          </li>
        </ul>
      </section>

      <hr className="my-6" />

      {/* Loi applicable */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Loi applicable
        </Typography>
        <Typography variant="p">
          Les présentes mentions légales sont régies par la loi française. En cas de litige, la juridiction compétente est celle
          du siège social de l'éditeur.
        </Typography>
      </section>

      <hr className="my-6" />

      {/* Crédits */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Crédits
        </Typography>
        <div className="space-y-4">
          <Typography variant="p">
            <strong>Charte graphique & Design web :</strong> Le site a été réalisé par Andy Ramaroson.
          </Typography>
          <Typography variant="p">
            <strong>Crédits photos :</strong> © https://unsplash.com/
          </Typography>
          <Typography variant="p">
            <strong>Photographe :</strong> xxxxxxxxxxxx
          </Typography>
        </div>
      </section>

      <hr className="my-6" />

      {/* Contact */}
      <section className="mb-8">
        <Typography variant="h2" className="mb-4 text-2xl font-semibold">
          Contactez-nous
        </Typography>
        <Typography variant="p">
          Pour toute question, veuillez nous contacter à l'adresse suivante :{' '}
          <Link href="mailto:contact@unlcoaching.com" className="text-orange-500 hover:underline">
            contact@unlcoaching.fr
          </Link>
        </Typography>
      </section>
    </SectionLayout>
    </>
  );
};

export default TermsPage;