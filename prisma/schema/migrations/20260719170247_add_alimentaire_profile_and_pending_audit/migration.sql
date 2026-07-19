-- CreateTable
CREATE TABLE "public"."AlimentaireProfile" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "profession" TEXT,
    "pathology" TEXT,
    "hoursActivityPerWeek" TEXT,
    "stepsPerWeek" TEXT,
    "leftArm" DOUBLE PRECISION,
    "rightArm" DOUBLE PRECISION,
    "shoulders" DOUBLE PRECISION,
    "chest" DOUBLE PRECISION,
    "waist" DOUBLE PRECISION,
    "glutes" DOUBLE PRECISION,
    "leftThigh" DOUBLE PRECISION,
    "rightThigh" DOUBLE PRECISION,
    "sleepHours" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AlimentaireProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PendingAuditSubmission" (
    "id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "pathology" TEXT,
    "hoursActivityPerWeek" TEXT NOT NULL,
    "stepsPerWeek" TEXT NOT NULL,
    "sleepHours" TEXT NOT NULL,
    "leftArm" TEXT NOT NULL,
    "rightArm" TEXT NOT NULL,
    "leftThigh" TEXT NOT NULL,
    "rightThigh" TEXT NOT NULL,
    "glutes" TEXT NOT NULL,
    "shoulders" TEXT NOT NULL,
    "chest" TEXT NOT NULL,
    "waist" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumedAt" TIMESTAMP(3),

    CONSTRAINT "PendingAuditSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PendingAuditSubmission_email_idx" ON "public"."PendingAuditSubmission"("email");

-- AddForeignKey
ALTER TABLE "public"."AlimentaireProfile" ADD CONSTRAINT "AlimentaireProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
