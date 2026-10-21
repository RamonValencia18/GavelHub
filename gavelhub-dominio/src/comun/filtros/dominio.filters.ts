import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

// Imports de errores desde los distintos módulos
import {
  LoteNoAbiertoError,
  LoteNoEncontradoError,
  SubastaFueraDeTiempoError,
} from '../../lotes/dominio/errores';
import {
  FueraDePeriodoError,
  OfertaInsuficienteError,
  OfertaInvalidaError,
} from '../../ofertas/dominio/errores';
import {
  ParticipanteBloqueadoError,
  UsuarioNoEncontradoError,
} from '../../usuarios/dominio/errores';
import {
  MontoInsuficienteError,
  VentaExistenteError,
  VentaNoEncontradaError,
} from '../../ventas/dominio/errores';

// Clase base o alias tipo Unión para atrapar todos los errores de dominio
export type ErrorDeDominio =
  | LoteNoEncontradoError
  | LoteNoAbiertoError
  | SubastaFueraDeTiempoError
  | OfertaInsuficienteError
  | OfertaInvalidaError
  | FueraDePeriodoError
  | UsuarioNoEncontradoError
  | ParticipanteBloqueadoError
  | VentaExistenteError
  | VentaNoEncontradaError
  | MontoInsuficienteError;

// Captura cualquier clase de error especificada en la lista o que herede de Error
@Catch(
  LoteNoEncontradoError,
  LoteNoAbiertoError,
  SubastaFueraDeTiempoError,
  OfertaInsuficienteError,
  OfertaInvalidaError,
  FueraDePeriodoError,
  UsuarioNoEncontradoError,
  ParticipanteBloqueadoError,
  VentaExistenteError,
  VentaNoEncontradaError,
  MontoInsuficienteError,
)
export class DominioExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Dominio');

  private codigoPara(error: ErrorDeDominio): number {
    // 404 NOT FOUND: Recursos inexistentes
    if (
      error instanceof LoteNoEncontradoError ||
      error instanceof UsuarioNoEncontradoError ||
      error instanceof VentaNoEncontradaError
    ) {
      return HttpStatus.NOT_FOUND;
    }

    // 400 BAD REQUEST: Datos inválidos enviados por el cliente
    if (error instanceof OfertaInvalidaError) {
      return HttpStatus.BAD_REQUEST;
    }

    // 403 FORBIDDEN: El usuario existe pero no tiene permitido realizar acciones
    if (error instanceof ParticipanteBloqueadoError) {
      return HttpStatus.FORBIDDEN;
    }

    // 409 CONFLICT: Reglas de negocio de la subasta/venta en conflicto con el estado actual
    if (
      error instanceof LoteNoAbiertoError ||
      error instanceof SubastaFueraDeTiempoError ||
      error instanceof FueraDePeriodoError ||
      error instanceof OfertaInsuficienteError ||
      error instanceof VentaExistenteError ||
      error instanceof MontoInsuficienteError
    ) {
      return HttpStatus.CONFLICT;
    }

    // Respaldo por si algún error no entra en los casos anteriores
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  catch(error: ErrorDeDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<{ url: string; method: string }>();
    const estado = this.codigoPara(error);

    this.logger.warn(
      `${req.method} ${req.url} -> ${estado} ${error.constructor.name}`,
    );

    res.status(estado).json({
      statusCode: estado,
      error: error.constructor.name,
      message: error.message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}