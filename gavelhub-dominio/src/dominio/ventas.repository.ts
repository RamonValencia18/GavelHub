import { EstadoPago, Venta } from "./entidades";

export interface VentaRepository {
  buscarPorLote(loteId: number): Promise<Venta | null>;
  guardar(venta: Omit<Venta, 'id'>): Promise<Venta>;
  actualizarEstadoPago(id: number, estadoPago: EstadoPago): Promise<Venta | null>;
}