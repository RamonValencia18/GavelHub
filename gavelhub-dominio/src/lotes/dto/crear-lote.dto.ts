import {Type} from "class-transformer";
import {IsDate, IsEnum, IsIn, IsNotEmpty, IsNumber, IsString, Min} from "class-validator";
import {ESTADO_LOTE, type EstadoLote} from '../dominio/entidades';

export class CrearLoteDto {
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @IsIn(ESTADO_LOTE)
    estado!: EstadoLote;

    @IsNumber()
    @Min(0)
    precioSalida!: number;

    @IsNumber()
    @Min(0)
    incrementoMinimo!: number;

    @IsNumber()
    @Min(0)
    precioReserva!: number;

    @Type(() => Date)
    @IsDate()
    fechaHoraApertura!: Date;

    @Type(() => Date)
    @IsDate()
    fechaHoraCierre!: Date;

}