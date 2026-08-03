-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('HOMME', 'FEMME');

-- CreateEnum
CREATE TYPE "public"."RatingLevel" AS ENUM ('TRES_FAIBLE', 'FAIBLE', 'MOYEN', 'BON', 'EXCELLENT');

-- AlterTable
ALTER TABLE "public"."AlimentaireProfile" ADD COLUMN     "avgSessionDuration" INTEGER,
ADD COLUMN     "back" DOUBLE PRECISION,
ADD COLUMN     "bodyFatPercentage" DOUBLE PRECISION,
ADD COLUMN     "dietCompliance" "public"."RatingLevel",
ADD COLUMN     "energyLevel" "public"."RatingLevel",
ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "hips" DOUBLE PRECISION,
ADD COLUMN     "hydrationLiters" DOUBLE PRECISION,
ADD COLUMN     "leftCalf" DOUBLE PRECISION,
ADD COLUMN     "leftForearm" DOUBLE PRECISION,
ADD COLUMN     "mealsPerDay" INTEGER,
ADD COLUMN     "monthlyFocus" TEXT,
ADD COLUMN     "monthlyObservations" TEXT,
ADD COLUMN     "monthlyProgress" TEXT,
ADD COLUMN     "motivationLevel" "public"."RatingLevel",
ADD COLUMN     "nextMonthGoals" TEXT,
ADD COLUMN     "pointsToImprove" TEXT,
ADD COLUMN     "recoveryLevel" "public"."RatingLevel",
ADD COLUMN     "rightCalf" DOUBLE PRECISION,
ADD COLUMN     "rightForearm" DOUBLE PRECISION,
ADD COLUMN     "sleepQuality" "public"."RatingLevel",
ADD COLUMN     "stressComment" TEXT,
ADD COLUMN     "stressLevel" "public"."RatingLevel",
ADD COLUMN     "supplements" TEXT,
ADD COLUMN     "trainingIntensity" "public"."RatingLevel",
ADD COLUMN     "trainingSessionsPerWeek" INTEGER;
