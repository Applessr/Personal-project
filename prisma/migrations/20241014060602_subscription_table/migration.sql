/*
  Warnings:

  - Added the required column `plan` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscription` 
ADD COLUMN `plan` ENUM('ONE_MONTH', 'SIX_MONTH', 'TWELVE_MONTH') NOT NULL DEFAULT 'ONE_MONTH',
MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3);

UPDATE `subscription` 
SET `plan` = 'ONE_MONTH' 
WHERE `plan` IS NULL;