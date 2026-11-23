export default function Pagina({ children }) {
  return (
    <>
      <header><div className="barra"><h1>🍿 Maratón de series</h1><span>Club de series</span></div></header>
      <main>{children}</main>
    </>
  )
}
