// Datos de ejemplo. Inserta solo los IDs que faltan; no reemplaza documentos existentes.
import { ObjectId } from 'mongodb'
import { conectar, obtenerDb, desconectar } from '../src/config/db.js'

const miembroId = (n) => new ObjectId(`66500000000000000000000${n}`)
const serieId = (n) => new ObjectId(`66510000000000000000000${n}`)
await conectar()
try {
  const db = obtenerDb()
  const miembros = [
    { _id: miembroId(1), nombre: 'Ana', correo: 'ana@club.com', registro: new Date('2026-08-01'), generosFavoritos: ['Ciencia ficción', 'Documental'] },
    { _id: miembroId(2), nombre: 'Luis', correo: 'luis@club.com', registro: new Date('2026-08-03'), generosFavoritos: ['Comedia'] },
    { _id: miembroId(3), nombre: 'Sofía', correo: 'sofia@club.com', registro: new Date('2026-08-10'), generosFavoritos: ['Animación', 'Drama'] },
    { _id: miembroId(4), nombre: 'Diego', correo: 'diego@club.com', registro: new Date('2026-09-02'), generosFavoritos: ['Drama'] },
  ]
  for (const miembro of miembros) {
    // No duplica por correo si la base ya tenía los miembros con otros IDs.
    await db.collection('miembros').updateOne({ correo: miembro.correo }, { $setOnInsert: miembro }, { upsert: true })
  }
  const porCorreo = await db.collection('miembros').find({ correo: { $in: miembros.map((m) => m.correo) } }).toArray()
  const ids = new Map(porCorreo.map((m) => [m.correo, m._id]))
  const datos = [
    ['Dark', 'Ciencia ficción', 3, 'Vista', 'ana@club.com', [5, 4, 5]],
    ['The Office', 'Comedia', 9, 'Viendo', 'luis@club.com', [4]],
    ['Arcane', 'Animación', 2, 'Por ver', 'sofia@club.com', []],
    ['Chernobyl', 'Drama', 1, 'Vista', 'diego@club.com', [5, 5]],
    ['Planeta Tierra', 'Documental', 3, 'Por ver', 'ana@club.com', [4]],
  ]
  for (const [i, [titulo, genero, temporadas, estado, correo, calificaciones]] of datos.entries()) {
    await db.collection('series').updateOne({ titulo }, { $setOnInsert: {
      _id: serieId(i + 1), titulo, genero, temporadas, estado, miembroId: ids.get(correo), calificaciones,
    } }, { upsert: true })
  }
  console.log('Datos de ejemplo disponibles: cuatro miembros y cinco series (sin reemplazar existentes).')
} finally { await desconectar() }
