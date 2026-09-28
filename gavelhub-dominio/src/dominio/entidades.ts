export type UsuarioRol = 'Administrador' | 'Participante';
export type EstadoLote = 'Publicado' | 'Abierto' | 'Cerrado' | 'Retirado'
export type EstadoOferta = 'Aceptada' | 'Rechazada';
export type Imagen = string;

export interface Usuario{
    id: number;
    correo: string;
    contrasena: string;
    rol: UsuarioRol;
}

export interface Venta{
    id: number;
    estadoPago: boolean; 
}

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
    descripcion: Imagen;
}

export interface Oferta{
    id: number;
    cantidad: number;
    estado: EstadoOferta;
    fechaHora: Date;
}