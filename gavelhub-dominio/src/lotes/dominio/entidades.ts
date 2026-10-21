export type EstadoLote = 'PUBLICADO' | 'ABIERTO' | 'CERRADO' | 'RETIRADO';

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
