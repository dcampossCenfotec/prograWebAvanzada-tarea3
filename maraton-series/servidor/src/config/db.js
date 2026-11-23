// Una conexión compartida: se abre antes de escuchar peticiones.
import { MongoClient } from 'mongodb'
import { config } from './env.js'

const cliente = new MongoClient(config.mongoUri, { serverSelectionTimeoutMS: 10000 })
let db = null

export async function conectar() {
  await cliente.connect()
  db = cliente.db(config.nombreBd)
  console.log(`Conectado a MongoDB: ${config.nombreBd}`)
}

export function obtenerDb() {
  if (!db) throw new Error('La base de datos todavía no está conectada')
  return db
}

export async function desconectar() {
  db = null
  await cliente.close()
}
