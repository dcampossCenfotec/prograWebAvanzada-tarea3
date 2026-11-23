# Verificación de Express y MongoDB

Se ejecutó `npm test` contra MongoDB 8 local. Resultado: **8 pruebas aprobadas, 0 fallos** (una prueba principal y siete subpruebas).

La base temporal se creó y eliminó dentro de la prueba; la base maraton se conservó.

| Caso comprobado | Resultado |
|---|---|
| Ruta desconocida y método no registrado | 404 con contrato uniforme |
| JSON mal formado o primitivo | 400 JSON_INVALIDO |
| CORS | Encabezado con el origen configurado |
| Miembros | Ordenados; solo _id y nombre |
| Campos inválidos, cuerpo ausente y referencia inexistente | 400; detalles por campo cuando corresponde |
| POST con campos extra | 201; Por ver; título recortado; ObjectId guardado; extras descartados |
| GET lista y detalle | 200; nombre del miembro unido; calificaciones excluidas |
| PATCH con el mismo estado dos veces | 200 en ambas ocasiones |
| PATCH con estado incorrecto | 400 |
| GET, PATCH y DELETE con ID mal formado | 400 ID_INVALIDO |
| GET, PATCH y DELETE con ID válido inexistente | 404 NO_ENCONTRADA |
| DELETE y repetición | 204 sin cuerpo, luego 404 |

El archivo reproducible es `servidor/test/api.test.js`. Estas verificaciones HTTP no sustituyen una revisión visual del cliente ni los experimentos manuales de las guías.
