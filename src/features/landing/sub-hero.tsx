import { Typography } from "@/components/nowts/typography";

type SubHeroProps = {
  title: string;
  eyebrow?: string;
  imageUrl?: string;
};

export const SubHero = ({ title, eyebrow = "", imageUrl = '/images/salle-de-sport.jpg' }: SubHeroProps) => {
  return (
    <div
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center text-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="absolute inset-0 -z-10 bg-black/70" />

      <span className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-500">
        {eyebrow}
      </span>

      <Typography
        as="h1"
        className="mx-auto max-w-4xl bg-gradient-to-r from-orange-500 via-red-400 to-yellow-400 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl"
      >
        {title}
      </Typography>
    </div>
  );
};