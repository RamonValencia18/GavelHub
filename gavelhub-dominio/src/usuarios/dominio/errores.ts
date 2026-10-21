export class UsuarioNoEncontradoError extends Error {
  constructor(usuarioId: string) {
    super(`No existe el usuario ${usuarioId}`);
  }
}
export class ParticipanteBloqueadoError extends Error {
  constructor(usuarioId: string) {
    super(
      `El usuario ${usuarioId} está bloqueado y no puede participar en la subasta`,
    );
  }
}
