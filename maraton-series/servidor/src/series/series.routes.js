import { Router } from 'express'
import * as controlador from './series.controller.js'

export const seriesRouter = Router()
seriesRouter.get('/', controlador.listar)
seriesRouter.get('/:id', controlador.obtener)
seriesRouter.post('/', controlador.crear)
seriesRouter.patch('/:id/estado', controlador.cambiarEstado)
seriesRouter.delete('/:id', controlador.eliminar)
