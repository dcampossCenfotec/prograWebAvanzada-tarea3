# Cambiar estado y eliminar

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | app.js | Dirige /api/series al router. |
| 2 | series.routes · PATCH /:id/estado | Extrae el parámetro de ruta y llama al controlador. |
| 3 | series.controller · cambiarEstado | Entrega id y cuerpo al servicio. |
| 4 | revisarId | Rechaza IDs mal formados con 400. |
| 5 | validarEstado | Acepta únicamente Por ver, Viendo o Vista. |
| 6 | repositorio.cambiarEstado | Usa updateOne y matchedCount para detectar existencia. |
| 7 | repositorio.buscarPorId | Lee la versión guardada con el nombre del miembro. |
| 8 | Controlador · res.json | Responde 200 con la serie actualizada. |

Petición 11: fila 4, 400. Petición 10: fila 5, 400. Petición 12: fila 6, seguida de la decisión del servicio, 404. Las pruebas verifican estos casos, PATCH repetido y DELETE 204 seguido de 404.

## Reflexiona

1. **¿Por qué el id va en la dirección y el estado nuevo en el cuerpo?**

   El ID identifica el recurso y el cuerpo expresa el cambio parcial que se pide aplicar.

2. **¿Qué diferencia hay entre responder 400 ID_INVALIDO y 404 NO_ENCONTRADA? ¿Quién detecta cada uno?**

   400 ID_INVALIDO es un formato imposible, detectado por revisarId. 404 NO_ENCONTRADA es un ID válido sin documento, detectado por el servicio al interpretar el resultado del repositorio.

3. **¿Por qué revisarId está en utils y no en la carpeta series?**

   Es una comprobación reutilizable de identificadores, independiente del módulo y de HTTP.

4. **¿Qué demostró el experimento 8.2 sobre matchedCount y modifiedCount?**

   matchedCount informa si hubo coincidencia. modifiedCount puede valer cero al repetir el mismo estado aunque la serie exista; usarlo como existencia produciría un 404 incorrecto.

5. **En el experimento 8.3, la serie se borró aunque REST Client no recibió respuesta. ¿Qué problema causaría esto en React?**

   React quedaría esperando o terminaría mostrando un error aunque la base ya cambió. Solo status no envía la respuesta: hace falta end.

6. **¿Por qué el segundo DELETE a la misma serie responde 404? ¿En qué situación real pasaría?**

   La primera petición eliminó el recurso; la segunda ya no lo encuentra. Puede ocurrir por reintentos o porque otra pestaña ya lo borró.

## Experimentos y evidencias

PATCH 200 y DELETE 204 capturados en Red; inexistencia 404 e ID inválido 400 en REST Client. Solo se borró la serie temporal autorizada.

Capturas: [índice](../capturas/README.md).
