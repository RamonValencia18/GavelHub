import { useState } from 'react';
import { ofertasService } from '../services/ofertasService';

export const useRealizarOferta = () => {
  const [enviando, setEnviando] = useState<boolean>(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  const limpiarError = () => setErrorMensaje(null);

  const enviarOferta = async (
    loteId: string,
    cantidad: number,
    minimoRequerido: number
  ): Promise<boolean> => {
    limpiarError();

    // 1. Validación preventiva local
    if (cantidad < minimoRequerido) {
      const formatoMinimo = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
      }).format(minimoRequerido);

      setErrorMensaje(
        `La oferta no se aceptó porque el monto mínimo requerido para superar la oferta actual es ${formatoMinimo}.`
      );
      return false;
    }

    try {
      setEnviando(true);
      // 2. Invocación exacta al endpoint POST /lotes/:loteId/ofertas
      await ofertasService.realizarOferta(loteId, cantidad);
      return true;
    } catch (err: any) {
      // Captura el mensaje devuelto por el ConflictException (409) de NestJS
      setErrorMensaje(err.message);
      return false;
    } finally {
      setEnviando(false);
    }
  };

  return {
    enviando,
    errorMensaje,
    enviarOferta,
    limpiarError,
  };
};