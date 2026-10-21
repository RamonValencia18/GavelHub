import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VentaRepository } from './dominio/ventas.repository';
import { EstadoPago, Venta } from './dominio/entidades';

@Injectable()
export class PrismaVentaRepository implements VentaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorLote(loteId: string): Promise<Venta | null> {
    return this.prisma.venta.findFirst({ where: { loteId } });
  }

  async guardar(venta: Omit<Venta, 'id'>): Promise<Venta> {
    return this.prisma.venta.create({ data: venta });
  }

  async actualizarEstadoPago(
    id: string,
    estadoPago: EstadoPago,
  ): Promise<Venta | null> {
    try {
      return await this.prisma.venta.update({
        where: { id },
        data: { estadoPago },
      });
    } catch {
      // Si la venta no existe por el ID proporcionado, Prisma lanza el error P2025
      return null;
    }
  }
}
