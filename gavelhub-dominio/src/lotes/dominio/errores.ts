export class LoteNoEncontradoError extends Error {
  constructor(loteId: string) {
    super(`No existe el lote ${loteId}`);
  }
}

export class LoteNoAbiertoError extends Error {
  constructor(id: string) {
    super(`El lote con id ${id} no está abierto para recibir ofertas`);
  }
}

export class SubastaFueraDeTiempoError extends Error {
  constructor(loteId: string, estadoActual: string) {
    super(
      `El lote ${loteId} no acepta ofertas en este momento. Estado actual: ${estadoActual}.`,
    );
  }
}
