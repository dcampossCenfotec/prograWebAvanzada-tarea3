import TarjetaSerie from './TarjetaSerie.jsx'

export default function ListaSeries({ series, onAvanzar, onQuitar, pendientes = [] }) {
  if (series.length === 0) return <p role="status">Ninguna serie coincide con los filtros.</p>
  return (
    <div className="lista-series">
      {series.map((serie) => <TarjetaSerie key={serie._id} serie={serie} onAvanzar={onAvanzar} onQuitar={onQuitar} pendiente={pendientes.includes(serie._id)} />)}
    </div>
  )
}
