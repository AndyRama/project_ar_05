-- CreateTable
CREATE TABLE "public"."MealPlanDocument" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealPlanDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MealPlanDocument_userId_idx" ON "public"."MealPlanDocument"("userId");

-- AddForeignKey
ALTER TABLE "public"."MealPlanDocument" ADD CONSTRAINT "MealPlanDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
