import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentasModule } from './ventas/ventas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OfertasModule } from './ofertas/ofertas.module';
import { LotesModule } from './lotes/lotes.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './comun/middleware/logging.middleware';

@Module({
  imports: [
    PrismaModule,
    LotesModule,
    OfertasModule,
    UsuariosModule,
    VentasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
