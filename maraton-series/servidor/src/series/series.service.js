import { ObjectId } from 'mongodb'
import * as repositorio from './series.repository.js'
import * as miembros from '../miembros/miembros.service.js'
import { validarSerie, validarEstado } from './series.validacion.js'
import { HttpError } from '../utils/HttpError.js'
import { revisarId } from '../utils/revisarId.js'

function revisarDatos(errores) {
  if (Object.keys(errores).length) {
    throw new HttpError(400, 'DATOS_INVALIDOS', 'Revise los datos enviados.', errores)
  }
}

function noEncontrada() {
  return new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.')
}

export async function listar() {
  return repositorio.listar()
}

export async function obtener(id) {
  revisarId(id)
  const serie = await repositorio.buscarPorId(id)
  if (!serie) throw noEncontrada()
  return serie
}

export async function crear(datos) {
  revisarDatos(validarSerie(datos))
  if (!(await miembros.existe(datos.miembroId))) {
    revisarDatos({ miembroId: 'Ese miembro no existe.' })
  }
  const id = await repositorio.crear({
    titulo: datos.titulo.trim(), genero: datos.genero, temporadas: datos.temporadas,
    estado: 'Por ver', miembroId: new ObjectId(datos.miembroId), calificaciones: [],
  })
  return repositorio.buscarPorId(id)
}

export async function cambiarEstado(id, datos) {
  revisarId(id)
  revisarDatos(validarEstado(datos))
  if (!(await repositorio.cambiarEstado(id, datos.estado))) throw noEncontrada()
  const serie = await repositorio.buscarPorId(id)
  if (!serie) throw noEncontrada()
  return serie
}

export async function eliminar(id) {
  revisarId(id)
  if (!(await repositorio.eliminar(id))) throw noEncontrada()
}
