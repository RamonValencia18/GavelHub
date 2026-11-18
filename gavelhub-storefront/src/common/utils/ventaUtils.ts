import type { EstadoPago } from '../types/enums'

export function getEstadoPagoLabel(estado: EstadoPago) {
  const labels: Record<EstadoPago, string> = {
    PENDIENTE: 'Pago pendiente',
    PAGADO: 'Pagado',
    CANCELADO: 'Venta cancelada',
  }

  return labels[estado]
}

export function getEstadoPagoMensaje(estado: EstadoPago) {
  const mensajes: Record<EstadoPago, string> = {
    PENDIENTE: 'La casa de subastas confirmará tu pago en cuanto lo reciba.',
    PAGADO: 'Pago confirmado. Tu adjudicación está completa.',
    CANCELADO: 'Esta venta fue cancelada por la casa de subastas.',
  }

  return mensajes[estado]
}