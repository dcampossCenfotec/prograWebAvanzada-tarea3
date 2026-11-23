import { ObjectId } from 'mongodb'
import { obtenerDb } from '../config/db.js'

const coleccion = () => obtenerDb().collection('series')
const CON_MIEMBRO = [
  { $lookup: { from: 'miembros', localField: 'miembroId', foreignField: '_id', as: 'miembro' } },
  { $unwind: '$miembro' },
  { $set: { miembro: '$miembro.nombre' } },
  { $project: { calificaciones: 0 } },
]

export async function listar() {
  return coleccion().aggregate([{ $sort: { _id: 1 } }, ...CON_MIEMBRO]).toArray()
}

export async function buscarPorId(id) {
  const [serie] = await coleccion().aggregate([
    { $match: { _id: new ObjectId(id) } }, ...CON_MIEMBRO,
  ]).toArray()
  return serie ?? null
}

export async function crear(serie) {
  return (await coleccion().insertOne(serie)).insertedId
}

export async function cambiarEstado(id, estado) {
  const resultado = await coleccion().updateOne({ _id: new ObjectId(id) }, { $set: { estado } })
  return resultado.matchedCount === 1
}

export async function eliminar(id) {
  return (await coleccion().deleteOne({ _id: new ObjectId(id) })).deletedCount === 1
}
