import { Module } from '@nestjs/common';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { OFERTA_REPOSITORY } from './ofertas.tokens';
import { LotesModule } from '../lotes/lotes.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PrismaOfertaRepository } from './infra/ofertas-prisma.repository';

@Module({
  imports: [LotesModule, UsuariosModule],
  controllers: [OfertasController],
  providers: [
    OfertasService,
    {
      provide: OFERTA_REPOSITORY,
      useClass: PrismaOfertaRepository,
    },
  ],
  exports: [OfertasService],
})
export class OfertasModule {}
