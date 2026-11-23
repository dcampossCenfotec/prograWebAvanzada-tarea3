# EF Core y SQL Server

## Recorrido

| # | Pieza | Qué ocurre |
|---|---|---|
| 1 | Kestrel · 5080 | Recibe HTTP y lo entrega al pipeline ASP.NET Core. |
| 2 | MapGet /api/series | Selecciona el manejador de la ruta. |
| 3 | AddDbContext | Registra el contexto; la inyección proporciona una instancia para la petición. |
| 4 | user-secrets | La configuración de desarrollo aporta ConnectionStrings:Maraton; no se incluye en el proyecto. |
| 5 | LINQ · OrderBy y Select | Construye una consulta y proyecta los nombres del contrato. |
| 6 | ToListAsync | Ejecuta la consulta traducida sin bloquear esperando la base. |
| 7 | SQL Server · SELECT con JOIN | Une Series con Generos y Miembros. |
| 8 | Objetos anónimos → JSON | Serializa las filas proyectadas y devuelve 200. |

El orden de la tabla es explicativo: user-secrets se carga al iniciar y AddDbContext se registra antes de las peticiones. Correo único: IX_Miembros_Correo. Referencia: FK_Series_Miembros_MiembroId. Enum: CK_Series_Estado. Favoritos: MiembroGeneros con PK (MiembroId, GeneroId). No se implementó el reto opcional de calificaciones.

## Reflexiona

1. **¿Qué garantiza una clave foránea que MongoDB no garantizaba con miembroId? ¿Qué mostraron los experimentos E1 y E4?**

   La FK exige que el miembro exista y Restrict impide borrarlo si tiene series. E1 rechaza una referencia a 99 y E4 impide dejar series huérfanas.

2. **¿Por qué generosFavoritos, que en MongoDB era un arreglo dentro del miembro, necesita una tabla aparte en SQL Server?**

   Cada miembro puede tener varios géneros y cada género varios miembros. MiembroGeneros expresa ambas referencias y una PK compuesta evita repetir una pareja.

3. **¿Por qué las migraciones se suben al repositorio y la cadena de conexión no? ¿Dónde vive cada una?**

   Las migraciones y el snapshot describen cambios reproducibles y pertenecen al código. La conexión puede contener credenciales y vive en user-secrets de desarrollo o en configuración segura del despliegue.

4. **¿Qué hizo EF Core con el Select de C#? ¿Qué SQL vio en la terminal?**

   EF Core traduce la proyección LINQ a SELECT y las navegaciones a JOIN. Los alias _id, titulo y miembro producen el mismo contrato JSON sin serializar todas las entidades.

5. **¿Qué pasó en el experimento 12.5 y por qué EF Core se negó a actualizar la base?**

   El modelo difiere del snapshot si se cambia el largo sin crear una migración. EF informa PendingModelChangesWarning y rechaza database update para evitar una base que no corresponda al modelo.

6. **Si el cliente de React apuntara a este servidor, ¿qué tendría que cambiar en React? ¿Por qué?**

   Para leer las listas se cambiaría VITE_API_URL; el servidor necesita CORS para permitir al navegador leerlo. Esta guía .NET solo implementa dos GET: el cliente completo aún requiere las rutas de detalle y escritura. Sus IDs son textos de enteros y el cliente no debe exigir ObjectId.

## Experimentos y evidencias

Árbol de tablas en VS Code, consultas 3 y 6 ejecutadas desde la extensión MSSQL y GET series 200 en REST Client. La captura del error SQL muestra el registro real previamente guardado, con 547 y 2601; no es una nueva ejecución en la interfaz.

Capturas: [índice](../capturas/README.md).

## Verificaciones ejecutadas

Se generaron y aplicaron Inicial y GenerosFavoritos con EF Core 10.0.14. Las seis consultas devolvieron los datos de ejemplo; los cuatro experimentos SQL fueron rechazados con los códigos esperados. El cambio temporal de HasMaxLength(100) a 120 fue rechazado por PendingModelChangesWarning y después se restauró. La reconstrucción se comprobó dos veces usando el script de migraciones en una base temporal, sin borrar Maraton. Los dos GET devolvieron 200 y la ruta no registrada devolvió 404 sin cuerpo. Los resultados están en evidencias.
