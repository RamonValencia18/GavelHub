import { EstadoPago, Venta } from './entidades';

export interface VentaRepository {
  buscarPorLote(loteId: string): Promise<Venta | null>;
  guardar(venta: Omit<Venta, 'id'>): Promise<Venta>;
  actualizarEstadoPago(
    id: string,
    estadoPago: EstadoPago,
  ): Promise<Venta | null>;
}
