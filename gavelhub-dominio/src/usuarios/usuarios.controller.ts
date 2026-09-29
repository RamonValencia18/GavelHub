import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../dominio/entidades';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly servicio: UsuariosService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const usuario = await this.servicio.buscarPorId(Number(id));
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  @Post()
  crear(@Body() datos: Omit<Usuario, 'id'>) {
    return this.servicio.crear(datos);
  }
}