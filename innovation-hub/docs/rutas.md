# Diseño de dos rutas públicas del contrato

Contrato: [Avance 2](fuentes/contrato-avance2.md). La API no devuelve Id internos ni correos/hashes. Convertir PublicId UUID a texto canónico en minúsculas; las fechas UTC llevan tres decimales y Z. Las propiedades se escriben en camelCase.

## GET /api/categories

Catálogo activo para visitante, sin Authorization ni parámetros. HTTP 200; Content-Type application/json. Lee Categories, ordenado por NameNormalized y por PublicId como desempate contractual.

```sql
SELECT PublicId AS id, Name AS name
FROM Categories WHERE Active = 1
ORDER BY NameNormalized, PublicId;
```

Se agrupan las ocho filas dentro de data (no pagination en este catálogo). JSON esperado:

```json
{
  "data": [
    {
      "id": "culture-creativity",
      "name": "Cultura y creatividad"
    },
    {
      "id": "education",
      "name": "Educación"
    },
    {
      "id": "social-impact",
      "name": "Impacto social"
    },
    {
      "id": "business",
      "name": "Negocios y emprendimiento"
    },
    {
      "id": "other",
      "name": "Otro"
    },
    {
      "id": "health",
      "name": "Salud y bienestar"
    },
    {
      "id": "sustainability",
      "name": "Sostenibilidad"
    },
    {
      "id": "technology",
      "name": "Tecnología"
    }
  ]
}
```

## GET /api/initiatives/10000000-0000-4000-8000-000000000001

Detalle de «Huertos escolares» para visitante. HTTP 200; Content-Type application/json. La relación M:N InitiativeSkills → Skills construye skills en Position. Lee Initiatives, Categories, Users, Memberships, InitiativeSkills, Skills e InitiativeTags. No se filtran competencias por Active al reconstruir referencias existentes.

```sql
DECLARE @PublicId UNIQUEIDENTIFIER = '10000000-0000-4000-8000-000000000001';
-- Conjunto 1: principal, categoría, dueño y conteo de miembros activos.
SELECT i.Id AS InternalId, i.PublicId, i.Title, i.Type, i.Summary,
       i.Description, i.Problem, i.Beneficiaries,
       c.PublicId AS CategoryPublicId, c.Name AS CategoryName,
       u.PublicId AS OwnerPublicId, u.FirstName, u.LastName,
       i.EstimatedMembers, i.Visibility, i.State, i.CreatedAt, i.UpdatedAt,
       (SELECT COUNT(*) FROM Memberships AS m
        WHERE m.InitiativeId = i.Id AND m.State = N'active') AS MemberCount
FROM Initiatives AS i JOIN Categories AS c ON c.Id = i.CategoryId
JOIN Users AS u ON u.Id = i.OwnerId
WHERE i.PublicId = @PublicId AND i.Visibility = N'public'
  AND i.State NOT IN (N'draft', N'archived');
-- Conjunto 2: M:N; no incluye datos privados de otra iniciativa.
SELECT s.PublicId AS id, s.Name AS name
FROM Initiatives AS i JOIN InitiativeSkills AS rel ON rel.InitiativeId = i.Id
JOIN Skills AS s ON s.Id = rel.SkillId
WHERE i.PublicId = @PublicId AND i.Visibility = N'public'
  AND i.State NOT IN (N'draft', N'archived')
ORDER BY rel.Position;
-- Conjunto 3: lista de valores ordenados.
SELECT t.Value FROM Initiatives AS i JOIN InitiativeTags AS t ON t.InitiativeId=i.Id
WHERE i.PublicId = @PublicId AND i.Visibility = N'public'
  AND i.State NOT IN (N'draft', N'archived')
ORDER BY t.Position;
```

El futuro servicio ejecuta los conjuntos con una vista consistente de lectura, arma category/owner/skills/tags y calcula availableSpaces = max(0,estimatedMembers-memberCount). access depende del visitante y del estado; no se almacena en SQL. Aquí canViewDetails/canViewTeam son true y los demás false. Hay un miembro activo, por lo que quedan cuatro espacios. Las consultas separadas son un diseño de lectura; EF podrá emitir una sola proyección o consultas explícitas sin un SELECT por cada competencia.

JSON esperado:

```json
{
  "data": {
    "id": "10000000-0000-4000-8000-000000000001",
    "title": "Huertos escolares",
    "type": "idea",
    "summary": "Crear huertos educativos en escuelas públicas.",
    "category": {
      "id": "sustainability",
      "name": "Sostenibilidad"
    },
    "skills": [
      {
        "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
        "name": "Diseño"
      },
      {
        "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa8",
        "name": "Sostenibilidad"
      }
    ],
    "estimatedMembers": 5,
    "memberCount": 1,
    "availableSpaces": 4,
    "visibility": "public",
    "state": "published",
    "access": {
      "canViewDetails": true,
      "canEdit": false,
      "canDelete": false,
      "canArchive": false,
      "canRequest": false,
      "canManageRequests": false,
      "canViewTeam": true,
      "canConvert": false
    },
    "owner": {
      "id": "11111111-1111-4111-8111-111111111111",
      "firstName": "Ana",
      "lastName": "Rojas"
    },
    "tags": [
      "sostenibilidad",
      "escuelas"
    ],
    "createdAt": "2026-10-20T14:00:00.000Z",
    "updatedAt": "2026-10-20T14:00:00.000Z",
    "description": "Diseñar huertos piloto con docentes y estudiantes para aprender cultivo sostenible.",
    "problem": "Existen pocos espacios prácticos para educación ambiental.",
    "beneficiaries": "Estudiantes y docentes"
  }
}
```

Un UUID malformado produce 400; una iniciativa inexistente, draft o archived produce 404; institutional/restricted sin sesión produce 401 según el contrato existente. La visibilidad private no revela la existencia: 404 para visitante. Un Authorization enviado se valida antes del detalle; este diseño cubre el éxito anónimo, no implementa autenticación. Las respuestas de error conservan el sobre error del contrato. No basta encontrar el Id para autorizar la lectura.
