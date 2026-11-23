# Datos de prueba: carga en orden de dependencias

NULL indica ausencia de valor. Las fechas están en UTC.

## Users (5 filas)

| Id | PublicId | FirstName | LastName | MemberType | Email | EmailNormalized | Career | Bio | Availability | PortfolioUrl | Active | CreatedAt | UpdatedAt | PasswordHash |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 11111111-1111-4111-8111-111111111111 | Ana | Rojas | student | ana.owner@example.test | ana.owner@example.test | Ingeniería del Software | Propietaria de iniciativas para pruebas compartidas. | high | NULL | True | 2026-10-10T14:00:00.000Z | 2026-10-10T14:00:00.000Z | NULL |
| 2 | 22222222-2222-4222-8222-222222222222 | Luis | Mora | student | luis.applicant@example.test | luis.applicant@example.test | Diseño de Experiencias Digitales | Solicitante usado en escenarios de participación. | medium | https://example.test/luis | True | 2026-10-11T14:00:00.000Z | 2026-10-11T14:00:00.000Z | NULL |
| 3 | 33333333-3333-4333-8333-333333333333 | Carla | Vega | professor | carla.outsider@example.test | carla.outsider@example.test | NULL | NULL | low | NULL | True | 2026-10-12T14:00:00.000Z | 2026-10-12T14:00:00.000Z | NULL |
| 4 | 44444444-4444-4444-8444-444444444444 | Diego | Núñez | graduate | diego.inactive@example.test | diego.inactive@example.test | Administración | NULL | low | NULL | False | 2026-10-13T14:00:00.000Z | 2026-10-20T14:00:00.000Z | NULL |
| 5 | 55555555-5555-4555-8555-555555555555 | Elena | Solís | administrative | elena.member@example.test | elena.member@example.test | NULL | Miembro aceptado para escenarios de equipo. | high | NULL | True | 2026-10-14T14:00:00.000Z | 2026-10-14T14:00:00.000Z | NULL |

## Categories (8 filas)

| Id | PublicId | Name | NameNormalized | Active |
| --- | --- | --- | --- | --- |
| 1 | technology | Tecnología | tecnologia | True |
| 2 | education | Educación | educacion | True |
| 3 | sustainability | Sostenibilidad | sostenibilidad | True |
| 4 | social-impact | Impacto social | impacto social | True |
| 5 | business | Negocios y emprendimiento | negocios y emprendimiento | True |
| 6 | health | Salud y bienestar | salud y bienestar | True |
| 7 | culture-creativity | Cultura y creatividad | cultura y creatividad | True |
| 8 | other | Otro | otro | True |

## Skills (10 filas)

| Id | PublicId | Name | NameNormalized | Active |
| --- | --- | --- | --- | --- |
| 1 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1 | Desarrollo web | desarrollo web | True |
| 2 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2 | Diseño | diseno | True |
| 3 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3 | Investigación | investigacion | True |
| 4 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4 | Comunicación | comunicacion | True |
| 5 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5 | Logística | logistica | True |
| 6 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa6 | Facilitación | facilitacion | True |
| 7 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa7 | Datos | datos | True |
| 8 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa8 | Sostenibilidad | sostenibilidad | True |
| 9 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa9 | Organización | organizacion | True |
| 10 | aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa10 | Recursos humanos | recursos humanos | True |

## Sessions (0 filas)

Sin filas de prueba: no se fabrican sesiones ni credenciales.

## UserSkills (7 filas)

| UserId | SkillId | Level | Position |
| --- | --- | --- | --- |
| 1 | 2 | advanced | 0 |
| 1 | 6 | intermediate | 1 |
| 2 | 3 | intermediate | 0 |
| 2 | 4 | advanced | 1 |
| 3 | 3 | advanced | 0 |
| 5 | 5 | advanced | 0 |
| 5 | 9 | advanced | 1 |

## UserInterests (7 filas)

| UserId | Position | Value | NormalizedValue |
| --- | --- | --- | --- |
| 1 | 0 | educación | educación |
| 1 | 1 | sostenibilidad | sostenibilidad |
| 2 | 0 | accesibilidad | accesibilidad |
| 2 | 1 | comunidad | comunidad |
| 3 | 0 | investigación | investigación |
| 5 | 0 | logística | logística |
| 5 | 1 | impacto social | impacto social |

## Initiatives (8 filas)

| Id | PublicId | OwnerId | Title | Type | Summary | Description | Problem | Beneficiaries | CategoryId | EstimatedMembers | Visibility | State | CreatedAt | UpdatedAt | Revision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 10000000-0000-4000-8000-000000000001 | 1 | Huertos escolares | idea | Crear huertos educativos en escuelas públicas. | Diseñar huertos piloto con docentes y estudiantes para aprender cultivo sostenible. | Existen pocos espacios prácticos para educación ambiental. | Estudiantes y docentes | 3 | 5 | public | published | 2026-10-20T14:00:00.000Z | 2026-10-20T14:00:00.000Z | 0 |
| 2 | 10000000-0000-4000-8000-000000000002 | 1 | Accesibilidad urbana | need | Identificar rutas accesibles para personas con movilidad reducida. | Levantar información de aceras y entradas para construir un mapa colaborativo. | Falta información clara y verificable sobre rutas accesibles. | Personas con movilidad reducida | 4 | 4 | public | forming_team | 2026-10-20T15:00:00.000Z | 2026-10-23T15:00:00.000Z | 0 |
| 3 | 10000000-0000-4000-8000-000000000003 | 1 | Reto de reciclaje inteligente | challenge | Proponer un sistema para facilitar la separación de residuos. | Diseñar una interfaz que explique cómo clasificar residuos comunes en el hogar. | La clasificación doméstica de residuos genera dudas frecuentes. | Hogares de la comunidad | 3 | 6 | restricted | published | 2026-10-20T16:00:00.000Z | 2026-10-20T16:00:00.000Z | 0 |
| 4 | 10000000-0000-4000-8000-000000000004 | 1 | Mentorías tecnológicas | idea | Vincular estudiantes con mentores voluntarios de la institución. | Organizar sesiones breves para acompañar proyectos académicos y resolver bloqueos técnicos. | Faltan espacios de asesoría práctica para proyectos estudiantiles. | Estudiantes de la institución | 2 | 3 | institutional | published | 2026-10-21T14:00:00.000Z | 2026-10-25T14:00:00.000Z | 0 |
| 5 | 10000000-0000-4000-8000-000000000005 | 1 | Banco de alimentos | need | Coordinar donaciones con organizaciones locales y familias. | Registrar donantes, puntos de entrega y necesidades semanales de organizaciones comunitarias. | Las donaciones disponibles no siempre llegan a tiempo a quienes las necesitan. | Familias en condición vulnerable | 4 | 8 | public | archived | 2026-10-21T15:00:00.000Z | 2026-10-27T15:00:00.000Z | 0 |
| 6 | 10000000-0000-4000-8000-000000000006 | 1 | Datos de calidad del aire | challenge | Visualizar lecturas ambientales en un tablero comprensible. | Crear gráficos claros con mediciones simuladas de diferentes zonas de la ciudad. | Los datos ambientales disponibles son difíciles de interpretar. | Habitantes, investigadores y docentes | 1 | 4 | private | published | 2026-10-22T14:00:00.000Z | 2026-10-22T14:00:00.000Z | 0 |
| 7 | 10000000-0000-4000-8000-000000000007 | 1 | Lectura compartida | idea | Organizar intercambio de libros entre vecinos y estudiantes. | Habilitar un registro de libros disponibles y jornadas presenciales de intercambio comunitario. | Existen libros sin uso y poca oferta de intercambio comunitario. | Vecinos y estudiantes | 7 | 5 | public | draft | 2026-10-22T15:00:00.000Z | 2026-10-22T15:00:00.000Z | 0 |
| 8 | 10000000-0000-4000-8000-000000000008 | 1 | Orientación laboral | need | Crear recursos y prácticas guiadas para entrevistas laborales. | Reunir guías y ofrecer espacios de práctica con voluntarios de recursos humanos. | Las personas sin experiencia requieren apoyo para preparar sus postulaciones. | Personas en búsqueda de empleo | 2 | 2 | public | converted | 2026-10-23T14:00:00.000Z | 2026-10-28T14:00:00.000Z | 0 |

## InitiativeSkills (16 filas)

| InitiativeId | SkillId | Position |
| --- | --- | --- |
| 1 | 2 | 0 |
| 1 | 8 | 1 |
| 2 | 1 | 0 |
| 2 | 3 | 1 |
| 3 | 1 | 0 |
| 3 | 2 | 1 |
| 4 | 1 | 0 |
| 4 | 6 | 1 |
| 5 | 4 | 0 |
| 5 | 5 | 1 |
| 6 | 2 | 0 |
| 6 | 7 | 1 |
| 7 | 4 | 0 |
| 7 | 9 | 1 |
| 8 | 4 | 0 |
| 8 | 10 | 1 |

## InitiativeTags (13 filas)

| InitiativeId | Position | Value | NormalizedValue |
| --- | --- | --- | --- |
| 1 | 0 | sostenibilidad | sostenibilidad |
| 1 | 1 | escuelas | escuelas |
| 2 | 0 | accesibilidad | accesibilidad |
| 2 | 1 | mapa | mapa |
| 3 | 0 | reciclaje | reciclaje |
| 4 | 0 | mentoría | mentoria |
| 5 | 0 | alimentos | alimentos |
| 5 | 1 | donaciones | donaciones |
| 6 | 0 | datos | datos |
| 6 | 1 | ambiente | ambiente |
| 7 | 0 | lectura | lectura |
| 8 | 0 | empleo | empleo |
| 8 | 1 | entrevistas | entrevistas |

## ParticipationRequests (5 filas)

| Id | PublicId | InitiativeId | ApplicantId | Message | OfferedSkillId | Role | Availability | State | DecisionComment | CreatedAt | UpdatedAt | DecidedAt |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 20000000-0000-4000-8000-000000000001 | 2 | 5 | Puedo coordinar los levantamientos y organizar las visitas semanales. | 5 | Coordinación logística | high | accepted | Bienvenida al equipo de accesibilidad. | 2026-10-21T10:00:00.000Z | 2026-10-22T10:00:00.000Z | 2026-10-22T10:00:00.000Z |
| 2 | 20000000-0000-4000-8000-000000000002 | 5 | 2 | Puedo apoyar la comunicación con organizaciones y posibles donantes. | 4 | Comunicación con donantes | medium | cancelled | NULL | 2026-10-22T10:00:00.000Z | 2026-10-23T10:00:00.000Z | NULL |
| 3 | 20000000-0000-4000-8000-000000000003 | 4 | 2 | Quiero preparar materiales para las sesiones de mentoría tecnológica. | 4 | Preparación de materiales | medium | rejected | El primer ciclo ya tenía cubierta esta función. | 2026-10-23T10:00:00.000Z | 2026-10-24T10:00:00.000Z | 2026-10-24T10:00:00.000Z |
| 4 | 20000000-0000-4000-8000-000000000004 | 4 | 2 | Ahora puedo apoyar la investigación y seguimiento de cada mentoría. | 3 | Seguimiento de mentorías | medium | pending | NULL | 2026-10-26T10:00:00.000Z | 2026-10-26T10:00:00.000Z | NULL |
| 5 | 20000000-0000-4000-8000-000000000005 | 8 | 3 | Puedo revisar materiales y realizar entrevistas de práctica con participantes. | 3 | Mentoría de entrevistas | low | accepted | NULL | 2026-10-25T11:00:00.000Z | 2026-10-26T11:00:00.000Z | 2026-10-26T11:00:00.000Z |

## Memberships (12 filas)

| Id | PublicId | InitiativeId | UserId | Role | State | JoinedAt | RetiredAt | SourceRequestId |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 30000000-0000-4000-8000-000000000001 | 1 | 1 | Propietaria | active | 2026-10-20T14:00:00.000Z | NULL | NULL |
| 2 | 30000000-0000-4000-8000-000000000002 | 2 | 1 | Propietaria | active | 2026-10-20T15:00:00.000Z | NULL | NULL |
| 3 | 30000000-0000-4000-8000-000000000003 | 3 | 1 | Propietaria | active | 2026-10-20T16:00:00.000Z | NULL | NULL |
| 4 | 30000000-0000-4000-8000-000000000004 | 4 | 1 | Propietaria | active | 2026-10-21T14:00:00.000Z | NULL | NULL |
| 5 | 30000000-0000-4000-8000-000000000005 | 5 | 1 | Propietaria | active | 2026-10-21T15:00:00.000Z | NULL | NULL |
| 6 | 30000000-0000-4000-8000-000000000006 | 6 | 1 | Propietaria | active | 2026-10-22T14:00:00.000Z | NULL | NULL |
| 7 | 30000000-0000-4000-8000-000000000007 | 7 | 1 | Propietaria | active | 2026-10-22T15:00:00.000Z | NULL | NULL |
| 8 | 30000000-0000-4000-8000-000000000008 | 8 | 1 | Propietaria | active | 2026-10-23T14:00:00.000Z | NULL | NULL |
| 9 | 30000000-0000-4000-8000-000000000009 | 2 | 5 | Coordinación logística | active | 2026-10-22T10:00:00.000Z | NULL | 1 |
| 10 | 30000000-0000-4000-8000-000000000010 | 8 | 5 | Coordinación de talleres | active | 2026-10-24T10:00:00.000Z | NULL | NULL |
| 11 | 30000000-0000-4000-8000-000000000011 | 8 | 3 | Mentoría de entrevistas | active | 2026-10-26T11:00:00.000Z | NULL | 5 |
| 12 | 30000000-0000-4000-8000-000000000012 | 8 | 2 | Investigación laboral | retired | 2026-10-24T12:00:00.000Z | 2026-10-27T12:00:00.000Z | NULL |

## MembershipEvents (13 filas)

| Id | PublicId | MembershipId | Type | OccurredAt | ActorId | RequestId |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 40000000-0000-4000-8000-000000000001 | 1 | joined | 2026-10-20T14:00:00.000Z | 1 | NULL |
| 2 | 40000000-0000-4000-8000-000000000002 | 2 | joined | 2026-10-20T15:00:00.000Z | 1 | NULL |
| 3 | 40000000-0000-4000-8000-000000000003 | 3 | joined | 2026-10-20T16:00:00.000Z | 1 | NULL |
| 4 | 40000000-0000-4000-8000-000000000004 | 4 | joined | 2026-10-21T14:00:00.000Z | 1 | NULL |
| 5 | 40000000-0000-4000-8000-000000000005 | 5 | joined | 2026-10-21T15:00:00.000Z | 1 | NULL |
| 6 | 40000000-0000-4000-8000-000000000006 | 6 | joined | 2026-10-22T14:00:00.000Z | 1 | NULL |
| 7 | 40000000-0000-4000-8000-000000000007 | 7 | joined | 2026-10-22T15:00:00.000Z | 1 | NULL |
| 8 | 40000000-0000-4000-8000-000000000008 | 8 | joined | 2026-10-23T14:00:00.000Z | 1 | NULL |
| 9 | 40000000-0000-4000-8000-000000000009 | 9 | joined | 2026-10-22T10:00:00.000Z | 1 | 1 |
| 10 | 40000000-0000-4000-8000-000000000010 | 10 | joined | 2026-10-24T10:00:00.000Z | 1 | NULL |
| 11 | 40000000-0000-4000-8000-000000000011 | 11 | joined | 2026-10-26T11:00:00.000Z | 1 | 5 |
| 12 | 40000000-0000-4000-8000-000000000012 | 12 | joined | 2026-10-24T12:00:00.000Z | 1 | NULL |
| 13 | 40000000-0000-4000-8000-000000000013 | 12 | retired | 2026-10-27T12:00:00.000Z | 1 | NULL |

## Projects (1 filas)

| Id | PublicId | SourceInitiativeId | Name | Description | Objective | StartDate | EstimatedEndDate | State | RepositoryUrl | CreatedAt | UpdatedAt |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 50000000-0000-4000-8000-000000000001 | 8 | Programa de orientación laboral | Implementación de talleres y recursos para preparar postulaciones y entrevistas. | Acompañar a participantes durante la preparación de su búsqueda laboral. | 2026-11-01 | 2027-02-28 | planning | NULL | 2026-10-25T16:00:00.000Z | 2026-10-25T16:00:00.000Z |

## ProjectTechnologies (2 filas)

| ProjectId | Position | Value | NormalizedValue |
| --- | --- | --- | --- |
| 1 | 0 | React | react |
| 1 | 1 | Node.js | node.js |

