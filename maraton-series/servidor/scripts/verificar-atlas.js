// Comprueba conexión y fallos de arranque sin modificar .env ni revelar credenciales.
import { MongoClient } from 'mongodb'
import { config } from '../src/config/env.js'

if (!config.mongoUri.startsWith('mongodb+srv://')) {
  throw new Error('Esta comprobación requiere configurar Atlas en MONGODB_URI.')
}

async function probar(nombre, uri, debeConectar) {
  const cliente = new MongoClient(uri, { serverSelectionTimeoutMS: 10000, connectTimeoutMS: 10000 })
  let conectado = false
  try {
    await cliente.connect()
    await cliente.db(config.nombreBd).command({ ping: 1 })
    conectado = true
    console.log(`${nombre}: conectado y ping confirmado`)
    if (!debeConectar) throw new Error('La conexión debía ser rechazada')
  } catch (err) {
    if (debeConectar || conectado) throw err
    // No se imprime el mensaje técnico, que podría incluir información de conexión.
    console.log(`${nombre}: conexión rechazada; ${err.name}; código ${err.code ?? err.cause?.code ?? 'no disponible'}`)
    console.log('app.listen no se ejecutaría: el await de conexión falló.')
  } finally { await cliente.close() }
}

await probar('URI original', config.mongoUri, true)
const incorrecta = new URL(config.mongoUri)
incorrecta.password = 'clave_incorrecta_experimento_maraton'
await probar('Contraseña incorrecta', incorrecta.href, false)
const inexistente = new URL(config.mongoUri)
inexistente.hostname = 'cluster-inexistente.invalid'
await probar('Dirección inexistente', inexistente.href, false)
await probar('URI original conservada', config.mongoUri, true)
console.log('La configuración original de .env no se modificó.')
