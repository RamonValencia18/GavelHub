import { Inject, Injectable } from '@nestjs/common';
import { USUARIO_REPOSITORY } from './usuarios.tokens';
import { Usuario } from './dominio/usuario';
import { RegistroDto } from './dtos/auth.dto';
import type { UsuarioRepository } from './dominio/usuario.repository';

@Injectable()
export class AuthService {
    constructor(@Inject(USUARIO_REPOSITORY) private readonly userRepository: UsuarioRepository) {}

   async registrar(dto: RegistroDto): Promise<Usuario> {
        const usuario: Omit<Usuario, 'id'> = {
            correo: dto.correo,
            passwordHash: dto.password,
            rol: dto.rol,
        };
        const usuarioGuardado = await this.userRepository.guardar(usuario);
        if (!usuarioGuardado) {
            throw new Error('No se pudo registrar el usuario');
        }
        return usuarioGuardado;
   }
   async login(correo: string, password: string): Promise<Usuario | null> {
        const usuario = await this.userRepository.buscarPorCorreo(correo);
        if (!usuario) {
            return null;
        }
        if (usuario.passwordHash !== password) {
            return null;
        }
        return usuario;
    }
}