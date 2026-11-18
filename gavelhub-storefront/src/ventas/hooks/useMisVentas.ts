import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { ventasService } from '../services/ventasService';
import type { VentaConDetalle } from '../types/venta';

// El mensaje que ve la persona, nunca el técnico.
function mensajeAmigable(e: unknown): string {
  if (isAxiosError(e) && e.response?.status === 401) {
    return 'Tu sesión terminó. Vuelve a iniciar sesión.';
  }
  if (isAxiosError(e) && !e.response) {
    return 'No pudimos comunicarnos con el servicio. Revisa tu conexión e inténtalo de nuevo.';
  }
  return 'Ocurrió un problema al cargar tus lotes ganados. Inténtalo de nuevo.';
}

export function useMisVentas() {
  const [ventas, setVentas] = useState<VentaConDetalle[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setVentas(await ventasService.listarMias());
    } catch (e) {
      setError(mensajeAmigable(e));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  return { ventas, cargando, error, recargar: cargar };
}