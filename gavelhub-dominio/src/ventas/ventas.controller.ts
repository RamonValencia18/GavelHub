import {
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
import { VentasService } from './ventas.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import  { ActualizarPagoDto } from './dto/actualizar-pago.dto';
import { LoteNoEncontradoError } from '../lotes/dominio/errores';
import { VentaExistenteError } from './dominio/errores';
import { VentaNoEncontradaError } from './dominio/errores';
import { Autenticado } from 'src/auth/decoradores/autenticado.decorator';
import { Roles } from 'src/auth/decoradores/roles.decorator';
import { Rol } from 'src/auth/dominio/usuario';

@Controller('ventas')
@Autenticado()
export class VentasController {
  constructor(private readonly servicio: VentasService) {}

  @Get('lote/:loteId')
  async buscarPorLote(@Param('loteId') loteId: string) {
    const venta = await this.servicio.buscarPorLote(loteId);
    if (!venta) {
      throw new NotFoundException(
        `No hay venta asociada al lote con id ${loteId}`,
      );
    }
    return venta;
  }

  @Post()
  @HttpCode(201)
  @Roles(Rol.ADMIN)
  async crear(@Body() dto: CrearVentaDto) {
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
  @Roles(Rol.ADMIN)
  async actualizarPago(
    @Param('id') id: string,
    @Body() dto: ActualizarPagoDto,
  ) {
    try {
      return await this.servicio.actualizarEstadoPago(id, dto.estadoPago);
    } catch (error) {
      if (error instanceof VentaNoEncontradaError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
