const reservas = [
  { id: 1, cliente: 'Ana Mora',     tour: 'Volcán Arenal',  fecha: '2026-11-02', personas: 2, estado: 'Confirmada' },
  { id: 2, cliente: 'Luis Rojas',   tour: 'Monteverde',     fecha: '2026-11-05', personas: 4, estado: 'Pendiente'  },
  { id: 3, cliente: 'María Solano', tour: 'Manuel Antonio', fecha: '2026-11-09', personas: 3, estado: 'Confirmada' },
  { id: 4, cliente: 'Carlos Vega',  tour: 'Volcán Arenal',  fecha: '2026-11-12', personas: 1, estado: 'Cancelada'  },
  { id: 5, cliente: 'Sofía Jiménez', tour: 'Río Celeste', fecha: '2026-11-15', personas: 2, estado: 'Pendiente' },
  { id: 6, cliente: 'Diego Castro', tour: 'Monteverde', fecha: '2026-11-18', personas: 3, estado: 'Cancelada' },
]
 
function obtenerColorEstado(estado) {
  if (estado === 'Confirmada') return 'bg-success'
  if (estado === 'Pendiente') return 'bg-warning text-dark'
  return 'bg-danger'
}
 
function TablaReservas() {
  return (
    <section id="reservas" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Próximas reservas</h2>
 
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Tour</th>
                <th>Fecha</th>
                <th>Personas</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.cliente}</td>
                  <td>{reserva.tour}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.personas}</td>
                  <td>
                    <span className={`badge ${obtenerColorEstado(reserva.estado)}`}>
                      {reserva.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
 
export default TablaReservas
