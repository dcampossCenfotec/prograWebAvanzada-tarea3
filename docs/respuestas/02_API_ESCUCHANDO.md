# El API escuchando peticiones

## Actividad 8 — Recorrido del POST con JSON mal escrito

| # | Pieza | Qué hace con la petición 3 |
|---|---|---|
| 1 | `app.listen` en `index.js` | Pone el servidor a escuchar en el puerto configurado. Al llegar la petición HTTP, el servidor la entrega a la aplicación Express; `app.listen` no es un middleware que se ejecute en cada petición. |
| 2 | `cors` | Agrega el encabezado `Access-Control-Allow-Origin` con el origen configurado y deja continuar la petición. También estará presente en la respuesta de error. |
| 3 | `express.json()` | Detecta `Content-Type: application/json` e intenta convertir el cuerpo en un objeto. Como el JSON está incompleto, avisa un error de tipo `entity.parse.failed`. |
| 4 | `rutaNoEncontrada` | No se ejecuta para esta petición. Al recibir un error, Express salta los middlewares normales y busca un manejador de errores posterior. |
| 5 | `manejarErrores` | Reconoce `entity.parse.failed` y responde una sola vez: estado 400 y `{"error":{"codigo":"JSON_INVALIDO","mensaje":"El cuerpo no es un JSON válido."}}`. |

## Reflexiona

1. **¿Qué diferencia hay entre una petición y una respuesta? ¿Cuáles son las partes de cada una?** La petición es el mensaje con el que el cliente solicita una operación: método HTTP, dirección, encabezados y cuerpo opcional. La respuesta es la contestación del servidor: código de estado, encabezados y cuerpo, cuando corresponde.

2. **¿Por qué rutaNoEncontrada usa next(new HttpError(…)) en lugar de responder directamente?** Para pasar el problema al manejador común. Así todas las respuestas de error usan el mismo formato y no se repite la lógica de construirlas en cada middleware.

3. **¿Cómo sabe Express que manejarErrores es un manejador de errores?** Por su firma de cuatro parámetros en el orden `(err, req, res, next)`. Se conserva `next` aunque no se utilice dentro de la función.

4. **¿Por qué cors va primero y manejarErrores de último en app.js?** CORS agrega sus encabezados antes de que otra pieza pueda fallar, para que el navegador pueda leer incluso las respuestas de error desde el origen configurado. El manejador de errores va después de las piezas que pueden avisar errores, incluida `rutaNoEncontrada`, porque Express busca los manejadores hacia adelante.

5. **¿Para quién es codigo y para quién es mensaje? ¿Para qué servirá detalles?** `codigo` es un identificador estable que el programa puede comparar; `mensaje` es una explicación para la persona. `detalles` permitirá devolver errores por campo del formulario. Cuando vale `undefined`, la serialización JSON omite esa propiedad.

6. **¿Por qué, en un error 500, el API no le envía al cliente el detalle técnico?** Porque puede revelar rutas internas, consultas, configuración u otros datos sensibles y no ayuda a la persona a resolver el problema. El servidor registra el error técnico en su terminal y entrega al cliente un código y un mensaje genéricos.

## Verificación realizada

- `GET /api/series`: 404, `RUTA_NO_ENCONTRADA`, mensaje `No existe GET /api/series`.
- `GET /api`: 404, `RUTA_NO_ENCONTRADA`, mensaje `No existe GET /api`.
- `POST /api/series` con el cuerpo incompleto de `requests.http`: 400, `JSON_INVALIDO`.
- Las tres respuestas tienen contenido JSON y `Access-Control-Allow-Origin: http://localhost:5173`; ninguna incluye `detalles` ni imprime errores en la terminal.
- Se comprobó el fallo de arranque sin `CLIENT_ORIGIN` mediante un proceso aislado con esa variable ausente, equivalente al experimento de comentar la línea. El `.env` original no se modificó.
- Las peticiones se ejecutaron automáticamente por HTTP contra el API real; también están disponibles para envío manual desde REST Client.

## Precisiones

CORS no es autenticación: el navegador aplica la restricción de lectura por origen; REST Client y otros programas pueden enviar peticiones. Esta etapa no conecta MongoDB, aunque comprueba que `MONGODB_URI` esté definida. En esa etapa histórica se usaba una URI de ejemplo; la configuración actual ya apunta a Atlas.

## Evolución del proyecto

Las verificaciones anteriores corresponden a la etapa 2. En la versión final GET /api/series responde 200 y la prueba de ruta inexistente usa /api/peliculas. La versión actual ya conecta con Atlas; las capturas acumulativas están en `../capturas/README.md`.
