import  { Usuario } from './usuario';

export interface UsuarioRepository {
    buscarPorCorreo(correo: string): Promise<Usuario | null>;
    guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario | null>;
    buscarPorId(id: string): Promise<Usuario | null>;
}


