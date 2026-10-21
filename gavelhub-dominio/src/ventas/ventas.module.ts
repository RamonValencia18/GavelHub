import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { VENTA_REPOSITORY } from './ventas.tokens';
import { LotesModule } from '../lotes/lotes.module';
import { PrismaVentaRepository } from './ventas-prisma.repository';

@Module({
  imports: [LotesModule],
  controllers: [VentasController],
  providers: [
    VentasService,
    {
      provide: VENTA_REPOSITORY,
      useClass: PrismaVentaRepository,
    },
  ],
  exports: [VentasService],
})
export class VentasModule {}
