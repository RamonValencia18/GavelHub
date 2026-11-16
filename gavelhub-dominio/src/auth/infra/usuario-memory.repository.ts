import { randomUUID } from 'node:crypto';
import { Rol, Usuario } from '../dominio/usuario';
import { UsuarioRepository } from '../dominio/usuario.repository';

export class InMemoryUsuarioAuthRepository implements UsuarioRepository {
  constructor(private readonly usuarios: Usuario[] = []) {}

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarios.find((usuario) => usuario.correo === correo) ?? null;
  }

  async guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    const nuevoUsuario: Usuario = {
      ...usuario,
      id: randomUUID(),
      rol: usuario.rol as Rol,
    };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this.usuarios.find((usuario) => usuario.id === id) ?? null;
  }
}
