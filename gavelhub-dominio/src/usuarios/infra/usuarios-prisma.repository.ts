import { PrismaClient } from '@prisma/client/extension';
import { UsuarioRepository } from '../dominio/usuarios.repository';
import { Usuario } from '../dominio/entidades';

export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listar(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({
      where: { correo },
    });
  }

  async guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: usuario,
    });
  }
}