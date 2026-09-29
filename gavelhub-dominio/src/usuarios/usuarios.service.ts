import { Inject, Injectable } from '@nestjs/common';
import type { UsuarioRepository } from '../dominio/usuarios.repository';
import { USUARIO_REPOSITORY } from './usuarios.tokens';
import { Usuario } from '../dominio/entidades';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly repo: UsuarioRepository,
  ) {}

  listar(): Promise<Usuario[]> {
    return this.repo.listar();
  }

  buscarPorId(id: number): Promise<Usuario | null> {
    return this.repo.buscarPorId(id);
  }

  crear(datos: Omit<Usuario, 'id'>): Promise<Usuario> {
    return this.repo.guardar(datos);
  }
}