// Datos del menú: viven dentro del propio componente
const enlacesMenu = [
  { texto: 'Inicio',   url: '#inicio' },
  { texto: 'Tours',    url: '#tours' },
  { texto: 'Reservas', url: '#reservas' },
  { texto: 'Contacto', url: '#contacto' },
]
 
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-verde sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">🌴 Pura Vida Tours</a>
 
        <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#menuPrincipal"
                aria-controls="menuPrincipal" aria-expanded="false"
                aria-label="Abrir menú">
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto">
            {enlacesMenu.map((enlace) => (
              <li className="nav-item" key={enlace.url}>
                <a className="nav-link" href={enlace.url}>{enlace.texto}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
 
export default Navbar
