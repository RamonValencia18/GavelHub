import { Inject, Injectable } from '@nestjs/common';
import type { OfertaRepository } from './dominio/ofertas.repository';
import { OFERTA_REPOSITORY } from './ofertas.tokens';
import { Oferta } from './dominio/entidades';
import { LotesService } from '../lotes/lotes.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CrearOfertaDto } from './dto/crear-oferta.dto.js';
import { OfertaInsuficienteError } from './dominio/errores';
import {
  LoteNoEncontradoError,
  LoteNoAbiertoError,
} from '../lotes/dominio/errores.js';
import { UsuarioNoEncontradoError } from '../usuarios/dominio/errores.js';
@Injectable()
export class OfertasService {
  constructor(
    @Inject(OFERTA_REPOSITORY)
    private readonly ofertaRepo: OfertaRepository,
    private readonly lotesService: LotesService,
    private readonly usuariosService: UsuariosService,
  ) {}

  listarPorLote(loteId: string): Promise<Oferta[]> {
    return this.ofertaRepo.buscarPorLote(loteId);
  }

  obtenerMayorOferta(loteId: string): Promise<Oferta | null> {
    return this.ofertaRepo.obtenerOfertaMayor(loteId);
  }

  async crear(loteId: string, dto: CrearOfertaDto): Promise<Oferta> {
    const lote = await this.lotesService.buscarPorId(loteId);
    if (!lote) {
      throw new LoteNoEncontradoError(loteId);
    }

    const usuario = await this.usuariosService.buscarPorId(dto.usuarioId);
    if (!usuario) {
      throw new UsuarioNoEncontradoError(dto.usuarioId);
    }

    if (lote.estado !== 'ABIERTO') {
      throw new LoteNoAbiertoError(loteId);
    }

    const ofertaMayor = await this.ofertaRepo.obtenerOfertaMayor(loteId);
    const montoMinimo = ofertaMayor
      ? ofertaMayor.cantidad + lote.incrementoMinimo
      : lote.precioSalida;

    if (dto.cantidad < montoMinimo) {
      throw new OfertaInsuficienteError(dto.cantidad, montoMinimo);
    }

    return this.ofertaRepo.guardar({
      loteId,
      usuarioId: dto.usuarioId,
      cantidad: dto.cantidad,
      estado: 'ACEPTADA',
      fechaHora: new Date(),
    });
  }
}
