import { randomUUID } from 'node:crypto';
import { EstadoPago, Venta } from './dominio/entidades';
import { VentaRepository } from './dominio/ventas.repository';

export class InMemoryVentaRepository implements VentaRepository {
  constructor(private readonly ventas: Venta[] = []) {}

  async buscarPorLote(loteId: string): Promise<Venta | null> {
    return this.ventas.find((venta) => venta.loteId === loteId) ?? null;
  }

  async guardar(venta: Omit<Venta, 'id'>): Promise<Venta> {
    const nuevaVenta: Venta = { ...venta, id: randomUUID() };
    this.ventas.push(nuevaVenta);
    return nuevaVenta;
  }

  async actualizarEstadoPago(
    id: string,
    estadoPago: EstadoPago,
  ): Promise<Venta | null> {
    const venta = this.ventas.find((item) => item.id === id);
    if (!venta) {
      return null;
    }

    venta.estadoPago = estadoPago;
    return venta;
  }
}
