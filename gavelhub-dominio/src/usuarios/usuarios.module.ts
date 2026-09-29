import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuarioMemoriaRepository } from '../infra/usuarios-memoria.repository';
import { USUARIO_REPOSITORY } from './usuarios.tokens';

@Module({
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioMemoriaRepository,
    },
  ],
  exports: [UsuariosService, USUARIO_REPOSITORY],
})
export class UsuariosModule {}