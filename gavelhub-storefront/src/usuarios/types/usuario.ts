import type { UsuarioRol } from '../../common/types/enums';
import type { Venta } from '../../ventas/types/venta';
import type { Lote } from '../../lotes/types/lote';
import type { Oferta } from '../../ofertas/types/oferta';

export interface Usuario {
  id: string;
  correo: string;
  rol: UsuarioRol;
  
  // Relaciones
  ventas?: Venta[];
  lotes?: Lote[];
  ofertas?: Oferta[];
}

// Credenciales para la autenticación
export interface LoginCredentials {
  correo: string;
  contrasena: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}