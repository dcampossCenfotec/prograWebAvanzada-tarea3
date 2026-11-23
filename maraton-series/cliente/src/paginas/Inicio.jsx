import { Link } from 'react-router'
export default function Inicio() {
  return <section className="py-5"><h2>El club de series</h2>
    <p>Propón una serie, consulta las recomendaciones y lleva el control de lo que estamos viendo.</p>
    <Link className="btn btn-primary" to="/series">Ver series</Link>
  </section>
}
