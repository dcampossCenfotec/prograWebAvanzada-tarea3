import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ESTADOS } from '../data/series.js'
import { siguienteEstado } from '../utils/series.js'
import { obtenerSeries, obtenerMiembros, cambiarEstadoSerie, eliminarSerie } from '../api/seriesApi.js'
import Panel from '../componentes/comunes/Panel.jsx'
import ListaSeries from '../componentes/series/ListaSeries.jsx'
import Filtros from '../componentes/filtros/Filtros.jsx'
import Resumen from '../componentes/resumen/Resumen.jsx'

export default function PaginaSeries() {
  const [series, setSeries] = useState([])
  const [miembros, setMiembros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [pendientes, setPendientes] = useState([])
  const enCurso = useRef(new Set())
  const [parametros, setParametros] = useSearchParams()
  const filtroEstado = parametros.get('estado') ?? 'Todos'
  const filtroMiembro = parametros.get('miembro') ?? 'Todos'

  useEffect(() => {
    const controlador = new AbortController()
    async function cargar() {
      try {
        const [listaSeries, listaMiembros] = await Promise.all([
          obtenerSeries(controlador.signal), obtenerMiembros(controlador.signal),
        ])
        setSeries(listaSeries)
        setMiembros(listaMiembros)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controlador.signal.aborted) setCargando(false)
      }
    }
    cargar()
    return () => controlador.abort()
  }, [])

  function cambiarFiltro(nombre, valor) {
    const nuevos = new URLSearchParams(parametros)
    if (valor === 'Todos') nuevos.delete(nombre)
    else nuevos.set(nombre, valor)
    setParametros(nuevos)
  }
  function limpiarFiltros() {
    const nuevos = new URLSearchParams(parametros)
    nuevos.delete('estado')
    nuevos.delete('miembro')
    setParametros(nuevos)
  }

  async function modificar(id, operacion) {
    if (enCurso.current.has(id)) return
    enCurso.current.add(id)
    setPendientes([...enCurso.current])
    setError('')
    try { await operacion() }
    catch (err) { setError(err.message) }
    finally {
      enCurso.current.delete(id)
      setPendientes([...enCurso.current])
    }
  }
  function avanzar(id) {
    const actual = series.find((serie) => serie._id === id)
    if (!actual) return
    return modificar(id, async () => {
      const actualizada = await cambiarEstadoSerie(id, siguienteEstado(actual.estado))
      setSeries((actuales) => actuales.map((serie) => serie._id === id ? actualizada : serie))
    })
  }
  function quitar(id) {
    return modificar(id, async () => {
      await eliminarSerie(id)
      setSeries((actuales) => actuales.filter((serie) => serie._id !== id))
    })
  }
  const visibles = series.filter((serie) =>
    (filtroEstado === 'Todos' || serie.estado === filtroEstado) &&
    (filtroMiembro === 'Todos' || serie.miembro === filtroMiembro))
  const conteos = ESTADOS.map((estado) => ({ estado, cantidad: series.filter((s) => s.estado === estado).length }))

  return <>
    <div className="d-flex justify-content-between align-items-center mb-4"><h2>Series del club</h2>
      <Link className="btn btn-primary" to="/series/nueva">+ Agregar una serie</Link></div>
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    {cargando ? <p role="status">Cargando series…</p> : <div className="row g-4 tablero">
      <div className="col-12 col-lg-8 tablero-principal">
        <Panel titulo="Filtros"><Filtros miembros={miembros} estado={filtroEstado} miembro={filtroMiembro}
          onCambiarEstado={(valor) => cambiarFiltro('estado', valor)}
          onCambiarMiembro={(valor) => cambiarFiltro('miembro', valor)} onLimpiar={limpiarFiltros} /></Panel>
        <Panel titulo={`Series del club (${visibles.length})`}><ListaSeries series={visibles}
          onAvanzar={avanzar} onQuitar={quitar} pendientes={pendientes} /></Panel>
      </div><div className="col-12 col-lg-4 tablero-resumen"><Panel titulo="Resumen"><Resumen conteos={conteos} /></Panel></div>
    </div>}
  </>
}
