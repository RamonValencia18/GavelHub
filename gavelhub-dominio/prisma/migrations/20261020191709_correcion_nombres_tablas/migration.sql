/*
  Warnings:

  - You are about to drop the `Lote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoteMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oferta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lote" DROP CONSTRAINT "Lote_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "LoteMedia" DROP CONSTRAINT "LoteMedia_loteId_fkey";

-- DropForeignKey
ALTER TABLE "Oferta" DROP CONSTRAINT "Oferta_loteId_fkey";

-- DropForeignKey
ALTER TABLE "Oferta" DROP CONSTRAINT "Oferta_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_loteId_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_usuarioId_fkey";

-- DropTable
DROP TABLE "Lote";

-- DropTable
DROP TABLE "LoteMedia";

-- DropTable
DROP TABLE "Oferta";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "Venta";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" "UsuarioRol" NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" TEXT NOT NULL,
    "estado" "EstadoPago" NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoLote" NOT NULL,
    "precioSalida" DOUBLE PRECISION NOT NULL,
    "incrementoMinimo" DOUBLE PRECISION NOT NULL,
    "precioReserva" DOUBLE PRECISION NOT NULL,
    "fechaHoraApertura" TIMESTAMP(3) NOT NULL,
    "fechaHoraCierre" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loteMedias" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,

    CONSTRAINT "loteMedias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ofertas" (
    "id" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "estado" "EstadoOferta" NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,

    CONSTRAINT "ofertas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loteMedias" ADD CONSTRAINT "loteMedias_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "lotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
