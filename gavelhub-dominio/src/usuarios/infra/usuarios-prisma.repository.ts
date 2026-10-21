import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuarioRepository } from '../dominio/usuarios.repository';
import { Usuario } from '../dominio/entidades';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { correo } });
  }

  async guardar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    return this.prisma.usuario.create({ data: usuario });
  }
}
