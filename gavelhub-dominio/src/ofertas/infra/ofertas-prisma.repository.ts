import { PrismaClient } from '@prisma/client/extension';
import { OfertaRepository } from '../dominio/ofertas.repository';
import { Oferta } from '../dominio/entidades';

export class PrismaOfertaRepository implements OfertaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorLote(loteId: number): Promise<Oferta[]> {
    return await this.prisma.oferta.findMany({
      where: { loteId },
      orderBy: { monto: 'desc' }, // Opcional: ordena de mayor a menor oferta
    });
  }

  async obtenerOfertaMayor(loteId: number): Promise<Oferta | null> {
    return await this.prisma.oferta.findFirst({
      where: { loteId },
      orderBy: { monto: 'desc' },
    });
  }

  async guardar(oferta: Omit<Oferta, 'id'>): Promise<Oferta> {
    return await this.prisma.oferta.create({
      data: oferta,
    });
  }
}