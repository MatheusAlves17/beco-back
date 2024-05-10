/*
  Warnings:

  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_card_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_coupon_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_order_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_fkey";

-- DropTable
DROP TABLE "payments";

-- CreateTable
CREATE TABLE "paymentsCard" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT,
    "card_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "paymentsCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentsCoupon" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT,
    "coupon_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "paymentsCoupon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paymentsCard" ADD CONSTRAINT "paymentsCard_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsCard" ADD CONSTRAINT "paymentsCard_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsCard" ADD CONSTRAINT "paymentsCard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsCoupon" ADD CONSTRAINT "paymentsCoupon_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsCoupon" ADD CONSTRAINT "paymentsCoupon_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsCoupon" ADD CONSTRAINT "paymentsCoupon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
