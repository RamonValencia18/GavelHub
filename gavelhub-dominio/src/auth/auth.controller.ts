import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistroDto } from './dtos/auth.dto';
import type { JwtPayload } from './dominio/usuario';
import {
  CorreoYaRegistradoError,
  CredencialesInvalidasError,
} from './dominio/errores';
import { Autenticado } from './decoradores/autenticado.decorator';
import { UsuarioActual } from './decoradores/usuario-actual.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registrar')
  async registrar(@Body() dto: RegistroDto) {
    try {
      return await this.authService.registrar(dto);
    } catch (error) {
      if (error instanceof CorreoYaRegistradoError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      if (error instanceof CredencialesInvalidasError) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }

  @Get('perfil')
  @Autenticado()
  perfil(@UsuarioActual() usuario: JwtPayload) {
    return usuario;
  }
}