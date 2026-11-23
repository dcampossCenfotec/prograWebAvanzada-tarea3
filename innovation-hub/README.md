# Innovation Hub - Tarea 3, Parte B

## Documentos de entrega

- [Modelo de datos](docs/modelo-datos.md): diagrama, 14 tablas, claves, restricciones, borrado y plan de migración en seis pasos.
- [Datos de prueba](docs/datos-prueba.md): 107 filas como tablas, todas las relaciones y mapas de equivalencia; cinco usuarios, diez competencias, ocho iniciativas, cinco solicitudes y un proyecto.
- [Consultas SQL](docs/consultas.sql): seis sentencias comentadas, con JOIN 1:N, JOIN M:N, GROUP BY, UPDATE, DELETE e INSERT rechazado.
- [Diseño de rutas](docs/rutas.md): dos lecturas anónimas del contrato, consultas y JSON con los datos de prueba.
- [Investigación EF Core](docs/investigacion-efcore.md): tres respuestas aplicadas al diseño y fuentes oficiales; [PDF de dos páginas](docs/investigacion-efcore.pdf).
- [Mermaid completo](docs/modelo-relacional.mmd): todas las tablas, columnas y PK/FK; listo para copiar al editor de código de diagramas.
- [Contrato del Avance 2](docs/fuentes/contrato-avance2.md) y [modelo documental original](docs/fuentes/modelo-documental-avance2.md).

## Decisión de identificadores

La PK de SQL es numérica; PublicId UNIQUE conserva los UUID del contrato y el slug de categoría. Los ejemplos de JSON usan PublicId, no el entero interno. Las referencias de los fixtures se traducen mediante los mapas, sin inventar ObjectId que no están en los archivos de prueba.

## Ubicación en la entrega

Esta carpeta es la Parte B documental del [monorepo de Tarea 3](../README.md). Los laboratorios y requisitos de la Parte A están en [docs/laboratorios.md](../docs/laboratorios.md), [proyectos-base](../proyectos-base/README.md) y [maraton-series](../maraton-series/README.md).

Se entrega dentro del mismo repositorio y bajo la misma etiqueta `tarea-3`. El repositorio real de Innovation Hub se mantiene independiente; no requiere incorporar código ni documentación de esta tarea.
