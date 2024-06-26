/*
  Warnings:

  - You are about to drop the column `user_id` on the `paymentsCard` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `paymentsCoupon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "paymentsCard" DROP CONSTRAINT "paymentsCard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "paymentsCoupon" DROP CONSTRAINT "paymentsCoupon_user_id_fkey";

-- AlterTable
ALTER TABLE "paymentsCard" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "paymentsCoupon" DROP COLUMN "user_id";
