import { PrismaClient } from '@prisma/client/extension';
import { VentaRepository } from './dominio/ventas.repository'; 
import { EstadoPago, Venta } from './dominio/entidades';

export class PrismaVentaRepository implements VentaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorLote(loteId: number): Promise<Venta | null> {
    return await this.prisma.venta.findFirst({
      where: { loteId },
    });
  }

  async guardar(venta: Omit<Venta, 'id'>): Promise<Venta> {
    return await this.prisma.venta.create({
      data: venta,
    });
  }

  async actualizarEstadoPago(id: number, estadoPago: EstadoPago): Promise<Venta | null> {
    try {
      return await this.prisma.venta.update({
        where: { id },
        data: { estadoPago },
      });
    } catch (error) {
      // Si la venta no existe por el ID proporcionado, Prisma lanza el error P2025
      return null;
    }
  }
}