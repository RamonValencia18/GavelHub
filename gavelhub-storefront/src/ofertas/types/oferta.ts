import type  { EstadoOferta } from '../../common/types/enums';
import type { Usuario } from '../../usuarios/types/usuario';
import type { Lote } from '../../lotes/types/lote';

export interface Oferta {
  id: string;
  cantidad: number;
  estado: EstadoOferta;
  fechaHora: string | Date;
  
  usuarioId: string;
  usuario?: Usuario;

  loteId: string;
  lote?: Lote;
}

export interface CrearOfertaDto {
  cantidad: number;
  loteId: string;
}