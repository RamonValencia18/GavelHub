export type EstadoLote = 'Publicado' | 'Abierto' | 'Cerrado' | 'Retirado'

export interface Lote{
    id: number;
    descripcion: string;
    estado: EstadoLote;
    precioSalida: number;
    incrementoMinimo: number;
    precioReserva: number;
    fechaHoraApertura: Date;
    fechaHoraCierre: Date;
}

export interface LoteMedia{
    id: number;
    url: string;
    descripcion: String;
}