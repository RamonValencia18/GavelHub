export class OfertaInsuficienteError extends Error {
  constructor(montoOfrecido: number, montoMinimoRequerido: number) {
    super(
      `La oferta de $${montoOfrecido} fue rechazada. El monto minimo valido es $${montoMinimoRequerido} (oferta actual + incremento minimo).`,
    );
  }
}

export class OfertaInvalidaError extends Error {
  constructor(montoOfrecido: number) {
    super(
      `El monto de la oferta ($${montoOfrecido}) no es valido. Debe ser mayor a cero.`,
    );
  }
}
export class FueraDePeriodoError extends Error {
  constructor(loteId: string, estadoActual: string) {
    super(
      `El lote ${loteId} no acepta ofertas en este momento. Estado actual: ${estadoActual}.`,
    );
  }
}
