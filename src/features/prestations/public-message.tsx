"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Typography } from "@/components/nowts/typography";
import { SectionDivider} from "@/features/landing/section-divider";

export const PublicMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
    viewport={{ once: true }}
    className="mx-auto mt-32 w-full flex-col text-left lg:flex lg:w-6/12"
  >
    <Typography variant="h3" className="mb-5 text-2xl md:text-3xl">
      Chère communauté,
    </Typography>

    <Typography variant="p" className="mb-7 leading-relaxed">
      Je tiens à exprimer ma profonde gratitude pour votre soutien continu et votre engagement envers notre programme de formation en ligne. Vos retours positifs et votre enthousiasme sont une source d'inspiration constante pour moi. Voir vos progrès et savoir que ma formation vous aide à atteindre vos objectifs me remplit de fierté et de satisfaction. Votre réussite est ma plus grande récompense, et je suis honoré de faire partie de votre parcours.
    </Typography>

    <Typography variant="p" className="mb-7 leading-relaxed">
      N'hésitez pas à partager vos expériences et vos réalisations avec moi et avec le reste de la communauté. Ensemble, nous pouvons continuer à apprendre, à grandir et à nous surpasser. Merci encore pour votre confiance et votre soutien. J'ai hâte de continuer à travailler avec vous et à célébrer vos succès futurs.
    </Typography>

    <div>
      <Image
        src="/images/Fake_Signature.svg"
        alt="Signature Jeremy Prat"
        width={338}
        height={113}
        className="mb-2 block w-48"
      />
      <strong className="mb-2 block font-medium">
        Jeremy Prat |{" "}
        <span className="text-orange-500">Coach Sportif</span>
      </strong>
    </div>
		<SectionDivider/>
  </motion.div>
);