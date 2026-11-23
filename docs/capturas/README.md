# Capturas reales de los laboratorios

31 capturas de los laboratorios.

| Captura | Evidencia y procedencia |
|---|---|
| [api_01_miembros_200_atlas.png](api_01_miembros_200_atlas.png) | REST Client: GET miembros 200 desde Atlas. |
| [api_02_post_201_atlas.png](api_02_post_201_atlas.png) | REST Client: cuerpo POST válido y Severance creada con 201 en Atlas. |
| [api_03_validacion_400_atlas.png](api_03_validacion_400_atlas.png) | REST Client: datos inválidos 400 y detalles por campo. |
| [api_04_no_encontrada_404_atlas.png](api_04_no_encontrada_404_atlas.png) | REST Client: serie inexistente 404. |
| [api_05_id_invalido_400_atlas.png](api_05_id_invalido_400_atlas.png) | REST Client: identificador inválido 400. |
| [atlas_01_acceso_red.png](atlas_01_acceso_red.png) | Atlas: regla existente de acceso de red activa (0.0.0.0/0). |
| [atlas_02_usuario.png](atlas_02_usuario.png) | Atlas: usuario de base existente; sin contraseña visible. |
| [atlas_03_base_y_colecciones.png](atlas_03_base_y_colecciones.png) | Atlas: base maraton, miembros y series; base prueba conservada. |
| [atlas_04_registro_arranque.png](atlas_04_registro_arranque.png) | Registro real de stdout del API conectado a Atlas, abierto en VS Code; no es una terminal en vivo. |
| [atlas_05_documentos.png](atlas_05_documentos.png) | Atlas: documentos de series y contador final de seis. |
| [react_01_lista.png](react_01_lista.png) | React: lista y resumen finales después de recargar, con Atlas. |
| [react_02_get_atlas_red.png](react_02_get_atlas_red.png) | React/Red: GET de miembros y series 200 desde el API conectado a Atlas. |
| [react_03_patch_200_atlas.png](react_03_patch_200_atlas.png) | React/Red: PATCH 200 sobre la serie temporal, estado Viendo. |
| [react_04_patch_delete_atlas.png](react_04_patch_delete_atlas.png) | React/Red: PATCH 200 y DELETE 204 de la serie temporal autorizada. |
| [react_05_dos_pestanas_404.png](react_05_dos_pestanas_404.png) | React/Red: segundo borrado desde pestaña desactualizada, 404 y alerta. |
| [react_06_error_cors_5174.png](react_06_error_cors_5174.png) | React/Consola: error CORS real al usar origen 5174 frente al permitido 5173. |
| [react_07_formulario_api_400.png](react_07_formulario_api_400.png) | Formulario y Red: POST 400 al omitir temporalmente validación local; mensajes del API. |
| [react_08_post_cuerpo_invalido.png](react_08_post_cuerpo_invalido.png) | Red/Payload: cuerpo POST inválido real (temporadas convertido a número 0). |
| [react_09_persistencia_severance.png](react_09_persistencia_severance.png) | React: Severance, creada por REST Client, persiste después de recargar; seis series. |
| [router_01_detalle.png](router_01_detalle.png) | Router: detalle inicial comprobado con MongoDB local, antes de cambiar a Atlas. |
| [router_02_detalle_cancelacion_atlas.png](router_02_detalle_cancelacion_atlas.png) | Router/Red: detalle con URL, petición cancelada y GET 200; Atlas. |
| [router_03_filtros_url_atlas.png](router_03_filtros_url_atlas.png) | Router: filtros Por ver y Ana en URL y resultado Planeta Tierra; Atlas. |
| [sql_01_tablas.png](sql_01_tablas.png) | MSSQL en VS Code: tablas de Maraton e historial de EF. |
| [sql_02_get_series_200.png](sql_02_get_series_200.png) | REST Client: GET series de .NET/SQL Server 200, puerto 5080. |
| [sql_03_favoritos_consulta6.png](sql_03_favoritos_consulta6.png) | MSSQL en VS Code: consulta 6, seis relaciones de géneros favoritos. |
| [sql_04_join_consulta3.png](sql_04_join_consulta3.png) | MSSQL en VS Code: consulta 3, JOIN de cinco series, géneros y miembros. |
| [sql_05_registro_restricciones.png](sql_05_registro_restricciones.png) | Registro real de SQL abierto en VS Code: errores 547 y 2601; no una nueva ejecución visual. |

La serie `Severance (capturas laboratorio)` se creó desde React, se cambió de estado y se eliminó con autorización. Las cinco series iniciales se conservaron. La serie normal `Severance`, creada después mediante REST Client, permanece como ejemplo: cuatro miembros y seis series en Atlas. Los contadores de capturas anteriores reflejan momentos distintos de esa secuencia.

La validación local omitida para capturar el 400 se restauró. El origen experimental 5174 se detuvo; el cliente normal sigue en 5173. El POST válido está documentado en REST Client; la vista Payload de Chrome corresponde al POST inválido y se identifica así.

El arranque y el error de restricción se muestran como archivos de registro reales, no como terminales en vivo. Si se exige literalmente una captura de terminal, deberá tomarse esa vista adicional. No se capturaron credenciales ni se incluyen archivos .env en los ZIP.

Atlas tenía una regla 0.0.0.0/0 y un usuario con rol atlasAdmin. Se documentó lo encontrado sin ampliar ni cambiar esos permisos. Para uso habitual conviene restringir la red y limitar el usuario a la base del API.

## Proyectos base - capturas del 19 de noviembre de 2026

| Archivo | Resultado real |
|---|---|
| [base_01_mi_primera_app.png](base_01_mi_primera_app.png) | Proyecto original de introducción, App y Saludo. |
| [base_02_pura_vida_componentes.png](base_02_pura_vida_componentes.png) | Página original Pura Vida React, separada en componentes. |
| [base_03_props_children_estado.png](base_03_props_children_estado.png) | Complemento nuevo: props/children y contador después de pulsar Sumar. |
| [base_04_variable_y_estado.png](base_04_variable_y_estado.png) | Variable sola no actualiza pantalla; el render por estado reinicia let y conserva el valor observado. |

Estas cuatro imágenes nuevas se obtuvieron directamente de Chrome, sin edición de píxeles. Las anteriores son evidencias históricas de Maratón del 17 de noviembre; no se vuelven a atribuir a una ejecución nueva.
