/*
  Warnings:

  - You are about to alter the column `title` on the `topic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(512)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `topic` MODIFY `title` VARCHAR(255) NOT NULL;
