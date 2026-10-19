export type EstadoOferta = 'Aceptada' | 'Rechazada';

export interface Oferta{
    id: number;
    cantidad: number;
    estado: EstadoOferta;
    fechaHora: Date;
}