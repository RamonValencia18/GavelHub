import {Type} from "class-transformer";
import {IsDate, IsEnum, IsIn, IsNotEmpty, IsNumber, IsPositive, isPositive, IsString, Min} from "class-validator";
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
    @IsPositive()
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