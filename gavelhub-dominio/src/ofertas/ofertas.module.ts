import { Module } from '@nestjs/common';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { OfertaMemoriaRepository } from '../infra/ofertas-memoria.repository';
import { OFERTA_REPOSITORY } from './ofertas.tokens';
import { LotesModule } from '../lotes/lotes.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [LotesModule, UsuariosModule],
  controllers: [OfertasController],
  providers: [
    OfertasService,
    {
      provide: OFERTA_REPOSITORY,
      useClass: OfertaMemoriaRepository,
    },
  ],
  exports: [OfertasService],
})
export class OfertasModule {}