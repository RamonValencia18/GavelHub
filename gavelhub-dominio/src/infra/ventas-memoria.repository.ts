import { Injectable } from "@nestjs/common";
import { EstadoPago, Venta } from "src/dominio/entidades";
import { VentaRepository } from "src/dominio/ventas.repository";

@Injectable()
export class VentaMemoriaRepository implements VentaRepository {
  private ventas: Venta[] = [];
  private siguienteId = 1;

  async buscarPorLote(loteId: number): Promise<Venta | null> {
    return this.ventas.find((v) => v.id === loteId) ?? null;
  }

  async guardar(datos: Omit<Venta, 'id'>): Promise<Venta> {
    const nueva: Venta = { id: this.siguienteId++, ...datos };
    this.ventas.push(nueva);
    return nueva;
  }

  async actualizarEstadoPago(id: number, estadoPago: EstadoPago): Promise<Venta | null> {
    const venta = this.ventas.find((v) => v.id === id);
    if (!venta) return null;
    venta.estadoPago = estadoPago;
    return venta;
  }
}