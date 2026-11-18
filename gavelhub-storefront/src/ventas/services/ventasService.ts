import { api, obtenerDatos } from '../../common/api/client';
import { listarLotes } from '../../lotes/services/lotesService';
import type { Oferta } from '../../ofertas/types/oferta';
import type { Venta, VentaConDetalle } from '../types/venta';

export const ventasService = {
  async listarMisLotes(): Promise<Venta[]> {
    const respuesta = await api.get<Venta[]>('/ventas/mis-lotes');
    return obtenerDatos(respuesta);
  },

  /** Ventas del usuario con su lote y el monto adjudicado. */
  async listarMias(): Promise<VentaConDetalle[]> {
    const [ventas, lotes] = await Promise.all([
      ventasService.listarMisLotes(),
      listarLotes(),
    ]);
    const porId = new Map(lotes.map((lote) => [lote.id, lote]));

    return Promise.all(
      ventas.map(async (venta) => {
        let monto: number | undefined;
        try {
          const respuesta = await api.get<Oferta>(`/lotes/${venta.loteId}/ofertas/mayor`);
          monto = obtenerDatos(respuesta).cantidad;
        } catch {
          monto = undefined; // si no se obtiene el monto, la venta se muestra igual
        }
        return { ...venta, lote: porId.get(venta.loteId), monto };
      }),
    );
  },
};