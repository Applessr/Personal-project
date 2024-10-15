/*
  Warnings:

  - You are about to drop the column `plan` on the `subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subscription` DROP COLUMN `plan`,
    ALTER COLUMN `updated_at` DROP DEFAULT;
