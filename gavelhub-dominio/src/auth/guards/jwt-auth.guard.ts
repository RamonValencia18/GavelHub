import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../dominio/usuario';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extraerTokenDelHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token de autenticación no proporcionado');
        }

        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Credencial inválida o expirada');
        }

        return true;
    }

    private extraerTokenDelHeader(request: Request): string | undefined {
        const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
}