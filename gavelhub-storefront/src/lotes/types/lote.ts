import type { EstadoLote } from '../../common/types/enums';
import type { Oferta } from '../../ofertas/types/oferta';
import type { Venta } from '../../ventas/types/venta';
import type { Usuario } from '../../usuarios/types/usuario';

export interface LoteMedia {
  id: string;
  url: string;
  descripcion: string;
  loteId: string;
}

export interface Lote {
  id: string;
  descripcion: string;
  estado: EstadoLote;
  precioSalida: number;
  incrementoMinimo: number;
  precioReserva: number;
  fechaHoraApertura: string | Date;
  fechaHoraCierre: string | Date;
  
  // Relaciones opcionales o pobladas desde la API
  usuarioId?: string | null;
  usuario?: Usuario | null;
  venta?: Venta | null;
  ofertas?: Oferta[];
  mediaList?: LoteMedia[];
}

// DTOs útiles para la creación/edición en la UI
export type CrearLoteDto = Omit<Lote, 'id' | 'usuario' | 'venta' | 'ofertas' | 'mediaList'> & {
  mediaList?: Omit<LoteMedia, 'id' | 'loteId'>[];
};