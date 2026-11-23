-- Detalle de filas esperado: resultados-esperados.md.
-- Id es INT interno; PublicId es el UUID/slug que conserva el contrato.

-- 1. JOIN 1:N: iniciativas con su propietario. Esperado: 8 filas.
-- Huertos escolares → Ana Rojas; las otras siete usan el dueño de sus fixtures.
SELECT i.Id, i.Title, u.FirstName, u.LastName
FROM Initiatives AS i JOIN Users AS u ON u.Id = i.OwnerId
ORDER BY i.Id;

-- 2. JOIN M:N: competencias requeridas por iniciativa. Esperado: 16 filas.
-- Huertos escolares: Diseño (posición 0), Sostenibilidad (posición 1).
SELECT i.Title, s.Name AS Skill, rel.Position
FROM InitiativeSkills AS rel
JOIN Initiatives AS i ON i.Id = rel.InitiativeId
JOIN Skills AS s ON s.Id = rel.SkillId
ORDER BY i.Id, rel.Position;

-- 3. GROUP BY: solicitudes por iniciativa, incluyendo las que no tienen ninguna.
-- Esperado: 8 filas, total de RequestCount = 5; se usa COUNT(r.Id), no COUNT(*).
SELECT i.Id, i.Title, COUNT(r.Id) AS RequestCount
FROM Initiatives AS i
LEFT JOIN ParticipationRequests AS r ON r.InitiativeId = i.Id
GROUP BY i.Id, i.Title ORDER BY i.Id;

-- 4. UPDATE con WHERE: desactivar el usuario inactivo de prueba (Id 4).
-- Esperado: 1 fila coincidente, Active sigue siendo 0; no borra historia.
UPDATE Users SET Active = 0 WHERE Id = 4;

-- 5. DELETE con WHERE: quitar SOLO el último interés del usuario 1.
-- Esperado: borra (UserId=1,Position=1,'sostenibilidad'); quedan 6 intereses.
-- Ejecutar separado o en transacción con ROLLBACK si se quieren conservar fixtures.
DELETE FROM UserInterests WHERE UserId = 1 AND Position = 1;

-- 6. INSERT inválido: nivel fuera del CHECK basic/intermediate/advanced.
-- La pareja usuario 1 / competencia 1 y posición 2 están libres en los fixtures.
-- Esperado: rechazo por CK_UserSkills_Level (SQL Server 547), ninguna fila nueva.
INSERT INTO UserSkills (UserId, SkillId, Level, Position)
VALUES (1, 1, N'expert', 2);
