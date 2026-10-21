-- AlterEnum
BEGIN;
CREATE TYPE "EstadoLote_new" AS ENUM ('PUBLICADO', 'ABIERTO', 'CERRADO', 'RETIRADO');
ALTER TABLE "lotes" ALTER COLUMN "estado" TYPE "EstadoLote_new" USING ("estado"::text::"EstadoLote_new");
ALTER TYPE "EstadoLote" RENAME TO "EstadoLote_old";
ALTER TYPE "EstadoLote_new" RENAME TO "EstadoLote";
DROP TYPE "public"."EstadoLote_old";
COMMIT;
