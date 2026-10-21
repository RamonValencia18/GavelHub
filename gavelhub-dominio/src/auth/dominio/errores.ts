export class CorreoYaRegistradoError extends Error {
  constructor(correo: string) {
    super(`El correo ${correo} ya está registrado`);
  }
}
export class CredencialesInvalidasError extends Error {
  constructor() {
    super(`Correo o contraseña inválidos`);
  }
}
