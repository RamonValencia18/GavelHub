import { PrismaClient } from '@prisma/client/extension';
import { LoteRepository } from '../dominio/lotes.repository'; 
import { Lote, LoteMedia } from '../dominio/entidades';

export class PrismaLoteRepository implements LoteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listar(): Promise<Lote[]> {
    return await this.prisma.lote.findMany();
  }

  async buscarPorId(id: number): Promise<Lote | null> {
    return await this.prisma.lote.findUnique({
      where: { id },
    });
  }

  async guardar(lote: Omit<Lote, 'id'>): Promise<Lote> {
    return await this.prisma.lote.create({
      data: lote,
    });
  }

  async actualizarEstado(id: number, estado: Lote['estado']): Promise<Lote | null> {
    try {
      return await this.prisma.lote.update({
        where: { id },
        data: { estado },
      });
    } catch (error) {
      // Prisma lanza un error P2025 si el registro no existe al intentar actualizar
      return null;
    }
  }

  async buscarImagenesPorLote(loteId: number): Promise<LoteMedia[]> {
    return await this.prisma.loteMedia.findMany({
      where: { loteId },
    });
  }

  async guardarImagenes(media: Omit<LoteMedia, 'id'>): Promise<LoteMedia> {
    return await this.prisma.loteMedia.create({
      data: media,
    });
  }
}