export class UsuarioNoEncontradoError extends Error {
    constructor(usuarioId: number){
        super(`No existe el usuario ${usuarioId}`);
    }
}
