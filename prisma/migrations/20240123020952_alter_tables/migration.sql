/*
  Warnings:

  - Added the required column `status_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_total` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "status_id" TEXT NOT NULL,
ADD COLUMN     "value_total" DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
