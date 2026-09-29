import { Module } from '@nestjs/common';
import { LotesController } from './lotes.controller';
import { LotesService } from './lotes.service';
import { LoteMemoriaRepository } from '../infra/lotes-memoria.repository';
import { LOTE_REPOSITORY, LOTE_MEDIA_REPOSITORY } from './lotes.tokens';

@Module({
  controllers: [LotesController],
  providers: [
    LotesService,
    {
      provide: LOTE_REPOSITORY,
      useClass: LoteMemoriaRepository,
    },
  ],
  exports: [LotesService, LOTE_REPOSITORY],
})
export class LotesModule {}