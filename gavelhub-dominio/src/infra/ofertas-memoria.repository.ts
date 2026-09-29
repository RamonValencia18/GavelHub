import { Injectable } from "@nestjs/common";
import { OFERTAS_SEED } from "src/datos/gavelhub.seed";
import { Oferta } from "src/dominio/entidades";
import { OfertaRepository } from "src/dominio/ofertas.repository";

@Injectable()
export class OfertaMemoriaRepository implements OfertaRepository {
  private ofertas: Oferta[] = [...OFERTAS_SEED];
  private siguienteId = 3;

  async buscarPorLote(loteId: number): Promise<Oferta[]> {
    return this.ofertas;
  }

  async obtenerOfertaMayor(loteId: number): Promise<Oferta | null> {
    if (this.ofertas.length === 0) return null;
    return this.ofertas.reduce((max, o) => (o.cantidad > max.cantidad ? o : max));
  }

  async guardar(datos: Omit<Oferta, 'id'>): Promise<Oferta> {
    const nueva: Oferta = { id: this.siguienteId++, ...datos };
    this.ofertas.push(nueva);
    return nueva;
  }
}