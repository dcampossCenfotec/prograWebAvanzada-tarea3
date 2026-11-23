# Conexión a MongoDB

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | package.json · dev | Node carga .env, activa --watch y ejecuta src/index.js. |
| 2 | config/env.js | Exige las variables y exporta la configuración. |
| 3 | config/db.js · new MongoClient | Crea el cliente compartido; todavía no abre la conexión. |
| 4 | index.js · await conectar() | Espera la conexión; si falla, no continúa hacia listen. |
| 5 | config/db.js · cliente.db | Selecciona la base configurada y conserva su referencia. |
| 6 | index.js · app.listen | Abre el puerto HTTP después de conectar. |

La conexión y el arranque se comprobaron primero con MongoDB local y después con Atlas. Los errores reales de autenticación y DNS están registrados al final de esta respuesta.

## Reflexiona

1. **¿Por qué el API se conecta a MongoDB una sola vez y no en cada petición?**

   La conexión inicial cuesta tiempo y recursos. Un MongoClient compartido administra su pool y lo reutiliza entre peticiones.

2. **¿Qué hace await conectar() y qué pasaría si se escribiera sin await?**

   Espera que termine la promesa de conexión. Sin await, listen podría aceptar peticiones antes de que exista una base disponible; además, el rechazo quedaría sin manejar en ese punto.

3. **En el experimento 6.1, ¿por qué no apareció «API escuchando»?**

   La autenticación rechazada hace fallar await conectar(); no se alcanza app.listen.

4. **¿Qué comprueba el mensaje «Conectado a MongoDB» y qué no comprueba?**

   En este código, connect comprueba la conectividad inicial. No prueba que el nombre de la base sea correcto, que las colecciones existan ni todos los permisos de lectura y escritura. En una instancia sin autenticación, tampoco valida credenciales.

5. **¿Qué controla Database Access y qué controla Network Access?**

   Database Access controla usuarios y permisos; Network Access controla las direcciones IP permitidas para llegar al clúster.

6. **¿Para qué servirá obtenerDb() en la siguiente etapa?**

   Entrega la misma referencia a la base conectada a los repositorios y falla claramente si se usa antes de conectar.

## Experimentos y evidencias

Atlas: conexión y ping correctos; contraseña inválida rechazó con código 8000 y dominio inexistente con ETIMEOUT. La URI original se mantuvo intacta. Véase `../evidencias/atlas-verificacion.md`.

Capturas: [índice](../capturas/README.md).
