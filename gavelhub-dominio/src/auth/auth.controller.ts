import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dtos/auth.dto';
import { Usuario } from './dominio/usuario';

@Controller('auth')
export class AuthContreller {
    constructor(private readonly authService: AuthService) {}

    @Post('registrar')
    async registrar(dto: RegistroDto): Promise<Usuario> {
        return this.authService.registrar(dto);
    }

    @Post('login')
    @HttpCode(200)
    async login(correo: string, password: string): Promise<Usuario | null> {
        return this.authService.login(correo, password);
    }
    
}