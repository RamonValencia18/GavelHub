import type { EstadoLote } from '../types/enums'

export function getEstadoLoteLabel(estado: EstadoLote) {
  const labels: Record<EstadoLote, string> = {
    ABIERTO: 'Abierto',
    PUBLICADO: 'Abre pronto',
    CERRADO: 'Cerrado',
    RETIRADO: 'Retirado',
  }

  return labels[estado]
}

export function getRemainingTime(fechaCierre: string | Date) {
  const diferencia = new Date(fechaCierre).getTime() - Date.now()

  if (diferencia <= 0) {
    return 'Finalizado'
  }

  const horas = Math.floor(diferencia / (1000 * 60 * 60))
  const minutos = Math.floor(
    (diferencia % (1000 * 60 * 60)) / (1000 * 60),
  )

  return `Quedan ${horas}h ${minutos}m`
}
