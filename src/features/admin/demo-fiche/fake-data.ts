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

export const FAKE_PROFILE = {
  // Informations personnelles
  firstname: "Andy",
  lastname: "Rama",
  age: 42,
  gender: "HOMME" as const,
  profession: "Développeur",
  phone: "06 30 83 28 75",
  email: "andy.rama@example.com",
  startDate: new Date("2026-05-01"),

  // Mensurations (cm)
  shoulders: 110,
  chest: 100,
  waist: 82,
  back: 105,
  hips: 96,
  glutes: 98,
  leftArm: 34,
  rightArm: 34.5,
  leftForearm: 28,
  rightForearm: 28.5,
  leftThigh: 56,
  rightThigh: 56.5,
  leftCalf: 37,
  rightCalf: 37.5,
  weight: 78.5,
  bodyFatPercentage: 16.2,

  // Hygiène de vie
  sleepHoursAvg: 7,
  sleepQuality: "BON" as RatingLevel,
  mealsPerDay: 4,
  hydrationLiters: 2.5,
  dietCompliance: "EXCELLENT" as RatingLevel,
  supplements: "Whey, créatine, oméga-3",
  stressLevel: "MOYEN" as RatingLevel,
  stressComment: "Stress lié au travail en fin de semaine",

  // Musculation
  trainingSessionsPerWeek: 4,
  avgSessionDuration: 75,
  trainingIntensity: "BON" as RatingLevel,
  monthlyFocus: "Prise de masse haut du corps",
  monthlyProgress: "Progression sur le développé couché (+5kg), meilleure récupération entre les séances.",
  pointsToImprove: "Travailler la mobilité des épaules, mieux gérer l'hydratation les jours d'entraînement.",

  // Bilan qualitatif du mois
  energyLevel: "BON" as RatingLevel,
  motivationLevel: "EXCELLENT" as RatingLevel,
  recoveryLevel: "MOYEN" as RatingLevel,
  monthlyObservations: "Bonne dynamique générale, le sommeil s'est amélioré depuis le changement d'horaires.",
  nextMonthGoals: "Atteindre 80kg au développé couché, stabiliser le poids de corps autour de 79kg.",
} as const;

export const FAKE_MONTHLY_HISTORY = [
  { month: "Janvier", weight: 82, bodyFat: 19, sleep: 6, nutrition: 3, training: 3, energy: 3 },
  { month: "Février", weight: 81.2, bodyFat: 18.5, sleep: 6.5, nutrition: 4, training: 4, energy: 4 },
  { month: "Mars", weight: 80.4, bodyFat: 18, sleep: 7, nutrition: 4, training: 4, energy: 4 },
  { month: "Avril", weight: 79.6, bodyFat: 17.3, sleep: 7, nutrition: 4, training: 5, energy: 4 },
  { month: "Mai", weight: 79, bodyFat: 16.8, sleep: 7, nutrition: 5, training: 4, energy: 5 },
  { month: "Juin", weight: 78.5, bodyFat: 16.2, sleep: 7, nutrition: 5, training: 4, energy: 4 },
] as const;