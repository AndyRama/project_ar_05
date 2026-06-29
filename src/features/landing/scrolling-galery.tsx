"use client";

import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
};

// ── Data ──────────────────────────────────────────────────────────

const IMAGES: GalleryImage[] = [
  { id: 1,  src: "/images/coaching.jpg",  alt: "Coach Jeremy aide et encouragement",    width: 683,  height: 1024 },
  { id: 2,  src: "/images/story19.jpg",   alt: "Photo groupe collectif",                width: 683,  height: 1024 },
  { id: 3,  src: "/images/story20.jpg",   alt: "Entrainement corde musculation",        width: 683,  height: 1024 },
  { id: 4,  src: "/images/story1.png",    alt: "Jeremy Soutient une élève en coaching", width: 683,  height: 1024 },
  { id: 5,  src: "/images/story3.jpg",    alt: "No pain no gain",                       width: 796,  height: 1024 },
  { id: 6,  src: "/images/story7.jpg",    alt: "Préparation fitness France",            width: 1024, height: 683  },
  { id: 7,  src: "/images/story8.jpg",    alt: "Séance d'étirements",                   width: 1024, height: 683  },
  { id: 8,  src: "/images/story9.jpg",    alt: "Jeremy et Benjamin, coaching en salle", width: 341,  height: 512  },
  { id: 9,  src: "/images/story5.jpg",    alt: "Jeremy entrainement musculation",       width: 1024, height: 664  },
  { id: 10, src: "/images/story13.jpg",   alt: "Production",                            width: 1188, height: 1413 },
  { id: 11, src: "/images/story2.jpg",    alt: "Woman making a plan",                   width: 1188, height: 1413 },
  { id: 12, src: "/images/story6.jpg",    alt: "White curvy building",                  width: 1188, height: 1413 },
];

// ── Helpers ───────────────────────────────────────────────────────

/**
 * Retourne les images assignées à une colonne (0 | 1 | 2),
 * répétées `repeat` fois pour un défilement infini fluide.
 */
function buildColumn(colIndex: 0 | 1 | 2, repeat = 4) {
  const base = IMAGES.filter((_, i) => i % 3 === colIndex);
  const result: (GalleryImage & { uniqueId: string })[] = [];
  for (let r = 0; r < repeat; r++) {
    base.forEach((img) => {
      result.push({ ...img, uniqueId: `${img.id}-${colIndex}-${r}` });
    });
  }
  return result;
}

// ── Sub-components ────────────────────────────────────────────────

const GradientBackground = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                   w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                   bg-gradient-to-tr from-orange-300/15 to-[#9089fc]/15
                   opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678]
                   w-[36.125rem] -translate-x-1/2
                   bg-gradient-to-tr from-orange-400/10 to-[#9089fc]/15
                   opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div>
  </>
);

// ── Main ──────────────────────────────────────────────────────────

export function ScrollingGallery() {
  const col1 = buildColumn(0);
  const col2 = buildColumn(1);
  const col3 = buildColumn(2);

  const columns = [
    { images: col1, animClass: "animate-scroll-slow"   },
    { images: col2, animClass: "animate-scroll-medium" },
    { images: col3, animClass: "animate-scroll-fast"   },
  ];

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <GradientBackground />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full
                          border border-orange-200 bg-orange-50 px-4 py-1.5
                          text-xs font-semibold tracking-widest text-orange-700 uppercase
                          dark:border-orange-800/60 dark:bg-orange-950/60 dark:text-orange-300">
            Nos moments
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-balance
                         text-foreground sm:text-5xl">
            En salle,{" "}
            <span className="text-orange-500">en action</span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Des séances, des efforts, des résultats — capturés au fil des entraînements.
          </p>
        </div>

        {/* ── Scrolling columns ── */}
        <div className="relative h-[520px] overflow-hidden">

          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28
                          bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28
                          bg-gradient-to-t from-background to-transparent" />

          <div className="flex h-full gap-4 md:gap-6">
            {columns.map(({ images, animClass }, colIdx) => (
              <div key={colIdx} className="relative flex-1 overflow-hidden">
                <div className={`flex flex-col gap-4 ${animClass}`}>
                  {images.map((img) => (
                    <div
                      key={img.uniqueId}
                      className="group relative overflow-hidden rounded-md
                                 ring-1 ring-border shadow-sm"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="w-full object-cover object-center
                                   transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes scroll-slow {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-medium {
          0%   { transform: translateY(-20%); }
          100% { transform: translateY(-70%); }
        }
        @keyframes scroll-fast {
          0%   { transform: translateY(-40%); }
          100% { transform: translateY(-90%); }
        }

        .animate-scroll-slow {
          animation: scroll-slow 40s linear infinite;
        }
        .animate-scroll-medium {
          animation: scroll-medium 30s linear infinite;
        }
        .animate-scroll-fast {
          animation: scroll-fast 22s linear infinite;
        }

        .animate-scroll-slow:hover,
        .animate-scroll-medium:hover,
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}