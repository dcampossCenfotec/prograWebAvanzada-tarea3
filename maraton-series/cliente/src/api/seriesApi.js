const URL_API = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

async function pedir(ruta, metodo = 'GET', datos, senal) {
  if (!URL_API) throw new Error('Falta configurar VITE_API_URL en cliente/.env.')
  const opciones = { method: metodo, signal: senal }
  if (datos !== undefined) {
    opciones.headers = { 'Content-Type': 'application/json' }
    opciones.body = JSON.stringify(datos)
  }
  let respuesta
  try {
    respuesta = await fetch(URL_API + ruta, opciones)
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new Error('No se pudo conectar con el API. ¿Está encendido el servidor?')
  }
  if (respuesta.status === 204) return null
  let cuerpo
  try {
    cuerpo = await respuesta.json()
  } catch (err) {
    if (err.name === 'AbortError') throw err
    const error = new Error('El API no devolvió una respuesta JSON válida.')
    error.estado = respuesta.status
    throw error
  }
  if (!respuesta.ok) {
    const error = new Error(cuerpo.error?.mensaje ?? `El API respondió ${respuesta.status}.`)
    error.detalles = cuerpo.error?.detalles
    error.estado = respuesta.status
    throw error
  }
  return cuerpo
}

export function obtenerSeries(senal) { return pedir('/series', 'GET', undefined, senal) }
export function obtenerSerie(id, senal) { return pedir(`/series/${encodeURIComponent(id)}`, 'GET', undefined, senal) }
export function obtenerMiembros(senal) { return pedir('/miembros', 'GET', undefined, senal) }
export function crearSerie(datos) { return pedir('/series', 'POST', datos) }
export function cambiarEstadoSerie(id, estado) { return pedir(`/series/${encodeURIComponent(id)}/estado`, 'PATCH', { estado }) }
export function eliminarSerie(id) { return pedir(`/series/${encodeURIComponent(id)}`, 'DELETE') }
