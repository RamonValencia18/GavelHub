import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol, JwtPayload } from '../dominio/usuario';
import { ROLES_KEY } from '../decoradores/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesRequeridos || rolesRequeridos.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: JwtPayload }>();

    if (!user || !user.rol) {
      throw new ForbiddenException(
        'No cuentas con permisos para acceder a este recurso',
      );
    }

    const tienePermiso = rolesRequeridos.some((rol) => user.rol === rol);

    if (!tienePermiso) {
      throw new ForbiddenException(
        `Acceso denegado: se requiere rol [${rolesRequeridos.join(', ')}] pero tienes [${user.rol}]`,
      );
    }

    return true;
  }
}
