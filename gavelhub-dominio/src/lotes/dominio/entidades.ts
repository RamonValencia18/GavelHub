export const ESTADO_LOTE = ['PUBLICADO', 'ABIERTO', 'CERRADO', 'RETIRADO'] as const;
export type EstadoLote = (typeof ESTADO_LOTE)[number];

export interface Lote {
  id: string;
  descripcion: string;
  estado: EstadoLote;
  precioSalida: number;
  incrementoMinimo: number;
  precioReserva: number;
  fechaHoraApertura: Date;
  fechaHoraCierre: Date;
}

export interface LoteMedia {
  id: string;
  loteId: string;
  url: string;
  descripcion: string;
}
