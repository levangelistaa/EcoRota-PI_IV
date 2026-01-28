/*
  Warnings:

  - You are about to drop the column `complement` on the `ecopoints` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `ecopoints` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `ecopoints` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `ecopoints` table. All the data in the column will be lost.
  - Made the column `latitude` on table `ecopoints` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `ecopoints` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ecopoints` DROP COLUMN `complement`,
    DROP COLUMN `number`,
    DROP COLUMN `postal_code`,
    DROP COLUMN `street`,
    ADD COLUMN `partner_name` VARCHAR(255) NULL,
    MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;
