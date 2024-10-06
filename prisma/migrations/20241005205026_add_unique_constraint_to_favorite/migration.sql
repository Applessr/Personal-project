/*
  Warnings:

  - You are about to drop the column `userId` on the `lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,vocabularyId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_userId_fkey`;

-- AlterTable
ALTER TABLE `category` MODIFY `image` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `userId`,
    MODIFY `image` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `questions` MODIFY `image` TEXT NULL;

-- AlterTable
ALTER TABLE `vocabulary` MODIFY `image` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Favorite_userId_vocabularyId_key` ON `Favorite`(`userId`, `vocabularyId`);
