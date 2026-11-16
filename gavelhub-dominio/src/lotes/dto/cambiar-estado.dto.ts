import { IsIn } from 'class-validator';
import { ESTADO_LOTE, type EstadoLote } from '../dominio/entidades';

export class CambiarEstadoDto {
  @IsIn(ESTADO_LOTE)
  estado!: EstadoLote;
}
