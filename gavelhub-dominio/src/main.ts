import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DominioExceptionFilter } from './comun/filtros/dominio.filters';
import { RespuestaUniformeInterceptor } from './comun/interceptores/respuesta-uniforme.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin === frontendUrl) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  });

  app.useGlobalFilters(new DominioExceptionFilter());

  app.useGlobalInterceptors(new RespuestaUniformeInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('GavelHub API')
    .setDescription('API para la gestión de subastas y ventas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documento);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
