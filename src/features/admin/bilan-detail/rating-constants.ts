export const RATING_LEVELS = ["TRES_FAIBLE", "FAIBLE", "MOYEN", "BON", "EXCELLENT"] as const;
export type RatingLevel = (typeof RATING_LEVELS)[number];

export const RATING_LABELS: Record<RatingLevel, string> = {
  TRES_FAIBLE: "Très faible",
  FAIBLE: "Faible",
  MOYEN: "Moyen",
  BON: "Bon",
  EXCELLENT: "Excellent",
};

export const RATING_STARS: Record<RatingLevel, number> = {
  TRES_FAIBLE: 1,
  FAIBLE: 2,
  MOYEN: 3,
  BON: 4,
  EXCELLENT: 5,
};