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

export interface TiempoRestante {
  dias: number
  horas: number
  minutos: number
  segundos: number
  finalizado: boolean
}

export function calcularTiempoRestante(
  fechaCierre: string | Date,
  ahora: number = Date.now(),
): TiempoRestante {
  const diferencia = Math.max(
    0,
    new Date(fechaCierre).getTime() - ahora,
  )
  const totalSegundos = Math.floor(diferencia / 1000)

  return {
    dias: Math.floor(totalSegundos / 86400),
    horas: Math.floor((totalSegundos % 86400) / 3600),
    minutos: Math.floor((totalSegundos % 3600) / 60),
    segundos: totalSegundos % 60,
    finalizado: diferencia <= 0,
  }
}
