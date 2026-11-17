import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RespuestaUniforme<T> {
  exito: boolean;
  datos: T | null;
  timestamp: string;
}

@Injectable()
export class RespuestaUniformeInterceptor<T> implements NestInterceptor<
  T,
  RespuestaUniforme<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<RespuestaUniforme<T>> {
    const request = context.switchToHttp().getRequest<{ url?: string }>();

    if (request.url?.startsWith('/api')) {
      return next.handle() as Observable<RespuestaUniforme<T>>;
    }

    return next.handle().pipe(
      map((datos) => ({
        exito: true,
        datos: datos ?? null,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
