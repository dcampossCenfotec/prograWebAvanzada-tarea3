# Tarea 3 - Monorepo Maratón de series e Innovation Hub


```text
tarea-3/
├── README.md
├── .gitignore
├── enlaces-entrega.txt
├── docs/                  # Laboratorios, capturas y comprobaciones de Parte A
├── proyectos-base/        # Proyectos base de React
├── maraton-series/        # Parte A: cliente, Express/MongoDB y servidor .NET
└── innovation-hub/        # Parte B: documentación del diseño
```

## Parte A - Laboratorios

- [Laboratorios completos](docs/laboratorios.md): recorridos, reflexiones, capturas y experimentos
- [Proyectos base](proyectos-base/README.md): dos proyectos React originales, versión HTML de Pura Vida 
- `maraton-series/cliente`: React con Router, filtros en URL y detalle; consume Express para todas las escrituras.
- `maraton-series/servidor`: Express y MongoDB, GET/POST/PATCH/DELETE.
- `maraton-series/servidor-net`: laboratorio independiente de EF Core/SQL Server, dos migraciones y GET miembros/series.

Requisitos: Node.js 24, .NET 10 (global.json selecciona el SDK), MongoDB local/Atlas y SQL Server para el laboratorio del Maratón

### Express y MongoDB - terminal 1

```bash
cd maraton-series/servidor
npm ci
cp .env.example .env
# Completar MONGODB_URI y mantener DB_NAME=maraton; nunca poner la URI en React.
npm run db:preparar
npm run db:sembrar
npm run dev
```

### React con Router - terminal 2

```bash
cd maraton-series/cliente
npm ci
cp .env.example .env
npm run dev -- --host localhost --port 5173 --strictPort
```

Abrir http://localhost:5173/series. Rutas `/`, `/series`, `/series/nueva`, `/series/:id` y 404. La variable VITE_API_URL apunta a Express; no a .NET, que en este laboratorio solo tiene dos lecturas. Listar, filtrar, detalle, crear, cambiar estado y quitar persisten en MongoDB.

### Servidor .NET del Maratón - terminal 3

```bash
cd maraton-series/servidor-net
dotnet restore
dotnet tool restore
dotnet user-secrets set "ConnectionStrings:Maraton" "TU_CADENA_SQL_SERVER"
dotnet build
dotnet ef database update
dotnet run
```

Escucha en http://localhost:5080. Rutas `GET /api/miembros` y `GET /api/series`; identificadores de SQL se devuelven como texto y los campos siguen el contrato de listas. `requests.http` permite comprobar las lecturas. Las dos migraciones son Inicial y GenerosFavoritos. La conexión se guarda fuera del repositorio en user-secrets.

### Proyectos base - aparte

Dentro de cada proyecto React: `npm ci`, `npm run dev -- --port 5175` y `npm run build`. No usar el mismo puerto para dos proyectos. Pura Vida HTML se puede servir con `python3 -m http.server 5178 --directory proyectos-base/pura-vida-html`. El complemento `conceptos-interactivos` demuestra props, children, evento, estado y variable local.

## Parte B - Diseño de Innovation Hub

[Índice de Innovation Hub](innovation-hub/README.md). Incluye modelo, plan de migración, datos de prueba como tablas, seis sentencias SQL, diseño de dos GET y la investigación de EF Core. Esta carpeta contiene únicamente la documentación de la Parte B. La aplicación real de Innovation Hub permanece en su repositorio independiente y no necesita cambios para esta entrega.

[Mermaid para Lucidchart](docs/diagramas/innovation-hub.mmd). En Lucidchart: Diagram as code → New diagram → pegar el código desde `erDiagram` → Generate.

## Entrega

Las partes A y B se entregan juntas en este monorepo. Los laboratorios, capturas y respuestas están en `docs/laboratorios.md`; el diseño de Innovation Hub está en `innovation-hub/docs/`.

Repositorio: https://github.com/dcampossCenfotec/prograWebAvanzada-tarea3

La etiqueta `tarea-3` identifica el commit entregado. `enlaces-entrega.txt` contiene el enlace del monorepo y el diagrama complementario para Moodle. El repositorio real de Innovation Hub permanece independiente.
