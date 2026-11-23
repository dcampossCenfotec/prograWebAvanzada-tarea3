USE Maraton;
-- Ejecutar por separado. Cada sentencia debe fallar.
-- ── Experimentos: cada uno DEBE fallar ──
 
-- E1. Clave foránea: el miembro 99 no existe
INSERT INTO Series (Titulo, Temporadas, Estado, GeneroId, MiembroId)
VALUES (N'Fantasma', 1, N'Por ver', 1, 99);
 
-- E2. Índice único: el correo ya existe
INSERT INTO Miembros (Nombre, Correo, Registro)
VALUES (N'Otra Ana', N'ana@club.com', '2026-11-12');
 
-- E3. Restricción CHECK: el estado no está permitido
INSERT INTO Series (Titulo, Temporadas, Estado, GeneroId, MiembroId)
VALUES (N'Prueba', 1, N'Terminada', 1, 1);
 
-- E4. Borrar un miembro que tiene series (Restrict)
DELETE FROM Miembros WHERE Id = 4;
