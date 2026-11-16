export const ESTADO_PAGO = ['PENDIENTE', 'PAGADO', 'CANCELADO'] as const;
export type EstadoPago = (typeof ESTADO_PAGO)[number];

export interface Venta {
  id: string;
  loteId: string;
  usuarioId: string;
  estadoPago: EstadoPago;
}
