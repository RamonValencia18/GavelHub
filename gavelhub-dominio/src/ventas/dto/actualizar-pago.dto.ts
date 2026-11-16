import { IsIn } from 'class-validator';
import { ESTADO_PAGO, type EstadoPago } from '../dominio/entidades';
export class ActualizarPagoDto {
  @IsIn(ESTADO_PAGO)
  estadoPago!: EstadoPago;
}
