import { Oferta } from "./entidades";

export interface OfertaRepository {
  buscarPorLote(loteId: number): Promise<Oferta[]>;
  obtenerOfertaMayor(loteId: number): Promise<Oferta | null>;
  guardar(oferta: Omit<Oferta, 'id'>): Promise<Oferta>;
}