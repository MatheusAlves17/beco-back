/*
  Warnings:

  - You are about to drop the column `valueTotal` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "delivery" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "valueTotal",
ADD COLUMN     "valueCard" DECIMAL(65,30),
ADD COLUMN     "valueCoupon" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "active" DROP NOT NULL;
