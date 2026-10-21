import { Module } from '@nestjs/common';
import { LotesController } from './lotes.controller';
import { LotesService } from './lotes.service';
import { LOTE_REPOSITORY } from './lotes.tokens';
import { PrismaLoteRepository } from './infra/lote-prisma.repository';

@Module({
  controllers: [LotesController],
  providers: [
    LotesService,
    {
      provide: LOTE_REPOSITORY,
      useClass: PrismaLoteRepository,
    },
  ],
  exports: [LotesService, LOTE_REPOSITORY],
})
export class LotesModule {}
