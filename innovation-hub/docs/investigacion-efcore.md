# Investigación breve: EF Core aplicado a Innovation Hub

## 1. Select, Include y AsNoTracking

Para GET /api/initiatives/{id}, Select permite proyectar PublicId, título, categoría, propietario y las competencias necesarias para el contrato. EF traduce las navegaciones a JOIN/subconsultas; no hace falta Include para que una proyección lea Category.Name o InitiativeSkills. Conviene para respuestas de solo lectura porque evita cargar Email, PasswordHash y otros campos que el visitante no necesita.

Include(i => i.Category) carga la entidad Initiative completa y la categoría relacionada. Es útil cuando la lógica necesita trabajar con entidades y sus navegaciones, por ejemplo para editarlas después. No limita por sí solo las columnas. Agregar un Select de escalares después no demuestra una comparación de carga completa: la proyección determina lo que realmente se pide.

AsNoTracking evita que el contexto registre entidades para detectar cambios; es adecuado para lecturas. Una proyección que solo devuelve escalares ya no materializa entidades que deban rastrearse. Si la proyección contiene una entidad, esta puede seguir siendo rastreada salvo que se indique lo contrario. AsNoTracking no autoriza lecturas privadas ni sustituye el filtro de visibilidad.

SQL conceptual de Select: SELECT i.PublicId,i.Title,c.PublicId,c.Name FROM Initiatives i JOIN Categories c ON c.Id=i.CategoryId WHERE i.PublicId=@id. Include pediría además el resto de las columnas de i y c. La proyección final también reconstruye skills y tags en su orden, como se detalla en rutas.md.

Fuentes: [Carga relacionada con Include](https://learn.microsoft.com/ef/core/querying/related-data/eager), [Tracking y proyecciones](https://learn.microsoft.com/ef/core/querying/tracking).

## 2. Muchos a muchos con datos propios

Una M:N siempre necesita tabla de unión en SQL. EF puede administrarla sin una clase explícita cuando solo contiene las dos FK. En este diseño UserSkills necesita entidad intermedia: Level y Position pertenecen a la asociación usuario-competencia, no a Users ni a Skills. La PK (UserId,SkillId) evita duplicados; UNIQUE(UserId,Position) conserva el orden y CHECK restringe basic/intermediate/advanced.

InitiativeSkills también lleva Position; modelarla explícitamente facilita respetar el orden contractual. Memberships es aún más que una unión: cada periodo guarda rol, estado, fechas y solicitud de origen. Un mismo usuario puede retirarse y reincorporarse, por lo que su PK es un Id de periodo y la pareja usuario/iniciativa solo es única entre activos. Usar la pareja como PK destruiría esa historia. Projects no copia el equipo: lo obtiene de las membresías de su iniciativa.

Fuente: [Relaciones M:N y entidad de unión con payload](https://learn.microsoft.com/ef/core/modeling/relationships/many-to-many).

## 3. Skip y Take: paginar antes de materializar

En un futuro listado de iniciativas, Where aplica visibilidad, OrderBy(CreatedAt).ThenBy(Id) fija un orden total, Skip(12) omite doce filas y Take(12) limita a doce. Deben aparecer antes de ToListAsync. El proveedor SQL Server expresa ese segmento así:

```sql
SELECT i.PublicId,i.Title FROM Initiatives AS i
WHERE i.Visibility=N'public' AND i.State NOT IN(N'draft',N'archived')
ORDER BY i.CreatedAt,i.Id
OFFSET 12 ROWS FETCH NEXT 12 ROWS ONLY;
```

Hacer ToListAsync primero y luego Skip/Take en memoria transporta y materializa todos los resultados aunque solo se muestren doce. El conteo total para pagination sería otra consulta CountAsync con los mismos filtros. Los offsets grandes siguen teniendo costo en la base y las inserciones/borrados concurrentes pueden desplazar filas; la paginación por clave es alternativa cuando el contrato no requiere saltar a una página arbitraria. El orden debe ser único, no solo por fecha.

Fuente: [Paginación y limitaciones del offset](https://learn.microsoft.com/ef/core/querying/pagination).
