import { Usuario } from './entidades';

export interface UsuarioRepository {
  listar(): Promise<Usuario[]>;
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario>;
}
