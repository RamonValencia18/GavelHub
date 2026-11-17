import { EstadoPago, Venta } from './entidades';

export interface VentaRepository {
  buscarPorLote(loteId: string): Promise<Venta | null>;
  buscarPorUsuario(usuarioId: string): Promise<Venta[]>;
  guardar(venta: Omit<Venta, 'id'>): Promise<Venta>;
  actualizarEstadoPago(
    id: string,
    estadoPago: EstadoPago,
  ): Promise<Venta | null>;
}
