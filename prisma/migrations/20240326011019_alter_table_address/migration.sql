/*
  Warnings:

  - Added the required column `type` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flag` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "flag" TEXT NOT NULL;
