const estilos = { 'Por ver': 'pendiente', Viendo: 'en-curso', Vista: 'completada' };

export default function Resumen({ conteos }) {
  const total = conteos.reduce((suma, conteo) => suma + conteo.cantidad, 0);
  return (
    <div className="resumen">
      <div className="resumen-total"><span>Total de series</span><strong>{total}</strong></div>
      <div className="resumen-estados">
        {conteos.map(({ estado, cantidad }) => (
          <div className={`resumen-fila ${estilos[estado]}`} key={estado}>
            <div className="resumen-etiqueta"><span className="estado-punto" aria-hidden="true" />{estado}</div>
            <strong>{cantidad}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
