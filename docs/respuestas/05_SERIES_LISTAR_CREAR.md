# Listar y crear series

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | express.json | Convierte el cuerpo JSON en req.body. |
| 2 | series.routes.js | Selecciona POST /. |
| 3 | series.controller · crear | Pasa req.body o {} al servicio. |
| 4 | series.validacion.js | Acumula errores de título, género, temporadas y miembroId. |
| 5 | miembros.service · existe | Comprueba que la referencia apunte a un miembro existente. |
| 6 | series.service · repositorio.crear | Construye campos permitidos, ObjectId, estado Por ver y calificaciones vacías; inserta. |
| 7 | series.repository · buscarPorId | Lee la serie creada y une el nombre del miembro. |
| 8 | Controlador · status(201) | Responde Created con la serie completa. |

La petición 8 se detiene en la fila 5: el servicio lanza HttpError con detalles.miembroId y manejarErrores escribe el 400. Creación, tipos, campos extra y referencia inexistente están cubiertos por las pruebas HTTP.

## Reflexiona

1. **¿Por qué series pregunta a miembros.service y no a miembros.repository?**

   El servicio es el contrato público del módulo miembros. Así sus reglas pueden cambiar sin repartir dependencias sobre su persistencia.

2. **¿Por qué se valida en el servidor si el formulario de React también valida?**

   El navegador se puede omitir. El servidor protege los datos enviados por cualquier cliente y ofrece errores por campo.

3. **¿Qué pasaría si el servicio guardara req.body tal cual con insertOne(datos)? Use el resultado del paso 7 de la Tarea 7.**

   Permitiría guardar campos arbitrarios, un estado inicial impuesto por el cliente o tipos incorrectos. El servicio construye explícitamente el documento y fuerza Por ver.

4. **¿Por qué se convierte miembroId con new ObjectId(…) antes de guardar?**

   La referencia en MongoDB es ObjectId. Un texto con los mismos caracteres no tiene el mismo tipo y no coincidiría en el lookup.

5. **¿Qué hace cada etapa de CON_MIEMBRO? ¿Qué demostró el experimento de la Actividad 8?**

   lookup busca el miembro; unwind extrae el documento del arreglo; set conserva su nombre; project excluye calificaciones. Una colección mal escrita produce un arreglo vacío y unwind descarta las series, aunque existan.

6. **¿Por qué crear responde 201 y con la serie leída de la base, y no con los datos que llegaron?**

   201 informa que se creó un recurso. Leerlo de nuevo devuelve el ID, el estado real y el nombre del miembro, que no estaban completos en el cuerpo recibido.

## Experimentos y evidencias

POST Severance 201 y POST inválido 400 capturados en REST Client contra Atlas; Severance siguió visible después de recargar React.

Capturas: [índice](../capturas/README.md).
