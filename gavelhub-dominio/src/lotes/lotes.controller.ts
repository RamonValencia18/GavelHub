import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LotesService } from './lotes.service';
import { Lote } from './dominio/entidades';
import { CrearLoteDto } from './dto/crear-lote.dto';
import { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import { Autenticado } from 'src/auth/decoradores/autenticado.decorator';
import { Roles } from 'src/auth/decoradores/roles.decorator';
import { Rol } from 'src/auth/dominio/usuario';

@Controller('lotes')
export class LotesController {
  constructor(private readonly servicio: LotesService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id', ParseUUIDPipe) id: string) {
    const lote = await this.servicio.buscarPorId(id);
    if (!lote) {
      throw new NotFoundException(`Lote con id ${id} no encontrado`);
    }
    return lote;
  }

  @Post()
  @Autenticado(Rol.ADMIN)
  crear(@Body() dto: CrearLoteDto) {
    return this.servicio.crear(dto);
  }

  @Patch(':id/estado')
  @Autenticado(Rol.ADMIN)
  actualizarEstado(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CambiarEstadoDto,
  ) {
    return this.servicio.actualizarEstado(id, dto.estado);
  }
}
