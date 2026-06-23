import { Typography } from "@/components/nowts/typography";
import { Card } from "@/components/ui/card";
import { SectionLayout } from "../landing/section-layout";

type SubHeroProps = {
  title: string;
};

export const SubHero = ({ title }: SubHeroProps) => {
  return (
    <SectionLayout size="xl">
      <Card
        className="relative isolate flex w-full flex-col items-center overflow-hidden bg-cover bg-center py-32 text-center"
        style={{ backgroundImage: "url('/images/salle-de-sport.jpg')" }}
      >
        <div className="absolute inset-0 -z-10 bg-black/70" />

        <Typography
          as="h1"
          className="mx-auto max-w-4xl bg-gradient-to-r from-orange-500 via-red-400 to-yellow-400 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl"
        >
          {title}
        </Typography>
      </Card>
    </SectionLayout>
  );
};