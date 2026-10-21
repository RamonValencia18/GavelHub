export class UsuarioNoEncontradoError extends Error {
  constructor(usuarioId: string) {
    super(`No existe el usuario ${usuarioId}`);
  }
}
