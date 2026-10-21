/*
  Warnings:

  - A unique constraint covering the columns `[loteId]` on the table `ventas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ventas_loteId_key" ON "ventas"("loteId");
