import { IsInt, IsString } from 'class-validator';

export class CrearOfertaDto {
  @IsString()
  usuarioId!: string;

  @IsInt()
  cantidad!: number;
}
