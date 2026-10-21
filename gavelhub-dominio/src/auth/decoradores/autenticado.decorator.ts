import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from '../dominio/usuario';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function Autenticado(...roles: Rol[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(JwtAuthGuard, RolesGuard),
    );
}