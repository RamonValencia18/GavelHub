import { Controller, Get, Post, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { Lote } from '../dominio/entidades';

@Controller('lotes')
export class LotesController {
  constructor(private readonly servicio: LotesService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const lote = await this.servicio.buscarPorId(Number(id));
    if (!lote) {
      throw new NotFoundException(`Lote con id ${id} no encontrado`);
    }
    return lote;
  }

  @Post()
  crear(@Body() datos: Omit<Lote, 'id'>) {
    return this.servicio.crear(datos);
  }

  @Patch(':id/estado')
  actualizarEstado(@Param('id') id: string, @Body('estado') estado: Lote['estado']) {
    return this.servicio.actualizarEstado(Number(id), estado);
  }
}