// Las reglas de miembros son la entrada pública para los demás módulos.
import * as repositorio from './miembros.repository.js'

export async function listar() {
  return repositorio.listar()
}

export async function existe(id) {
  return (await repositorio.buscarPorId(id)) !== null
}
