/*
  Warnings:

  - You are about to drop the column `shipping` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `banner` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueTotal` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping",
ADD COLUMN     "delivery" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "valueTotal" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "categories";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
