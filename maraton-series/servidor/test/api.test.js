import { test } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { ObjectId } from 'mongodb'

// Base efímera exclusiva. Nunca borra la base configurada en .env.
process.env.DB_NAME = `maraton_test_${process.pid}_${Date.now()}`
const { conectar, obtenerDb, desconectar } = await import('../src/config/db.js')
const { app } = await import('../src/app.js')

test('Contrato HTTP completo sobre MongoDB real', async (t) => {
  await conectar()
  const db = obtenerDb()
  const server = app.listen(0, '127.0.0.1')
  try {
    await once(server, 'listening')
    const api = `http://127.0.0.1:${server.address().port}/api`
    const miembro = new ObjectId()
    await db.collection('miembros').insertMany([
      { _id: miembro, nombre: 'Ana', correo: 'ana@club.com' },
      { nombre: 'Luis', correo: 'luis@club.com' },
    ])
    async function pedir(ruta, metodo = 'GET', datos) {
      const res = await fetch(api + ruta, { method: metodo,
        headers: { 'Content-Type': 'application/json', Origin: process.env.CLIENT_ORIGIN },
        body: datos === undefined ? undefined : JSON.stringify(datos),
      })
      const texto = await res.text()
      return { estado: res.status, cuerpo: texto ? JSON.parse(texto) : null, res }
    }
    await t.test('404 de rutas, CORS, JSON mal formado y método no registrado', async () => {
      const r = await pedir('/peliculas')
      assert.equal(r.estado, 404)
      assert.equal(r.cuerpo.error.codigo, 'RUTA_NO_ENCONTRADA')
      assert.equal(r.res.headers.get('access-control-allow-origin'), process.env.CLIENT_ORIGIN)
      assert.equal((await pedir('/miembros', 'POST', {})).estado, 404)
      const mal = await fetch(api + '/series', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{ "titulo":' })
      assert.equal(mal.status, 400)
      assert.equal((await mal.json()).error.codigo, 'JSON_INVALIDO')
    })
    await t.test('miembros proyectados y ordenados', async () => {
      const r = await pedir('/miembros')
      assert.equal(r.estado, 200)
      assert.deepEqual(r.cuerpo.map((m) => m.nombre), ['Ana', 'Luis'])
      assert.deepEqual(Object.keys(r.cuerpo[0]).sort(), ['_id', 'nombre'])
    })
    await t.test('validación de campos, miembro inexistente, cuerpos sin objeto', async () => {
      for (const datos of [{}, [], { titulo: 'A', temporadas: '2', genero: 'Terror', miembroId: 'abc' }]) {
        const r = await pedir('/series', 'POST', datos)
        assert.equal(r.estado, 400)
        assert.equal(Object.keys(r.cuerpo.error.detalles).length, 4)
      }
      for (const datos of [null, 'texto']) {
        const r = await pedir('/series', 'POST', datos)
        assert.equal(r.estado, 400)
        assert.equal(r.cuerpo.error.codigo, 'JSON_INVALIDO')
      }
      const r = await pedir('/series', 'POST', { titulo: 'Fargo', genero: 'Drama', temporadas: 5, miembroId: '650000000000000000000000' })
      assert.equal(r.estado, 400)
      assert.equal(r.cuerpo.error.detalles.miembroId, 'Ese miembro no existe.')
    })
    let id
    await t.test('POST ignora campos extra y persiste ObjectId; GET une al miembro', async () => {
      const r = await pedir('/series', 'POST', { titulo: '  Severance  ', genero: 'Drama', temporadas: 2,
        miembroId: miembro.toHexString(), estado: 'Vista', admin: true })
      assert.equal(r.estado, 201)
      id = r.cuerpo._id
      assert.equal(r.cuerpo.titulo, 'Severance')
      assert.equal(r.cuerpo.estado, 'Por ver')
      assert.equal(r.cuerpo.miembro, 'Ana')
      assert.equal(r.cuerpo.calificaciones, undefined)
      const guardada = await db.collection('series').findOne({ _id: new ObjectId(id) })
      assert.ok(guardada.miembroId instanceof ObjectId)
      assert.deepEqual(guardada.calificaciones, [])
      assert.equal(guardada.admin, undefined)
      assert.equal((await pedir('/series')).cuerpo.length, 1)
      assert.deepEqual((await pedir(`/series/${id}`)).cuerpo, r.cuerpo)
    })
    await t.test('PATCH valida y repetir el mismo estado sigue siendo 200', async () => {
      for (let i = 0; i < 2; i++) {
        const r = await pedir(`/series/${id}/estado`, 'PATCH', { estado: 'Viendo', titulo: 'No cambiar' })
        assert.equal(r.estado, 200)
        assert.equal(r.cuerpo.estado, 'Viendo')
        assert.equal(r.cuerpo.titulo, 'Severance')
      }
      assert.equal((await pedir(`/series/${id}/estado`, 'PATCH', { estado: 'Terminada' })).estado, 400)
      assert.equal((await pedir(`/series/${id}/estado`, 'PATCH')).estado, 400)
    })
    await t.test('GET, PATCH y DELETE distinguen 400 de 404', async () => {
      for (const [metodo, sufijo, datos] of [['GET', '', undefined], ['PATCH', '/estado', { estado: 'Vista' }], ['DELETE', '', undefined]]) {
        const invalido = await pedir(`/series/abc${sufijo}`, metodo, datos)
        assert.equal(invalido.estado, 400)
        assert.equal(invalido.cuerpo.error.codigo, 'ID_INVALIDO')
        const ausente = await pedir(`/series/650000000000000000000000${sufijo}`, metodo, datos)
        assert.equal(ausente.estado, 404)
        assert.equal(ausente.cuerpo.error.codigo, 'NO_ENCONTRADA')
      }
    })
    await t.test('DELETE devuelve 204 vacío y repetir devuelve 404', async () => {
      const r = await pedir(`/series/${id}`, 'DELETE')
      assert.equal(r.estado, 204)
      assert.equal(r.cuerpo, null)
      assert.equal((await pedir(`/series/${id}`, 'DELETE')).estado, 404)
      assert.equal((await pedir(`/series/${id}`)).estado, 404)
      assert.equal(await db.collection('series').countDocuments(), 0)
    })
  } finally {
    await new Promise((resolve) => server.close(resolve))
    await db.dropDatabase()
    await desconectar()
  }
})
