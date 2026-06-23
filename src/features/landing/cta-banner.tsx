import Link from "next/link";

export const CtaBanner = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="rounded-md border border-border bg-card px-8
                        py-12 text-center sm:px-16">

          {/* Badge */}
          <p className="text-xs font-semibold tracking-widest
                        text-orange-500 uppercase">
            Prêt à décoller ?
          </p>

          {/* Titre */}
          <h2 className="mt-3 text-2xl font-bold tracking-tight
                         text-balance text-foreground sm:text-3xl">
            Dans 30 minutes, vous saurez {" "}
            <span className="text-orange-500">
              exactement 
            </span>{" "}
            où vous en êtes
          </h2>

          {/* Sous-titre */}
          <p className="mx-auto mt-4 max-w-3xl text-sm
                        text-muted-foreground leading-relaxed">
            Appel offert. Sans engagement. On vient préparés avec une analyse
            de votre situation. Vous repartez avec un plan — que vous travailliez 
            avec nous ou non.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="#audit-form"
              className="inline-flex items-center gap-2 rounded-md
                         bg-orange-500 px-8 py-3.5 text-sm font-semibold
                         text-white transition-all hover:bg-orange-400
                         hover:shadow-lg hover:shadow-orange-500/30
                         active:scale-95"
            >
              Réserver votre appel →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};