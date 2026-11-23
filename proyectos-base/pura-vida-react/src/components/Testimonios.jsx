const testimonios = [
  { id: 1, nombre: 'Ana Mora', comentario: 'La caminata por el Arenal fue increíble. El guía nos explicó todo con mucha claridad.' },
  { id: 2, nombre: 'Luis Rojas', comentario: 'Los puentes de Monteverde fueron lo mejor del viaje. Muy buena organización.' },
  { id: 3, nombre: 'María Solano', comentario: 'Disfrutamos las playas de Manuel Antonio en familia. Una experiencia para repetir.' },
]

function Testimonios() {
  return (
    <section id="testimonios" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Lo que dicen nuestros clientes</h2>
        <div className="row g-4">
          {testimonios.map((testimonio) => (
            <div className="col-12 col-md-4" key={testimonio.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{testimonio.comentario}</p>
                    <footer className="blockquote-footer mt-3">{testimonio.nombre}</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonios
