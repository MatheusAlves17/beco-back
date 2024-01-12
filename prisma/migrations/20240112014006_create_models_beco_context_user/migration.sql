/*
  Warnings:

  - Added the required column `user_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_id_fkey";

-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_id_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
