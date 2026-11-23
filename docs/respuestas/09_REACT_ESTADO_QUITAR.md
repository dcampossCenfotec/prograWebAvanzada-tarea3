# Cambiar estado y quitar desde React

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | TarjetaSerie · Quitar | Entrega serie._id a onQuitar. |
| 2 | PaginaSeries · quitar | Espera la eliminación del API. |
| 3 | seriesApi · eliminarSerie → pedir | Envía DELETE /series/:id sin cuerpo. |
| 4 | Rutas y controlador del API | Seleccionan eliminar y pasan el ID al servicio. |
| 5 | Servicio · eliminar | Revisa formato e interpreta inexistencia como 404. |
| 6 | Repositorio · deleteOne | Borra y devuelve si deletedCount es 1. |
| 7 | seriesApi · 204 | Devuelve null sin intentar leer JSON. |
| 8 | setSeries | Filtra sobre la lista vigente mediante una función. |

En 4.1 la fila 5 detecta que ya no existe y devuelve 404; la tarjeta local se conserva y se muestra el error. En 4.3 el problema está en fila 7 al intentar leer JSON vacío. La versión final bloquea acciones simultáneas sobre una misma tarjeta; permite operar en tarjetas distintas y actualiza funcionalmente.

## Reflexiona

1. **¿Por qué pedir() revisa el 204 antes de llamar a respuesta.json()? ¿Qué mostró el experimento 4.3?**

   204 no contiene JSON. Intentar leerlo lanza un error de fin de entrada aunque DELETE haya funcionado.

2. **¿Por qué avanzar pone en la tarjeta la serie que devolvió el API y no la que calculó React?**

   La respuesta es la versión confirmada por el servidor; evita suponer que el estado calculado localmente coincide con el guardado.

3. **¿Qué demostró el experimento 4.4 sobre setSeries((actuales) => …)?**

   Las funciones capturan listas de un dibujo anterior. La actualización funcional recibe el estado vigente y conserva cambios que llegaron durante el await.

4. **¿Por qué agregar no tiene try/catch, pero avanzar y quitar sí?**

   Los errores de agregar pertenecen al formulario. Cambiar y quitar los muestran en la alerta de la página, por eso los capturan allí.

5. **En el experimento 4.2, ¿qué ventaja y qué riesgo tiene cambiar la pantalla antes de que responda el API?**

   Cambiar primero puede sentirse más rápido, pero exige revertir correctamente si falla. El curso usa confirmación previa para mantener coherencia.

6. **Con el mapa de la Actividad 6, ¿qué archivos tendría que crear para un recurso nuevo de su proyecto?**

   Un recurso nuevo requiere repositorio, servicio, controlador, rutas y montaje; en React, funciones API, vistas y componentes. Las reglas y mensajes deben corresponder al nuevo recurso.

## Experimentos y evidencias

PATCH 200, DELETE 204 y segundo DELETE 404 desde una pestaña desactualizada, con alerta legible. La tarjeta de la pestaña desactualizada conserva la serie al fallar, como prevé el código.

Capturas: [índice](../capturas/README.md).

## Mapa completo de la actividad 6

| Pantalla | Función API | Ruta HTTP | Repositorio |
|---|---|---|---|
| Abrir lista | obtenerSeries / obtenerMiembros | GET /api/series y GET /api/miembros | listar en ambos módulos |
| Agregar | crearSerie | POST /api/series | crear y buscarPorId |
| Cambiar estado | cambiarEstadoSerie | PATCH /api/series/:id/estado | cambiarEstado y buscarPorId |
| Quitar | eliminarSerie | DELETE /api/series/:id | eliminar |
