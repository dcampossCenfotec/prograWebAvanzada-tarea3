// app.js
// Arma la aplicación de Express: middlewares, rutas y manejo de errores, en ese orden.

import express from 'express'
import cors from 'cors'
import { miembrosRouter } from './miembros/miembros.routes.js'
import { seriesRouter } from './series/series.routes.js'
import { config } from './config/env.js'
import { rutaNoEncontrada, manejarErrores } from './middlewares/errores.js'

export const app = express()

// El navegador permite leer la respuesta desde el origen configurado.
app.use(cors({ origin: config.origenCliente }))
app.use(express.json())

app.use('/api/miembros', miembrosRouter)
app.use('/api/series', seriesRouter)

app.use(rutaNoEncontrada)
app.use(manejarErrores)
