import { IsNotEmpty, IsString } from 'class-validator';

export class CrearVentaDto {
  @IsString()
  @IsNotEmpty()
  loteId!: string;

  @IsString()
  @IsNotEmpty()
  usuarioId!: string;
}
