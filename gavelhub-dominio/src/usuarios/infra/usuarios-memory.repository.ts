import { randomUUID } from 'node:crypto';
import { Usuario } from '../dominio/entidades';
import { UsuarioRepository } from '../dominio/usuarios.repository';

export class InMemoryUsuarioRepository implements UsuarioRepository {
  constructor(private readonly usuarios: Usuario[] = []) {}

  async listar(): Promise<Usuario[]> {
    return [...this.usuarios];
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this.usuarios.find((usuario) => usuario.id === id) ?? null;
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarios.find((usuario) => usuario.correo === correo) ?? null;
  }

  async guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    const nuevoUsuario: Usuario = { ...usuario, id: randomUUID() };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }
}
