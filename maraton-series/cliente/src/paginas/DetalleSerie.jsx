import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { obtenerSerie } from '../api/seriesApi.js'

export default function DetalleSerie() {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const controlador = new AbortController()
    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        setSerie(await obtenerSerie(id, controlador.signal))
      } catch (err) {
        if (err.name === 'AbortError') return
        setError({ mensaje: err.message, estado: err.estado })
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }
    cargar()
    return () => controlador.abort()
  }, [id])
  if (cargando) return <p role="status" className="py-5">Cargando serie…</p>
  if (error) return <section className="py-5" role="alert">
    <h2>{error.estado === 404 ? 'Serie no encontrada' : 'No se pudo cargar la serie'}</h2>
    <p>{error.mensaje}</p><Link to="/series">← Volver a las series</Link>
  </section>
  return <section className="py-4"><article className="tarjeta">
    <span className="insignia">{serie.estado}</span><h2>{serie.titulo}</h2>
    <dl><dt>Género</dt><dd>{serie.genero}</dd><dt>Temporadas</dt><dd>{serie.temporadas}</dd>
      <dt>Propuesta por</dt><dd>{serie.miembro}</dd></dl>
  </article><Link to="/series">← Volver a las series</Link></section>
}
