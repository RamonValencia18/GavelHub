import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Autenticado } from 'src/auth/decoradores/autenticado.decorator';
import { Rol } from 'src/auth/dominio/usuario';

@Controller('usuarios')
@Autenticado(Rol.ADMIN)
export class UsuariosController {
  constructor(private readonly servicio: UsuariosService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const usuario = await this.servicio.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }
}
