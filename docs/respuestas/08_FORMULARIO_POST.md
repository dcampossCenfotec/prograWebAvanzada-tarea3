# Formulario con POST

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | Formulario · validarSerie | Revisa campos antes de enviar. |
| 2 | setEnviando(true) | Bloquea envíos repetidos y muestra Guardando. |
| 3 | agregar | Espera crearSerie; deja que los errores lleguen al formulario. |
| 4 | seriesApi · crearSerie → pedir | Envía POST con Content-Type JSON y JSON.stringify. |
| 5 | API · POST /api/series | Valida, comprueba miembro, inserta y devuelve 201. |
| 6 | Pantalla tras guardar | En etapa 8 agrega la respuesta a la lista; con Router navega a /series y vuelve a consultarla. |
| 7 | setDatos(VACIO) | Solo limpia tras una creación confirmada. |
| 8 | finally | Desactiva enviando también cuando hubo error. |

Con 400 el recorrido se desvía en la fila 5: pedir lanza un Error con detalles, el formulario muestra mensajes por campo, conserva datos y finalmente habilita el envío. Con Router no se navega si falla. Se comprobó visualmente el error del API al omitir temporalmente el retorno de la validación local; después se restauró el código.

## Reflexiona

1. **¿Qué tres piezas necesita fetch para enviar datos? ¿Qué demostraron los experimentos 7.2 y 7.3?**

   Método POST, encabezado Content-Type: application/json y cuerpo JSON.stringify(datos). Sin el encabezado express.json no interpreta el texto; sin stringify llega [object Object], que es JSON inválido.

2. **¿Por qué agregar llama primero al API y después a setSeries?**

   La pantalla debe representar lo que se guardó. Si cambia antes y la petición falla, mostraría una creación inexistente.

3. **¿Por qué agregar no tiene try/catch?**

   El error debe propagarse al formulario, que conoce los campos y puede mostrar detalles sin perder lo escrito. La página NuevaSerie conserva ese patrón.

4. **¿Por qué el formulario envía el miembroId y no el nombre?**

   El ID identifica al miembro y establece la referencia. El nombre es una etiqueta de presentación y podría repetirse o cambiar.

5. **Si el navegador ya valida, ¿por qué el API valida otra vez?**

   La validación del navegador mejora la experiencia, pero puede omitirse. La del API protege la base frente a todos los clientes.

6. **¿Qué problema mostró el experimento 7.4?**

   Sin await el formulario se limpia antes de recibir la confirmación; un rechazo posterior no entra en ese catch, deja datos perdidos y una promesa rechazada sin manejar.

## Experimentos y evidencias

Se creó la serie temporal desde el formulario. Se omitió temporalmente el retorno de la validación local para enviar campos vacíos: POST 400, cuerpo enviado y errores del API visibles. La validación local se restauró. El POST válido 201 adicional de Severance se capturó en REST Client y su persistencia después de recargar en React.

Capturas: [índice](../capturas/README.md).
