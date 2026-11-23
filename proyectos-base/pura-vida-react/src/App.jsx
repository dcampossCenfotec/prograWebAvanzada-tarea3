import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ListaTours from './components/ListaTour.jsx'
import TablaReservas from './components/TablaReservas.jsx'
import SeccionContacto from './components/SeccionContacto.jsx'
import Testimonios from './components/Testimonios.jsx'
import Footer from './components/Footer.jsx'
 
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <ListaTours />
        <TablaReservas />
        <Testimonios />
        <SeccionContacto />
      </main>
      <Footer />
    </>
  )
}
 
export default App
