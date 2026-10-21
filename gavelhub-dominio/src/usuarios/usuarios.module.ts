import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { USUARIO_REPOSITORY } from './usuarios.tokens';
import { PrismaUsuarioRepository } from './infra/usuarios-prisma.repository';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: PrismaUsuarioRepository,
    },
  ],
  exports: [UsuariosService, USUARIO_REPOSITORY],
})
export class UsuariosModule {}
