import { randomUUID } from 'node:crypto';
import { Oferta } from '../dominio/entidades';
import { OfertaRepository } from '../dominio/ofertas.repository';

export class InMemoryOfertaRepository implements OfertaRepository {
  constructor(private readonly ofertas: Oferta[] = []) {}

  async buscarPorLote(loteId: string): Promise<Oferta[]> {
    return this.ofertas
      .filter((oferta) => oferta.loteId === loteId)
      .sort((a, b) => b.cantidad - a.cantidad);
  }

  async obtenerOfertaMayor(loteId: string): Promise<Oferta | null> {
    return (
      (await this.buscarPorLote(loteId))[0] ?? null
    );
  }

  async guardar(oferta: Omit<Oferta, 'id'>): Promise<Oferta> {
    const nuevaOferta: Oferta = { ...oferta, id: randomUUID() };
    this.ofertas.push(nuevaOferta);
    return nuevaOferta;
  }
}
