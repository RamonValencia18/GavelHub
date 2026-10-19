import { Usuario, Lote, LoteMedia, Oferta, Venta } from '../dominio/entidades';

export const USUARIOS_SEED: Usuario[] = [
  {
    id: 1,
    correo: 'admin@subastas.com',
    contrasena: 'admin123',
    rol: 'Administrador',
  },
  {
    id: 2,
    correo: 'juan.perez@gmail.com',
    contrasena: 'user123',
    rol: 'Participante',
  },
  {
    id: 3,
    correo: 'maria.lopez@gmail.com',
    contrasena: 'user123',
    rol: 'Participante',
  },
];

export const LOTES_SEED: Lote[] = [
  {
    id: 1,
    descripcion: 'Pintura al óleo Siglo XIX - Paisaje Urbano',
    estado: 'Abierto',
    precioSalida: 1000,
    incrementoMinimo: 100,
    precioReserva: 2000,
    fechaHoraApertura: new Date('2026-09-20T10:00:00Z'),
    fechaHoraCierre: new Date('2026-10-05T18:00:00Z'),
  },
  {
    id: 2,
    descripcion: 'Reloj de Bolsillo Antiguo de Oro 18k',
    estado: 'Publicado',
    precioSalida: 500,
    incrementoMinimo: 50,
    precioReserva: 800,
    fechaHoraApertura: new Date('2026-10-01T09:00:00Z'),
    fechaHoraCierre: new Date('2026-10-10T20:00:00Z'),
  },
];

export const MEDIA_SEED: LoteMedia[] = [
  {
    id: 1,
    url: 'https://subastas.com/uploads/lote1-frontal.jpg',
    descripcion: 'Vista frontal del cuadro con marco original',
  },
  {
    id: 2,
    url: 'https://subastas.com/uploads/lote2-reloj.jpg',
    descripcion: 'Detalle de maquinaria interna del reloj',
  },
];

export const OFERTAS_SEED: Oferta[] = [
  {
    id: 1,
    cantidad: 1000,
    estado: 'Aceptada',
    fechaHora: new Date('2026-09-21T11:30:00Z'),
  },
  {
    id: 2,
    cantidad: 1100,
    estado: 'Aceptada',
    fechaHora: new Date('2026-09-22T14:15:00Z'),
  },
];

export const VENTAS_SEED: Venta[] = [
  {
    id: 1,
    estadoPago: 'Pendiente',
  },
];