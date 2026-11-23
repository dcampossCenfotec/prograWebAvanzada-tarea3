import { Link } from 'react-router'
export default function NoEncontrada() {
  return <section className="text-center py-5"><h2>Página no encontrada</h2>
    <p>Esta dirección no existe.</p><Link to="/">Volver al inicio</Link>
  </section>
}
