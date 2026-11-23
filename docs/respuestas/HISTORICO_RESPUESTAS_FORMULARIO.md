# Laboratorio: formulario de series

## Paso 8: respuestas

1. **¿Qué lo hace controlado?** Los campos toman su `value` del estado `datos`. Cada cambio llama a `onChange` y actualiza ese estado; React controla lo que muestran.
2. **¿Cómo sabe cambiar qué campo actualizar?** Lee `event.target.name` y utiliza `[name]: value` para reemplazar esa propiedad. `...datos` conserva los otros campos.
3. **¿Qué pasa sin preventDefault?** El navegador realiza el envío habitual del formulario y navega o recarga la página. Se pierde el estado de React. Se debe restaurar `event.preventDefault()` después de probarlo.
4. **¿Cómo aparece el error debajo de cada campo?** El objeto `errores` guarda un mensaje por nombre de campo. Se agrega `is-invalid` al control y, justo después, se renderiza su mensaje con `invalid-feedback`. `aria-describedby` vincula el control con el mensaje.
5. **¿Por qué id y estado se ponen en App?** App administra la colección y define cómo nace cada serie. El formulario recoge y valida los datos; entrega esos datos mediante `onAgregar` sin encargarse de la lista.
6. **¿Por qué se actualizan resumen y filtros?** `setSeries` provoca un nuevo renderizado. Los conteos y la lista visible se calculan otra vez desde `series` y los filtros seleccionados, sin guardar copias en otro estado. Las opciones de miembros siguen viniendo de la constante `MIEMBROS`.

## Observaciones de la guía

- Sin `...datos`, cada cambio reemplaza el objeto completo por una sola propiedad. Los demás valores pasan a `undefined`, aparecen advertencias de controlados/no controlados y el validador falla al intentar ejecutar `titulo.trim()`.
- El código final conserva tanto `...datos` como `event.preventDefault()`.
- En esta base hay tres series «Por ver», así que al agregar Severance pasan a cuatro. La cifra de tres que menciona el PDF corresponde a otra distribución inicial.
- `Date.now()` se usa como indica la guía. No garantiza unicidad absoluta si se crean dos elementos en el mismo milisegundo; para un sistema de producción conviene un identificador robusto o generado por el servidor.

## Verificación realizada

Se reprodujeron las dos pruebas temporales: sin `...datos` aparecieron la advertencia de control y el error de `trim`; sin `preventDefault` el navegador navegó y reinició el estado. Se restauró la versión correcta después de ambas pruebas.

Se comprobaron en navegador los cuatro mensajes con datos vacíos, la desaparición de errores al reenviar, temporadas fuera de rango y decimales, envío mediante Enter, limpieza del formulario, título sin espacios externos, resumen, filtros, cambio de estado, eliminación y diseño móvil sin desbordamiento horizontal.
