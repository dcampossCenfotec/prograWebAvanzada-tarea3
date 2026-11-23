import { useState } from 'react'

function Panel({ titulo, children }) {
  return <section><h2>{titulo}</h2>{children}</section>
}
function Saludo({ nombre }) { return <p>Hola, {nombre}. Este texto llega mediante una prop.</p> }
function Contador() {
  const [cantidad, setCantidad] = useState(0)
  return <Panel titulo="Eventos y useState">
    <p aria-live="polite">Clics: {cantidad}</p>
    <button onClick={() => setCantidad(actual => actual + 1)}>Sumar</button>
    <button onClick={() => setCantidad(0)}>Reiniciar</button>
    <p>Cada setter solicita otro render. La actualización funcional usa el valor vigente.</p>
  </Panel>
}
function Variable() {
  let variable = 0 // Se reinicia en cada invocación del componente.
  const [renders, setRenders] = useState(0)
  const [observacion, setObservacion] = useState('Todavía no se ha hecho el experimento.')
  return <Panel titulo="¿Por qué no basta una variable?">
    <p>Variable renderizada: {variable}. Cambios de estado: {renders}.</p>
    <button onClick={() => { variable += 1; console.info('Variable en el handler:', variable) }}>Cambiar solo variable</button>
    <button onClick={() => {
      setObservacion(`Antes de renderizar, la variable en esta clausura era ${variable}.`)
      setRenders(actual => actual + 1)
    }}>Provocar render con estado</button>
    <p aria-live="polite">{observacion}</p>
    <p>El primer botón no actualiza el JSX. El segundo provoca un render y la declaración let vuelve a cero.</p>
  </Panel>
}
export default function App() {
  const [nombre, setNombre] = useState('Daniel')
  return <main><header><p>PROYECTOS BASE · COMPLEMENTO</p><h1>React en cuatro conceptos</h1>
    <p>Ejemplo nuevo que completa los proyectos originales de clase.</p></header>
    <Panel titulo="Componentes, props y children">
      <label>Nombre <input value={nombre} onChange={event => setNombre(event.target.value)} /></label>
      <Saludo nombre={nombre} />
      <p>Panel recibe este contenido como children. Saludo recibe nombre; ninguno modifica las props.</p>
    </Panel>
    <Contador /><Variable />
  </main>
}
