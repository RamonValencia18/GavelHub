import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { OfertasService } from './ofertas.service';
import type { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import {
    LoteNoEncontradoError,
    UsuarioNoEncontradoError,
    LoteNoAbiertoError,
    OfertaInsuficienteError,
} from '../dominio/errores';

@Controller('lotes/:loteId/ofertas')
export class OfertasController {
    constructor(private readonly servicio: OfertasService) { }

    @Get()
    listarPorLote(@Param('loteId') loteId: string) {
        return this.servicio.listarPorLote(Number(loteId));
    }

    @Get('mayor')
    async obtenerMayor(@Param('loteId') loteId: string) {
        const oferta = await this.servicio.obtenerMayorOferta(Number(loteId));
        if (!oferta) {
            throw new NotFoundException(`No hay ofertas para el lote ${loteId}`);
        }
        return oferta;
    }

    @Post()
    @HttpCode(201)
    async crear(
        @Param('loteId') loteId: string,
        @Body() dto: CrearOfertaDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const idLoteNum = Number(loteId);
        if (!Number.isInteger(idLoteNum) || !Number.isInteger(dto.usuarioId)) {
            throw new BadRequestException('Los IDs deben ser números enteros válidos');
        }

        try {
            const oferta = await this.servicio.crear(idLoteNum, dto);
            res.setHeader('Location', `/lotes/${idLoteNum}/ofertas/${oferta.id}`);
            return oferta;
        } catch (error) {
            if (error instanceof LoteNoEncontradoError || error instanceof UsuarioNoEncontradoError) {
                throw new NotFoundException(error.message);
            }
            if (error instanceof LoteNoAbiertoError || error instanceof OfertaInsuficienteError) {
                throw new ConflictException(error.message);
            }
            throw error;
        }
    }
}