import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return <>
    <header><div className="barra"><h1>🍿 Maratón de series</h1>
      <nav aria-label="Principal" className="nav">
        <NavLink className="nav-link" to="/" end>Inicio</NavLink>
        <NavLink className="nav-link" to="/series">Series</NavLink>
      </nav>
    </div></header>
    <main><Outlet /></main>
  </>
}
