import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoteRepository } from '../dominio/lotes.repository';
import { EstadoLote, Lote, LoteMedia } from '../dominio/entidades';

@Injectable()
export class PrismaLoteRepository implements LoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Lote[]> {
    return this.prisma.lote.findMany();
  }

  async buscarPorId(id: string): Promise<Lote | null> {
    return this.prisma.lote.findUnique({ where: { id } });
  }

  async guardar(lote: Omit<Lote, 'id'>): Promise<Lote> {
    return this.prisma.lote.create({ data: lote });
  }

  async actualizarEstado(id: string, estado: EstadoLote): Promise<Lote | null> {
    try {
      return await this.prisma.lote.update({
        where: { id },
        data: { estado },
      });
    } catch {
      // Prisma lanza un error P2025 si el registro no existe al intentar actualizar
      return null;
    }
  }

  async buscarImagenesPorLote(loteId: string): Promise<LoteMedia[]> {
    return this.prisma.loteMedia.findMany({ where: { loteId } });
  }

  async guardarImagenes(media: Omit<LoteMedia, 'id'>): Promise<LoteMedia> {
    return this.prisma.loteMedia.create({ data: media });
  }
}
