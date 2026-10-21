import { Oferta } from './entidades';

export interface OfertaRepository {
  buscarPorLote(loteId: string): Promise<Oferta[]>;
  obtenerOfertaMayor(loteId: string): Promise<Oferta | null>;
  guardar(oferta: Omit<Oferta, 'id'>): Promise<Oferta>;
}
