import { IsNumber, IsPositive} from 'class-validator';

export class CrearOfertaDto {
  
  @IsNumber({maxDecimalPlaces: 2})
  @IsPositive()
  cantidad!: number;
}
