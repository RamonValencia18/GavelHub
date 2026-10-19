import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { VentaMemoriaRepository } from '../infra/ventas-memoria.repository';
import { VENTA_REPOSITORY } from './ventas.tokens';
import { LotesModule } from '../lotes/lotes.module';

@Module({
  imports: [LotesModule],
  controllers: [VentasController],
  providers: [
    VentasService,
    {
      provide: VENTA_REPOSITORY,
      useClass: VentaMemoriaRepository,
    },
  ],
  exports: [VentasService],
})
export class VentasModule {}