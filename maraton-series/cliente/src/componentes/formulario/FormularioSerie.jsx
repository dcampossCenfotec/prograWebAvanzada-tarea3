// Formulario controlado: valida los datos y se los entrega a App.
import { useState } from 'react'
import { GENEROS } from '../../data/series.js'
import { validarSerie } from '../../utils/validarSerie.js'

const VACIO = { titulo: '', genero: '', temporadas: '', miembroId: '' }

export default function FormularioSerie({ miembros = [], onAgregar }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})

  const [enviando, setEnviando] = useState(false)

  function cambiar(event) {
    const { name, value } = event.target
    setDatos({ ...datos, [name]: value })
  }

  async function enviar(event) {
    event.preventDefault()
    if (enviando) return
    const nuevosErrores = validarSerie(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    try {
      await onAgregar({ ...datos, titulo: datos.titulo.trim(), temporadas: Number(datos.temporadas) })
      setDatos(VACIO)
    } catch (err) {
      setErrores(err.detalles ?? { general: err.message })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario-serie" onSubmit={enviar} noValidate>
      {errores.general && <div className="alert alert-danger" role="alert">{errores.general}</div>}
      <p className="texto-ayuda">Comparte una recomendación. Empezará en «Por ver».</p>
      <div className="campo-formulario">
        <label htmlFor="titulo" className="form-label">Título</label>
        <input id="titulo" name="titulo"
          className={errores.titulo ? 'form-control is-invalid' : 'form-control'}
          value={datos.titulo} onChange={cambiar}
          aria-invalid={Boolean(errores.titulo)}
          aria-describedby={errores.titulo ? 'error-titulo' : undefined} type="text" placeholder="Ej. Severance" />
        {errores.titulo && <div id="error-titulo" className="invalid-feedback" role="alert">{errores.titulo}</div>}
      </div>
      <div className="campo-formulario">
        <label htmlFor="genero" className="form-label">Género</label>
        <select id="genero" name="genero"
          className={errores.genero ? 'form-select is-invalid' : 'form-select'}
          value={datos.genero} onChange={cambiar}
          aria-invalid={Boolean(errores.genero)}
          aria-describedby={errores.genero ? 'error-genero' : undefined}>
          <option value="">Elija…</option>
          {GENEROS.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
        </select>
        {errores.genero && <div id="error-genero" className="invalid-feedback" role="alert">{errores.genero}</div>}
      </div>
      <div className="campo-formulario">
        <label htmlFor="temporadas" className="form-label">Temporadas</label>
        <input id="temporadas" name="temporadas"
          className={errores.temporadas ? 'form-control is-invalid' : 'form-control'}
          value={datos.temporadas} onChange={cambiar}
          aria-invalid={Boolean(errores.temporadas)}
          aria-describedby={errores.temporadas ? 'error-temporadas' : undefined} type="number" min="1" max="30" step="1" />
        {errores.temporadas && <div id="error-temporadas" className="invalid-feedback" role="alert">{errores.temporadas}</div>}
      </div>
      <div className="campo-formulario">
        <label htmlFor="miembroId" className="form-label">Propuesta por</label>
        <select id="miembroId" name="miembroId"
          className={errores.miembroId ? 'form-select is-invalid' : 'form-select'}
          value={datos.miembroId} onChange={cambiar}
          aria-invalid={Boolean(errores.miembroId)}
          aria-describedby={errores.miembroId ? 'error-miembroId' : undefined}>
          <option value="">Elija…</option>
          {miembros.map((miembro) => <option key={miembro._id} value={miembro._id}>{miembro.nombre}</option>)}
        </select>
        {errores.miembroId && <div id="error-miembroId" className="invalid-feedback" role="alert">{errores.miembroId}</div>}
      </div>
      <button disabled={enviando || miembros.length === 0} type="submit" className="btn btn-primary agregar-serie">{enviando ? 'Guardando…' : 'Agregar serie'}</button>
    </form>
  )
}
