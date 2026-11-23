import { ObjectId } from 'mongodb'

export const GENEROS = ['Drama', 'Comedia', 'Ciencia ficción', 'Animación', 'Documental']
export const ESTADOS = ['Por ver', 'Viendo', 'Vista']

export function validarSerie(datos = {}) {
  datos = datos ?? {}
  const errores = {}
  if (typeof datos.titulo !== 'string' || datos.titulo.trim().length < 2) {
    errores.titulo = 'Escriba un título de al menos 2 caracteres.'
  }
  if (!GENEROS.includes(datos.genero)) errores.genero = 'Elija un género de la lista.'
  if (!Number.isInteger(datos.temporadas) || datos.temporadas < 1 || datos.temporadas > 30) {
    errores.temporadas = 'Indique un número entero entre 1 y 30.'
  }
  if (typeof datos.miembroId !== 'string' || !ObjectId.isValid(datos.miembroId)) {
    errores.miembroId = 'Indique quién propone la serie.'
  }
  return errores
}

export function validarEstado(datos = {}) {
  const errores = {}
  if (!ESTADOS.includes(datos?.estado)) {
    errores.estado = `El estado debe ser: ${ESTADOS.join(', ')}.`
  }
  return errores
}
