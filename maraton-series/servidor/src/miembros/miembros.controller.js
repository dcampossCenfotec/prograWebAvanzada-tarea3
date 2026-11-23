import * as servicio from './miembros.service.js'

export async function listar(req, res) {
  res.json(await servicio.listar())
}
