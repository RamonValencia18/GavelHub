import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTH_USUARIO_REPOSITORY } from './usuarios.tokens';
import { PrismaUsuarioAuthRepository } from './infra/usuario-prisma.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error('Falta la variable de entorno JWT_SECRET');
        }
        const expiresIn = Number(process.env.JWT_EXPIRES_IN ?? 3600);
        if (!Number.isInteger(expiresIn) || expiresIn <= 0) {
          throw new Error('JWT_EXPIRES_IN debe ser un número de segundos');
        }
        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_USUARIO_REPOSITORY,
      useClass: PrismaUsuarioAuthRepository,
    },
  ],
})
export class AuthModule {}
