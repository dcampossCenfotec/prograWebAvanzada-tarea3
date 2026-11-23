const tours = [
  {
    id: 1,
    nombre: 'Volcán Arenal',
    descripcion: 'Caminata por senderos de lava y aguas termales.',
    precio: 85,
    imagen: 'https://picsum.photos/seed/arenal/600/400',
  },
  {
    id: 2,
    nombre: 'Manuel Antonio',
    descripcion: 'Playas de arena blanca y monos cariblancos.',
    precio: 70,
    imagen: 'https://picsum.photos/seed/manuelantonio/600/400',
  },
  {
    id: 3,
    nombre: 'Monteverde',
    descripcion: 'Puentes colgantes sobre el bosque nuboso.',
    precio: 95,
    imagen: 'https://picsum.photos/seed/monteverde/600/400',
  },
  {
    id: 4,
    nombre: 'Río Celeste',
    descripcion: 'Caminata hasta la catarata de aguas turquesas en Tenorio.',
    precio: 80,
    imagen: 'https://picsum.photos/seed/rioceleste/600/400',
  },
]
 
function ListaTours() {
  return (
    <section id="tours" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Nuestros tours</h2>
 
        <div className="row g-4">
          {tours.map((tour) => (
            <div className="col-12 col-md-6 col-lg-4" key={tour.id}>
              <div className="card card-tour h-100 shadow-sm">
                <img src={tour.imagen} className="card-img-top" alt={tour.nombre} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{tour.nombre}</h5>
                  <p className="card-text">{tour.descripcion}</p>
                  <p className="precio mt-auto">${tour.precio}</p>
                  <a href="#reservas" className="btn btn-success">Reservar</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
 
export default ListaTours
