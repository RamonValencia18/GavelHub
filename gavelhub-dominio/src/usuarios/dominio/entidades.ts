export type UsuarioRol = 'Administrador' | 'Participante';

export interface Usuario{
    id: number;
    correo: string;
    contrasena: string;
    rol: UsuarioRol;
}