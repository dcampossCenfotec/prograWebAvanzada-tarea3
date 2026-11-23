# Maratón con EF Core y SQL Server

Implementación independiente del laboratorio de EF Core: modelos, dos migraciones, datos iniciales, relaciones uno a muchos y muchos a muchos y dos rutas GET con el contrato de Express.

```bash
dotnet restore
dotnet tool restore
dotnet user-secrets set "ConnectionStrings:Maraton" "TU_CADENA_DE_SQL_SERVER"
dotnet build
dotnet ef database update
dotnet run
```

La configuración de conexión se guarda fuera del proyecto. El perfil de desarrollo escucha en http://localhost:5080. La cadena de SQL Server debe seleccionar una base de laboratorio y contar con los permisos necesarios para crearla y aplicar migraciones.

Las rutas de esta etapa son GET /api/miembros y GET /api/series. El frontend completo debe seguir apuntando a Express hasta implementar las demás operaciones y CORS en .NET.

`sql/consultas.sql`: seis consultas de verificación. `sql/experimentos.sql`: cuatro sentencias que deben fallar, para ejecutar por separado. `sql/migraciones.sql`: script idempotente generado por EF. `requests.http`: dos GET y ruta inexistente.

El SDK queda seleccionado por global.json y dotnet-ef está versionado como herramienta local. Los paquetes conservan EF Core 10.0.14 según el laboratorio; la restauración advierte sobre dependencias transitivas vulnerables. Revisar esos avisos antes de un despliegue real.
