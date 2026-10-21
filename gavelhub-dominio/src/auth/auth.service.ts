import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { AUTH_USUARIO_REPOSITORY } from './usuarios.tokens';
import { JwtPayload, Rol, Usuario, UsuarioPublico } from './dominio/usuario';
import { LoginDto, RegistroDto } from './dtos/auth.dto';
import type { UsuarioRepository } from './dominio/usuario.repository';
import {
  CorreoYaRegistradoError,
  CredencialesInvalidasError,
} from './dominio/errores';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_USUARIO_REPOSITORY)
    private readonly userRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(dto: RegistroDto): Promise<UsuarioPublico> {
    const existente = await this.userRepository.buscarPorCorreo(dto.correo);
    if (existente) {
      throw new CorreoYaRegistradoError(dto.correo);
    }

    const usuario = await this.userRepository.guardar({
      correo: dto.correo,
      passwordHash: await hash(dto.password, 10),
      rol: Rol.USER, 
    });
    return aPublico(usuario);
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const usuario = await this.userRepository.buscarPorCorreo(dto.correo);
  
    if (!usuario || !(await compare(dto.password, usuario.passwordHash))) {
      throw new CredencialesInvalidasError();
    }

    const payload: JwtPayload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}

function aPublico(usuario: Usuario): UsuarioPublico {
  return { id: usuario.id, correo: usuario.correo, rol: usuario.rol };
}