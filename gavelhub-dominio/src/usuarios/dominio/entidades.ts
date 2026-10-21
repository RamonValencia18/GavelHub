export type UsuarioRol = 'ADMIN' | 'USER';

export interface Usuario {
  id: string;
  correo: string;
  contrasena: string;
  rol: UsuarioRol;
}
