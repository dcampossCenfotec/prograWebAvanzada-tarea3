import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './componentes/layout/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import PaginaSeries from './paginas/PaginaSeries.jsx'
import NuevaSerie from './paginas/NuevaSerie.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'
const DetalleSerie = lazy(() => import('./paginas/DetalleSerie.jsx'))

export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route index element={<Inicio />} />
    <Route path="series" element={<PaginaSeries />} />
    <Route path="series/nueva" element={<NuevaSerie />} />
    <Route path="series/:id" element={<Suspense fallback={<p role="status">Cargando página…</p>}><DetalleSerie /></Suspense>} />
    <Route path="*" element={<NoEncontrada />} />
  </Route></Routes>
}
