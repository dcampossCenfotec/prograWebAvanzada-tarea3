import * as servicio from './series.service.js'

export async function listar(req, res) {
  res.json(await servicio.listar())
}

export async function obtener(req, res) {
  res.json(await servicio.obtener(req.params.id))
}

export async function crear(req, res) {
  res.status(201).json(await servicio.crear(req.body ?? {}))
}

export async function cambiarEstado(req, res) {
  res.json(await servicio.cambiarEstado(req.params.id, req.body ?? {}))
}

export async function eliminar(req, res) {
  await servicio.eliminar(req.params.id)
  res.status(204).end()
}
