import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RespuestaUniforme<T> {
    exito: boolean;
    datos: T;
    timestamp: string;
}

@Injectable()
export class RespuestaUniformeInterceptor<T>
    implements NestInterceptor<T, RespuestaUniforme<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<RespuestaUniforme<T>> {
        const request = context.switchToHttp().getRequest();

        if (request.url?.startsWith('/api')) {
            return next.handle();
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