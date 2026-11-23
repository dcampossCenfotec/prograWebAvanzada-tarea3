// utils/HttpError.js
// Un error que ya sabe con qué código HTTP debe responderse.

export class HttpError extends Error {
  constructor(estado, codigo, mensaje, detalles) {
    super(mensaje)
    this.estado = estado
    this.codigo = codigo
    this.detalles = detalles
  }
}
