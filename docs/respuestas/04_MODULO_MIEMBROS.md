# Módulo miembros

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | app.js | Monta el router bajo /api/miembros. |
| 2 | miembros.routes.js | Relaciona GET / con controlador.listar. |
| 3 | miembros.controller.js | Espera servicio.listar; no conoce consultas MongoDB. |
| 4 | miembros.service.js | Define la entrada a las reglas de miembros y llama al repositorio. |
| 5 | miembros.repository.js | Ejecuta find, projection, sort y toArray. |
| 6 | MongoDB | Filtra y devuelve los documentos solicitados. |
| 7 | Controlador de vuelta | Serializa el arreglo con res.json y responde 200. |

GET /api/miembros se verificó por HTTP con MongoDB real. Los fallos de omitir toArray y await se explican como resultados esperados, sin afirmar que se modificó el código para provocarlos.

## Reflexiona

1. **¿Qué pregunta responde cada una de las cuatro capas?**

   El router decide qué URL y método atender; el controlador traduce HTTP; el servicio aplica reglas; el repositorio define cómo consultar o guardar.

2. **¿Por qué existe el servicio si para listar no hay reglas?**

   Preserva una entrada estable para las reglas futuras. Series consulta existe en este servicio y no se acopla al repositorio de miembros.

3. **¿Por qué en el router la ruta es '/' y no '/api/miembros'?**

   El prefijo ya está en app.use. Repetirlo produciría /api/miembros/api/miembros.

4. **¿Qué es un cursor y qué pasó en el experimento 7.1?**

   Un cursor representa resultados que todavía se recorren. Sin toArray se devuelve el cursor, no una lista JSON; su serialización puede fallar por referencias circulares.

5. **¿Por qué el experimento 7.2 respondió 200 si estaba mal?**

   Sin await, res.json recibe una promesa. Normalmente se serializa como {} con 200 porque todavía no se esperó el resultado; el estado HTTP por sí solo no demuestra que el contenido sea correcto.

6. **¿Por qué POST /api/miembros responde 404 si la dirección es la misma que la del GET?**

   Una ruta es la combinación de método y dirección. Solo está registrado GET; POST termina en rutaNoEncontrada.

## Experimentos y evidencias

GET miembros 200 con los cuatro miembros de Atlas, capturado en REST Client.

Capturas: [índice](../capturas/README.md).
