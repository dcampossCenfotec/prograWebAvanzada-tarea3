import { conectar, obtenerDb, desconectar } from '../src/config/db.js'
import { GENEROS, ESTADOS } from '../src/series/series.validacion.js'

await conectar()
try {
  const db = obtenerDb()
  const existentes = new Set((await db.listCollections().toArray()).map((c) => c.name))
  if (!existentes.has('miembros')) await db.createCollection('miembros', { validator: { $jsonSchema: {
    bsonType: 'object', required: ['nombre', 'correo'], properties: {
      nombre: { bsonType: 'string' }, correo: { bsonType: 'string' },
    },
  } } })
  if (!existentes.has('series')) await db.createCollection('series', { validator: { $jsonSchema: {
    bsonType: 'object', required: ['titulo', 'genero', 'temporadas', 'estado', 'miembroId', 'calificaciones'],
    properties: {
      titulo: { bsonType: 'string', minLength: 2 }, genero: { enum: GENEROS },
      temporadas: { bsonType: ['int', 'long', 'double'], minimum: 1, maximum: 30, multipleOf: 1 },
      estado: { enum: ESTADOS }, miembroId: { bsonType: 'objectId' },
      calificaciones: { bsonType: 'array', items: { bsonType: ['int', 'long', 'double'], minimum: 1, maximum: 5, multipleOf: 1 } },
    },
  } } })
  await db.collection('miembros').createIndex({ correo: 1 }, { unique: true })
  console.log('Colecciones e índice listos. Las validaciones de colecciones existentes se conservaron.')
} finally { await desconectar() }
