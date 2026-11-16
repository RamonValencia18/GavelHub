import { IsUUID } from 'class-validator';

export class CrearVentaDto {
  @IsUUID()
  loteId!: string;

  @IsUUID()
  usuarioId!: string;
}
