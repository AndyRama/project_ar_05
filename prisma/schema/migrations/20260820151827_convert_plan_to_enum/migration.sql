/*
  Warnings:

  - Changed the type of `plan` on the `AlimentaireProfile` table (converted via mapping, no data loss).
  - Changed the type of `plan` on the `PendingAuditSubmission` table (converted via mapping, no data loss).

*/
-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('starter', 'premium', 'competition-vip');

-- AlterTable: AlimentaireProfile (colonne nullable)
ALTER TABLE "public"."AlimentaireProfile"
  ALTER COLUMN "plan" TYPE "public"."Plan"
  USING (
    CASE lower(trim("plan"))
      WHEN 'starter' THEN 'starter'
      WHEN 'premium' THEN 'premium'
      WHEN 'competition-vip' THEN 'competition-vip'
      WHEN 'competition_vip' THEN 'competition-vip'
      WHEN 'vip' THEN 'competition-vip'
      ELSE NULL
    END::"public"."Plan"
  );

-- AlterTable: PendingAuditSubmission (colonne NOT NULL)
ALTER TABLE "public"."PendingAuditSubmission"
  ALTER COLUMN "plan" TYPE "public"."Plan"
  USING (
    CASE lower(trim("plan"))
      WHEN 'starter' THEN 'starter'
      WHEN 'premium' THEN 'premium'
      WHEN 'competition-vip' THEN 'competition-vip'
      WHEN 'competition_vip' THEN 'competition-vip'
      WHEN 'vip' THEN 'competition-vip'
      ELSE 'starter'
    END::"public"."Plan"
  );