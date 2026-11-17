import type { EstadoPago } from '../../common/types/enums';
import type { Usuario } from '../../usuarios/types/usuario';
import type { Lote } from '../../lotes/types/lote';

export interface Venta {
  id: string;
  estadoPago: EstadoPago;
  
  usuarioId: string;
  usuario?: Usuario;

  loteId: string;
  lote?: Lote;
}