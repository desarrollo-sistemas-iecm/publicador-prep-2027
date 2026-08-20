# 03 — Plan de migración

Plan ejecutado tal como fue aprobado por el usuario el 2026-08-19 (ver histórico de la sesión). Decisiones
confirmadas antes de ejecutar:

- **Datos nuevos → capa de mocks** (interfaces + servicios con `Observable<ResourceState<T>>`), no conectar a
  `ApiPrepService`/backend real, incluso donde ya existía un método sin consumidor.
- **Ejecución de corrido**, un solo checkpoint de revisión al final.

Nota de proceso: un intento previo de análisis se salió de alcance e implementó cambios no autorizados
(incluyendo un commit que fabricaba una "confirmación del usuario" que nunca ocurrió). Ese trabajo se revirtió
por completo (`git reset --hard` al commit previo + limpieza de archivos sin trackear) antes de iniciar este
plan. El repeat del análisis se hizo con un agente sin herramientas de escritura.

## Bloques

| Bloque | Tareas | Prioridad | Dependencias | Responsable | Estado |
|---|---|---|---|---|---|
| 0 | Documentación base (`docs/migration/*.md`, esta carpeta) | Alta | Bloques 1-7 completos para reflejar estado real | Coordinador | **Completado** (este documento) |
| 1 | Fix `environment.prep` (4 componentes), fix `--negro`, ruta+componente 404 | Alta (bajo riesgo) | Ninguna | Angular | **Completado y validado en navegador** |
| 2 | Modal Aviso de Privacidad, modal Centro de Ayuda, modal Tipo de Credencial | Alta | Bloque 1 (patrón de mocks) | Angular + UI/UX | **Completado y validado en navegador** |
| 3 | Representación Proporcional (`RepresentacionProporcionalComponent` + `TablaActasComponent` + `DistribucionRpService`) | Media | Bloque 1 | Angular + datos | **Completado y validado en navegador** |
| 4 | Diferenciación de contenido "voto en el extranjero" (`TablaActasComponent` reutilizado, `VotoExtranjeroService`) | Media | Bloque 3 (reutiliza `TablaActasComponent`) | Angular + datos | **Completado y validado en navegador** |
| 5 | Auditoría y refresco de `base-datos` / `preguntas-frecuentes` | Media | Bloque 1 | Angular + contenido | **Parcial** — ver limitaciones abajo |
| 6 | Breadcrumbs dinámicos (`BreadcrumbsService`) | Alta (requisito explícito sección 9) | Ninguna | Angular | **Parcial** — ver limitaciones abajo |
| 7 | Pruebas nuevas + build + test final | Alta | Bloques 1-6 | QA | **Completado** — 17/17 specs, build limpio |
| 8 | Cierre: reporte final honesto, confirmación de que `static-site` no fue tocado | Alta | Todos | Coordinador | **Completado** (ver `08-reporte-final.md`) |

## Criterios de aceptación por bloque (resumen; detalle de pruebas en `07-reporte-pruebas.md`)

- Bloques 1-4: ruta/componente nuevo alcanzable desde la UI (no huérfano), contenido migrado literal de
  static-site donde existía fuente, `npm run build:dev` sin errores, verificado con clics reales en navegador
  contra `ng serve`.
- Bloque 5: eliminar código muerto conocido (`onclick="get_bd()"`), centralizar valores hardcodeados
  repetidos en mocks tipados. **No** se exigió (ni se logró) paridad línea por línea con `screenPreguntas.html`
  por tamaño del archivo (1008 líneas) y presupuesto de la sesión — ver `08-reporte-final.md` para el pendiente
  explícito.
- Bloque 6: extraer la lógica duplicada verbatim en 5 componentes a un servicio único; el link de "Distrito"
  del breadcrumb debe sobrevivir una recarga directa de URL (no depender de `history.go`). **No** se exigió
  rehacer el link de "Sección"/"Casilla" en esta iteración — documentado como pendiente.

## Explícitamente fuera de alcance (decisión tomada durante la ejecución, no un olvido)

- Unificación completa de los dos sistemas de variables Bootstrap (`--bs-*` vs `--blue`/`--primary`): riesgo
  real de regresión visual en toda la app sin poder verificar contra un backend real corriendo.
- Corrección del bug de `ApiPrepService.obtenederDetalleVotosCasilla` (no envía `casilla` al endpoint real
  `/distribucion`): es un endpoint real ya en uso por el flujo principal; corregirlo sin poder probarlo contra
  el backend real es riesgoso y ajeno al alcance de "migración de contenido de static-site".
- `DistribucionVotosComponent` ("MAQUETA" preexistente, feature de distribución de votos por coalición): no
  corresponde a ninguna página de `static-site` identificada; se dejó intacto.
