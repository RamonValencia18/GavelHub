export type EstadoOferta = 'ACEPTADA' | 'RECHAZADA' | 'SUPERADA';

export interface Oferta {
  id: string;
  loteId: string;
  usuarioId: string;
  cantidad: number;
  estado: EstadoOferta;
  fechaHora: Date;
}
