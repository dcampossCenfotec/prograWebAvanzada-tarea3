import { Link } from 'react-router'

export default function TarjetaSerie({ serie, onAvanzar, onQuitar, pendiente = false }) {
  const claseEstado = { 'Por ver': 'por-ver', Viendo: 'viendo', Vista: 'vista' }[serie.estado]
  return (
    <article className="tarjeta" aria-label={serie.titulo}>
      <span className={`insignia ${claseEstado}`}>{serie.estado}</span>
      <h3><Link to={`/series/${serie._id}`}>{serie.titulo}</Link></h3>
      <p>{serie.genero} · {serie.temporadas} {serie.temporadas === 1 ? 'temporada' : 'temporadas'} · propuesta por {serie.miembro}</p>
      <div className="acciones">
        <button disabled={pendiente} type="button" onClick={() => onAvanzar(serie._id)}>Cambiar estado</button>
        <button disabled={pendiente} type="button" className="quitar" onClick={() => onQuitar(serie._id)}>Quitar</button>
      </div>
    </article>
  )
}
