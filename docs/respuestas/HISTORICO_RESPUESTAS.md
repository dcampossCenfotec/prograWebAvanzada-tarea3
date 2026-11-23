# Paso 9: preguntas

1. **¿Qué dos cosas devuelve useState?** El valor actual del estado y una función para actualizarlo. Aquí son `series` y `setSeries`.
2. **¿Por qué la página no cambiaba en el paso 8?** Se modificó un objeto del arreglo y se entregó el mismo arreglo a `setSeries`. React compara la referencia del estado con `Object.is`; al ser la misma, puede omitir el renderizado aunque un dato interno haya cambiado.
3. **¿Qué hace filter en quitar y por qué no splice?** Crea un arreglo nuevo con todas las series excepto la del id elegido. `splice` modifica el arreglo original, lo que viola la inmutabilidad del estado y los requisitos del laboratorio.
4. **¿Para qué sirve ...serie?** Copia las propiedades de la serie en un objeto nuevo. Al poner `estado` después, se reemplaza solo esa propiedad y se conservan título, género, temporadas, miembro e id.
5. **¿Por qué la cantidad no necesita su propio useState?** Ya se obtiene con `series.length` en cada renderizado. Guardarla en otro estado duplicaría información y podría dejar el contador desactualizado.
