import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 
// 1. Bootstrap: CSS compilado y JS (para el menú hamburguesa)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
 
// 2. Estilos propios (después de Bootstrap)
import './index.css'
 
import App from './App.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
