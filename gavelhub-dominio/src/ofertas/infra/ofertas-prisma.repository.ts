import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OfertaRepository } from '../dominio/ofertas.repository';
import { Oferta } from '../dominio/entidades';

@Injectable()
export class PrismaOfertaRepository implements OfertaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorLote(loteId: string): Promise<Oferta[]> {
    return this.prisma.oferta.findMany({
      where: { loteId },
      orderBy: { cantidad: 'desc' }, // Opcional: ordena de mayor a menor oferta
    });
  }

  async obtenerOfertaMayor(loteId: string): Promise<Oferta | null> {
    return this.prisma.oferta.findFirst({
      where: { loteId },
      orderBy: { cantidad: 'desc' },
    });
  }

  async guardar(oferta: Omit<Oferta, 'id'>): Promise<Oferta> {
    return this.prisma.oferta.create({ data: oferta });
  }
}
