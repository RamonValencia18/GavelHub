import { Inject, Injectable } from '@nestjs/common';
import type { LoteRepository } from '../dominio/lotes.repository';
import { LOTE_REPOSITORY, LOTE_MEDIA_REPOSITORY } from './lotes.tokens';
import { Lote, LoteMedia } from '../dominio/entidades';

@Injectable()
export class LotesService {
  constructor(
    @Inject(LOTE_REPOSITORY)
    private readonly loteRepo: LoteRepository,
  ) {}

  listar(): Promise<Lote[]> {
    return this.loteRepo.listar();
  }

  buscarPorId(id: number): Promise<Lote | null> {
    return this.loteRepo.buscarPorId(id);
  }

  crear(datos: Omit<Lote, 'id'>): Promise<Lote> {
    return this.loteRepo.guardar(datos);
  }

  actualizarEstado(id: number, estado: Lote['estado']): Promise<Lote | null> {
    return this.loteRepo.actualizarEstado(id, estado);
  }

  obtenerMedia(loteId: number): Promise<LoteMedia[]> {
    return this.loteRepo.buscarImagenesPorLote(loteId);
  }
}