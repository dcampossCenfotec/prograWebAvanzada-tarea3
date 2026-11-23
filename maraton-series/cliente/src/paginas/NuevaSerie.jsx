import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { crearSerie, obtenerMiembros } from '../api/seriesApi.js'
import Panel from '../componentes/comunes/Panel.jsx'
import FormularioSerie from '../componentes/formulario/FormularioSerie.jsx'

export default function NuevaSerie() {
  const navigate = useNavigate()
  const [miembros, setMiembros] = useState([])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
  useEffect(() => {
    const controlador = new AbortController()
    async function cargar() {
      try { setMiembros(await obtenerMiembros(controlador.signal)) }
      catch (err) { if (err.name !== 'AbortError') setError(err.message) }
      finally { if (!controlador.signal.aborted) setCargando(false) }
    }
    cargar()
    return () => controlador.abort()
  }, [])
  async function agregar(datos) {
    await crearSerie(datos)
    navigate('/series')
  }
  return <div className="row justify-content-center"><div className="col-md-8 col-lg-6">
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    {cargando ? <p role="status">Cargando miembros…</p> : !error &&
      <Panel titulo="Agregar una serie"><FormularioSerie miembros={miembros} onAgregar={agregar} /></Panel>}
    <Link to="/series">← Volver a las series</Link>
  </div></div>
}
