# React lee el API

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | Primer dibujo | La lista está vacía y cargando es true. |
| 2 | useEffect · cargar | Inicia series y miembros en paralelo con Promise.all. |
| 3 | seriesApi · obtenerSeries → pedir | Envía GET con fetch a la URL configurada. |
| 4 | API · GET /api/series | Recorre las capas y consulta MongoDB con lookup. |
| 5 | seriesApi · respuesta.json | Lee el cuerpo y comprueba el estado HTTP. |
| 6 | setSeries y setMiembros | Guarda las dos listas recibidas. |
| 7 | finally | Finaliza cargando salvo que el efecto se haya cancelado. |
| 8 | Siguiente dibujo | Renderiza tarjetas, filtros y resumen con los datos del API. |

En la versión final con Router, este estado y efecto viven en PaginaSeries. En 9.1 falla fetch en la fila 3 y se muestra la alerta. En la guía, 9.3 causa una URL undefined y falla JSON en la fila 5; aquí la ausencia de VITE_API_URL se detecta antes con un mensaje explícito. Se añadieron cancelaciones para evitar respuestas viejas.

## Reflexiona

1. **¿Por qué la dirección del API va en un .env y no escrita en seriesApi.js?**

   Permite cambiar la dirección entre entornos sin editar las funciones. En Vite se incorpora al cliente al arrancar o compilar; cambiarla requiere reiniciar o recompilar según el caso.

2. **¿Por qué no se pueden poner secretos en una variable VITE_?**

   Vite incorpora VITE_ al código del navegador. Cualquier visitante puede leerlo; no es un almacén de secretos.

3. **¿Qué diferencia hay entre el error del experimento 9.1 y el del 9.2, si la página muestra el mismo mensaje? ¿Dónde se nota?**

   Con el servidor apagado no llega respuesta. Con CORS el API puede responder, pero el navegador impide leerla. La consola y la pestaña Red distinguen conexión rechazada de origen no autorizado.

4. **¿Por qué la petición va dentro de useEffect? ¿Qué demostró el experimento 9.4?**

   El efecto sincroniza el componente con el API después de dibujar. Sin dependencias, cada actualización provoca otra consulta y sus respuestas causan más dibujos.

5. **¿Por qué setCargando(false) va en finally?**

   finally se ejecuta tanto si hay datos como si hay error; de otro modo podría quedar el mensaje Cargando para siempre.

6. **Al agregar una serie y recargar, la serie desaparece. ¿Qué tendría que hacer agregar para que no pase?**

   Debe enviar POST y esperar que la base confirme. El laboratorio 8 implementa esa persistencia.

## Experimentos y evidencias

Lista real de Atlas, GET 200 y error CORS reproducido desde el origen 5174 con diagnóstico en consola. Se cerró el servidor experimental 5174.

Capturas: [índice](../capturas/README.md).
