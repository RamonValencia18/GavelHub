export type EstadoPago = 'Aceptado' | 'Pendiente';

export interface Venta{
    id: number;
    estadoPago: EstadoPago; 
}