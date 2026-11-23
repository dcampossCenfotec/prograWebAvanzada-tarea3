# React Router

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | Tarjeta · Link | Solicita navegar al detalle usando el _id. |
| 2 | BrowserRouter | Actualiza el historial sin solicitar un documento completo. |
| 3 | App · Routes | Elige series/:id según la dirección. |
| 4 | Layout · Outlet | Conserva navegación y dibuja la página hija. |
| 5 | DetalleSerie · useParams | Lee el id de la URL. |
| 6 | DetalleSerie · useEffect | Inicia la carga y crea AbortController; depende de id. |
| 7 | seriesApi · obtenerSerie → pedir | Envía GET con signal y conserva el estado HTTP de errores. |
| 8 | API · GET /api/series/:id | Valida el ID, busca la serie y responde 200, 400 o 404. |
| 9 | Detalle · setSerie y setCargando | Muestra los datos o el error correspondiente. |

Para /peliculas se elige NoEncontrada sin pedir una serie al API. Para un ID válido inexistente se completa la consulta y el API responde 404; la página muestra Serie no encontrada. Se incluyó el extra opcional de lazy y Suspense; la compilación genera un módulo separado para DetalleSerie.

## Reflexiona

1. **¿Cómo logra React Router cambiar de página sin pedir otra página al servidor? ¿Qué mostró el experimento 10.1?**

   Usa la API de historial y renderiza la ruta coincidente en React. Un enlace HTML normal provoca la carga de otro documento; Link evita esa recarga en la navegación interna.

2. **¿Por qué la ruta de Layout no tiene path y qué hace <Outlet />?**

   Es una ruta de diseño sin segmento propio. Outlet marca dónde se renderiza la página hija conservando el encabezado.

3. **¿Qué diferencia hay entre el 404 de /peliculas y el de /series/6500…? ¿Quién detecta cada uno?**

   /peliculas no coincide con ninguna ruta de página: lo detecta React Router. /series/6500… coincide con detalle, pero su recurso no existe: lo detecta el API.

4. **¿Por qué el efecto del detalle depende de [id]? ¿Qué pasaría con []?**

   El parámetro puede cambiar sin desmontar el componente. Con [] permanecerían los datos del ID anterior.

5. **¿Qué hace la limpieza del efecto y qué mostraron los experimentos 10.3 y 10.4?**

   La limpieza cancela la petición anterior al cambiar ID o salir. Sin ella pueden terminar peticiones duplicadas o viejas. AbortError debe ignorarse, no transformarse en un fallo de conexión.

6. **¿Qué se gana al guardar los filtros en la dirección? ¿Cómo se usaría lo mismo para paginar?**

   Los filtros se conservan al recargar, compartir un enlace y usar Atrás. Para paginación se guardaría por ejemplo ?pagina=2 y se derivaría la consulta del parámetro.

## Experimentos y evidencias

Detalle con URL, GET cancelado por limpieza de efecto y GET 200; filtros de estado y miembro reflejados en la URL.

Capturas: [índice](../capturas/README.md).
