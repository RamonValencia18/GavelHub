export class UsuarioNoEncontradoError extends Error {
    constructor(usuarioId: number){
        super(`No existe el usuario ${usuarioId}`);
    }
}

export class LoteNoEncontradoError extends Error {
    constructor(loteId: number){
        super(`No existe el lote ${loteId}`);
    }
}

export class LoteNoAbiertoError extends Error {
  constructor(id: number) {
    super(`El lote con id ${id} no está abierto para recibir ofertas`);
  }
}

export class OfertaInsuficienteError extends Error {
    constructor(montoOfrecido: number, montoMinimoRequerido: number) {
        super(`La oferta de $${montoOfrecido} fue rechazada. El monto minimo valido es $${montoMinimoRequerido} (oferta actual + incremento minimo).`);
    }
}

export class SubastaFueraDeTiempoError extends Error {
    constructor(loteId: number, estadoActual: string) {
        super(`El lote ${loteId} no acepta ofertas en este momento. Estado actual: ${estadoActual}.`);
    }
}

export class OfertaInvalidaError extends Error {
    constructor(montoOfrecido: number) {
        super(`El monto de la oferta ($${montoOfrecido}) no es valido. Debe ser mayor a cero.`);
    }
}