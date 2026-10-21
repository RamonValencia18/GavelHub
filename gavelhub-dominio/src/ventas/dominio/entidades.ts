export type EstadoPago = 'PENDIENTE' | 'PAGADO' | 'CANCELADO';

export interface Venta {
  id: string;
  loteId: string;
  usuarioId: string;
  estadoPago: EstadoPago;
}
