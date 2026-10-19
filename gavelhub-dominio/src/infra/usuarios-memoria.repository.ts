import { Injectable } from '@nestjs/common';
import { USUARIOS_SEED } from 'src/datos/gavelhub.seed';
import { Usuario } from 'src/dominio/entidades';
import { UsuarioRepository } from 'src/dominio/usuarios.repository';
@Injectable()
export class UsuarioMemoriaRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [...USUARIOS_SEED];
  private siguienteId = 1;

  async listar(): Promise<Usuario[]> {
    return this.usuarios;
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.id === id) ?? null;
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.correo === correo) ?? null;
  }

  async guardar(datos: Omit<Usuario, 'id'>): Promise<Usuario> {
    const nuevo: Usuario = { id: this.siguienteId++, ...datos };
    this.usuarios.push(nuevo);
    return nuevo;
  }
}