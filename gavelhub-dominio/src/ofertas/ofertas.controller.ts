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
import { UsuarioNoEncontradoError } from '../usuarios/dominio/errores.js';
import {
  LoteNoEncontradoError,
  LoteNoAbiertoError,
} from '../lotes/dominio/errores.js';
import { OfertaInsuficienteError } from './dominio/errores.js';

@Controller('lotes/:loteId/ofertas')
export class OfertasController {
  constructor(private readonly servicio: OfertasService) {}

  @Get()
  listarPorLote(@Param('loteId') loteId: string) {
    return this.servicio.listarPorLote(loteId);
  }

  @Get('mayor')
  async obtenerMayor(@Param('loteId') loteId: string) {
    const oferta = await this.servicio.obtenerMayorOferta(loteId);
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
    if (typeof dto.usuarioId !== 'string' || !dto.usuarioId) {
      throw new BadRequestException('El campo usuarioId es obligatorio');
    }

    try {
      const oferta = await this.servicio.crear(loteId, dto);
      res.setHeader('Location', `/lotes/${loteId}/ofertas/${oferta.id}`);
      return oferta;
    } catch (error) {
      if (
        error instanceof LoteNoEncontradoError ||
        error instanceof UsuarioNoEncontradoError
      ) {
        throw new NotFoundException(error.message);
      }
      if (
        error instanceof LoteNoAbiertoError ||
        error instanceof OfertaInsuficienteError
      ) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}
