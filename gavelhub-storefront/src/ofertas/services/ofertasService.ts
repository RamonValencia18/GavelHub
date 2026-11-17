import { api } from '../../common/api/client';
import type { Oferta } from '../types/oferta';

export interface CrearOfertaDto {
  cantidad: number;
}

export const ofertasService = {
  /**
   * Obtiene el historial público de ofertas de un lote.
   * GET /api/lotes/:loteId/ofertas
   */
  async obtenerHistorialPorLote(loteId: string): Promise<Oferta[]> {
    const response = await api.get<Oferta[]>(`/lotes/${loteId}/ofertas`);
    // Si el RespuestaUniformeInterceptor envuelve la data, Axios o el interceptor la entregan
    return response.data;
  },

  /**
   * Envía una nueva oferta al Servidor Central NestJS.
   * POST /api/lotes/:loteId/ofertas
   * 
   * Nota: El usuarioId se extrae automáticamente en el servidor vía JWT Header Bearer.
   */
  async realizarOferta(loteId: string, cantidad: number): Promise<Oferta> {
    try {
      const response = await api.post<Oferta>(`/lotes/${loteId}/ofertas`, {
        cantidad,
      });
      return response.data;
    } catch (error: any) {
      // Manejo estricto de excepciones lanzadas por OfertasController
      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          throw new Error('Inicia sesión para realizar una oferta.');
        }

        // 409 Conflict: OfertaInsuficienteError o LoteNoAbiertoError
        if (status === 409) {
          throw new Error('Tu oferta no fue aceptada. Revisa el monto mínimo e inténtalo nuevamente.');
        }

        // 404 Not Found: LoteNoEncontradoError o UsuarioNoEncontradoError
        if (status === 404) {
          throw new Error('Este lote ya no está disponible o tu sesión no pudo verificarse.');
        }
      }

      throw new Error(
        'No pudimos completar tu solicitud en este momento. Inténtalo de nuevo.'
      );
    }
  },
};