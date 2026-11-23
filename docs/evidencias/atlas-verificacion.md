# Conexión y experimentos reales con Atlas

Se configuró MONGODB_URI a partir de CONNECTION_STRING en el archivo local servidor/.env, sin imprimir sus valores. DB_NAME se mantuvo como maraton.

Se ejecutaron db:preparar y db:sembrar contra Atlas. Se crearon las colecciones del laboratorio y el índice de correo; se insertaron los cuatro miembros y las cinco series de ejemplo sin modificar la base prueba.

Se ejecutó atlas:verificar con el driver oficial:

| Caso | Resultado observado |
|---|---|
| URI original | Conexión y ping confirmados |
| Copia temporal con contraseña incorrecta | MongoServerError, código 8000; conexión rechazada |
| Copia temporal con dominio inexistente | Error DNS, código ETIMEOUT en esta red; conexión rechazada |
| URI original al terminar | Conexión y ping confirmados |

No se modificó .env para los experimentos. No se ejecutó app.listen con las conexiones rechazadas; el mismo await de conexión fallaría antes del arranque. El script muestra esa consecuencia sin levantar un segundo API.

El API se reinició con Atlas y su salida real se conserva en atlas-arranque.txt. Los errores observados no coinciden literalmente con todos los textos de la guía: Atlas respondió código 8000 al fallo de autenticación y esta red agotó el tiempo de DNS en lugar de devolver ENOTFOUND.
