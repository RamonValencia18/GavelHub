import { PrismaService } from 'src/prisma/prisma.service';
import { Rol, Usuario } from '../dominio/usuario';
import { UsuarioRepository } from '../dominio/usuario.repository';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class PrismaUsuarioAuthRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const fila = await this.prisma.usuario.findUnique({ where: { correo } });
    if (!fila) {
      return null;
    }
    return aDominio(fila);
  }

  async guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    const fila = await this.prisma.usuario.create({
      data: {
        correo: usuario.correo,
        contrasena: usuario.passwordHash,
        rol: usuario.rol,
      },
    });
    return aDominio(fila);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const fila = await this.prisma.usuario.findUnique({ where: { id } });
    if (!fila) {
      return null;
    }
    return aDominio(fila);
  }
}
function aDominio(fila: {
  id: string;
  correo: string;
  contrasena: string;
  rol: string;
}): Usuario {
  return {
    id: fila.id,
    correo: fila.correo,
    passwordHash: fila.contrasena,
    rol: fila.rol as Rol,
  };
}
