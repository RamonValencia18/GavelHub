import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VentasService, VentaExistenteError, VentaNoEncontradaError } from './ventas.service';
import type { CrearVentaDto } from './dto/crear-venta.dto';
import type { ActualizarPagoDto } from './dto/actualizar-pago.dto';
import { LoteNoEncontradoError } from '../dominio/errores';

@Controller('ventas')
export class VentasController {
  constructor(private readonly servicio: VentasService) {}

  @Get('lote/:loteId')
  async buscarPorLote(@Param('loteId') loteId: string) {
    const venta = await this.servicio.buscarPorLote(Number(loteId));
    if (!venta) {
      throw new NotFoundException(`No hay venta asociada al lote con id ${loteId}`);
    }
    return venta;
  }

  @Post()
  @HttpCode(201)
  async crear(@Body() dto: CrearVentaDto) {
    if (!Number.isInteger(dto.loteId)) {
      throw new BadRequestException('El campo loteId debe ser un entero válido');
    }

    try {
      return await this.servicio.crear(dto);
    } catch (error) {
      if (error instanceof LoteNoEncontradoError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof VentaExistenteError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id/pago')
  async actualizarPago(
    @Param('id') id: string,
    @Body() dto: ActualizarPagoDto,
  ) {
    try {
      return await this.servicio.actualizarEstadoPago(Number(id), dto.estadoPago);
    } catch (error) {
      if (error instanceof VentaNoEncontradaError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}