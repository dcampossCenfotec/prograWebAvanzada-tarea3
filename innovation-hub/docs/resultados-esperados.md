# Resultados esperados de consultas.sql

## Consulta 1

| Id | Title | Propietario |
|---|---|---|
| 1 | Huertos escolares | Ana Rojas |
| 2 | Accesibilidad urbana | Ana Rojas |
| 3 | Reto de reciclaje inteligente | Ana Rojas |
| 4 | Mentorías tecnológicas | Ana Rojas |
| 5 | Banco de alimentos | Ana Rojas |
| 6 | Datos de calidad del aire | Ana Rojas |
| 7 | Lectura compartida | Ana Rojas |
| 8 | Orientación laboral | Ana Rojas |

## Consulta 2

| Iniciativa | Competencia | Position |
|---|---|---|
| Huertos escolares | Diseño | 0 |
| Huertos escolares | Sostenibilidad | 1 |
| Accesibilidad urbana | Desarrollo web | 0 |
| Accesibilidad urbana | Investigación | 1 |
| Reto de reciclaje inteligente | Desarrollo web | 0 |
| Reto de reciclaje inteligente | Diseño | 1 |
| Mentorías tecnológicas | Desarrollo web | 0 |
| Mentorías tecnológicas | Facilitación | 1 |
| Banco de alimentos | Comunicación | 0 |
| Banco de alimentos | Logística | 1 |
| Datos de calidad del aire | Diseño | 0 |
| Datos de calidad del aire | Datos | 1 |
| Lectura compartida | Comunicación | 0 |
| Lectura compartida | Organización | 1 |
| Orientación laboral | Comunicación | 0 |
| Orientación laboral | Recursos humanos | 1 |

## Consulta 3

| InitiativeId | RequestCount |
|---|---|
| 1 | 0 |
| 2 | 1 |
| 3 | 0 |
| 4 | 2 |
| 5 | 1 |
| 6 | 0 |
| 7 | 0 |
| 8 | 1 |

Consulta 4: coincide el usuario 4, Active=0. Consulta 5: elimina solo (UserId=1,Position=1), quedan seis intereses si se aplica una vez. Consulta 6: se rechaza Level=expert; no se agrega una fila. Ejecutar UPDATE/DELETE en transacciones de prueba con ROLLBACK al implementar la base.
