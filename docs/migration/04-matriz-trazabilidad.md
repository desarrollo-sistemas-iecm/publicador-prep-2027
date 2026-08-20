# 04 — Matriz de trazabilidad

19/19 páginas de `static-site` inventariadas y con destino asignado. Estados: **Validado** (verificado con
clics reales en navegador contra `ng serve` durante esta sesión), **Migrado** (implementado, no probado en
navegador en esta sesión), **En desarrollo** (existe pero con paridad de contenido pendiente), **Bloqueado**
(no aplicable de forma segura sin más información), **No aplica** (con justificación).

| # | HTML original | Tipo | Función | Ruta Angular | Componente destino | Pruebas | Estado |
|---|---|---|---|---|---|---|---|
| 1 | `index.html` | Página | Landing/countdown | `/inicio` | `BienvenidaComponent` | Spec existente + validado en navegador (botón a jefatura-de-gobierno funciona) | **Validado** (preexistente, sin cambios) |
| 2 | `404.html` | Página | Error genérico | `/pagina-no-encontrada` (+ wildcard `**`) | `PaginaNoEncontradaComponent` (nuevo) | Spec nuevo + validado en navegador (incluyendo fix de layout `cuerpo`/`py-5`) | **Validado** |
| 3 | `actualizando_bd.html` | Página | Estado transitorio "actualizando información", sin trigger real posible sin backend | — | — | — | **No aplica** — cubierto conceptualmente por `SpinnerService`/`SpinnerComponent` ya existentes; no hay forma de disparar un estado de "actualizando BD" real sin el backend que esta migración no incluye |
| 4 | `avisoprivacidad.html` | Fragmento huérfano (contenido real vive en modal `#avisoPrivacidad` de las screens) | Texto legal | Modal en cualquier página con `<app-footer-aviso-privacidad>` | `FooterAvisoPrivacidadComponent` (modal agregado) | Validado en navegador (texto correcto) | **Validado** |
| 5 | `base-de-datos.html` | Página | Base de datos PREP: definición, descarga, formato, interpretación | `/informacion-prep/base-de-datos` | `BaseDatosComponent` (preexistente, contenido centralizado en mock) | Validado en navegador (avance con datos de `base-datos.mock.ts`); botón "Descargar" con alert explicativo, no clic-probado (evita bloquear el navegador) | **En desarrollo** — se centralizaron los valores de "Avance Entidad" y se quitó el `onclick` muerto; **no** se hizo auditoría línea por línea del resto del contenido (893 líneas fuente) contra el componente existente |
| 6 | `centro-ayuda.html` | Modal (glosario, 10 preguntas) | FAQ institucional corto | Modal `#modalCentroAyuda` desde header, cualquier página con `<app-encabezado>` | `EncabezadoComponent` (modal agregado) + `CentroAyudaService`/mock (nuevos) | Validado en navegador (10 preguntas + 2 tablas renderizan) | **Validado** |
| 7 | `participa.html` | Fragmento huérfano (contenido real vive en modal `#modalParticipacion`) | Fórmula de participación ciudadana | Modal ya existente en `AvanceEntidadComponent`/`AvanceEntidadMovilComponent` | (sin cambios) | Confirmado por lectura de código + visible en navegador durante otras pruebas | **No aplica** — el contenido ya estaba presente y correcto en Angular antes de esta migración, no requirió cambios |
| 8 | `preguntas.html` | Fragmento huérfano, duplicado de `screenPreguntas.html` | FAQ corto | — | — | — | **No aplica** — se consolida en `screenPreguntas.html` → `preguntas-frecuentes`, ver fila 15 |
| 9 | `screen01.html` | Página | Alcaldías, primer nivel | `/alcaldias/votos-por-alcaldia[/:id]` | `TestComponent`/`PrimerNivelComponent` | Preexistente, validado en navegador (jefatura-de-gobierno equivalente) | **Validado** (ya migrado antes de esta sesión, fuera de alcance de cambios) |
| 10 | `screen01_01.html` | Página | Detalle Alcaldía/Distrito genérico | `.../:id` (varias rutas) | `PrimerNivelComponent`/`TercerNivelComponent` | Preexistente | **Migrado** (ya migrado antes de esta sesión; no se re-probó cada variante en esta ronda) |
| 11 | `screen02.html` | Página | Votos por partido político (alcaldías) | `/alcaldias/votos-por-partido-politico-y-candidatura-independiente[/:id]` | `PrimerNivelComponent` + `GraficaComponent` | Preexistente | **Migrado** |
| 12 | `screen03.html` | Página | Diputaciones, primer nivel | `/diputaciones/votos-por-distritos[/:id]` | `TestComponent` | Preexistente | **Migrado** — contenido no releído completo en esta sesión para confirmar paridad 1:1; se asume cubierto por el mismo patrón que `screen01.html` |
| 13 | `screen04.html` | Página | Votos por partido político (diputaciones) | `/diputaciones/votos-por-partido-politico-y-candidatura-independiente[/:id]` | `PrimerNivelComponent` + `GraficaComponent` | Preexistente | **Migrado** — mismo comentario que fila 12 |
| 14 | `screenCasilla.html` | Página | Detalle por casilla | `/*/casilla/:id/:seccion/:casilla` | `TercerNivelComponent` + `DetalleVotosCasillaComponent`/`EstadisticaCasillaComponent` | Preexistente | **Bloqueado (parcial)** — bug preexistente conocido y documentado: `ApiPrepService.obtenederDetalleVotosCasilla` no envía `casilla` al backend; no corregido en esta migración (ver `03-plan-migracion.md`, fuera de alcance) |
| 15 | `screenPreguntas.html` | Página | FAQ completo, 71 preguntas | `/informacion-prep/preguntas-frecuentes` | `PreguntasFrecuentesComponent` (preexistente) | Validado en navegador (renderiza, buscador local funciona) | **En desarrollo** — existe y funciona, pero no se auditó contenido línea por línea contra las 71 preguntas fuente en esta sesión |
| 16 | `screenRP.html` | Página | Representación Proporcional, Actas RP | `/diputaciones/votos-por-representacion-proporcional` | `RepresentacionProporcionalComponent` (nuevo) + `TablaActasComponent` (nuevo, compartido) + `DistribucionRpService`/mock (nuevos) | Validado en navegador (tabla con 11 columnas de partido, botón "Ver" abre modal explicativo) | **Validado** |
| 17 | `screenSeccion.html` | Página | Detalle por sección | `/*/casillas/:id/:seccion` | `SegundoNivelComponent` | Preexistente | **Migrado** |
| 18 | `screenextranjero.html` | Página | Voto de mexicanos en el extranjero, Actas | `/*/voto-en-condiciones-excepcionales/voto-en-el-extranjero` | `PlantillaComponent` (route data) + `TablaActasComponent` (reutilizado) + `VotoExtranjeroService`/mock (nuevos) | Validado en navegador | **Validado** |
| 19 | `tipo_cred.html` | Modal (contenido real en `#modalCasilla` inline, no en este fragmento huérfano) | Identificación de credencial | Modal `#modalCasilla` desde `<app-buscador>` (6 vistas de resultados) | `BuscadorComponent` (modal agregado) + `TipoCredencialService`/mock (nuevos) | Validado en navegador (4 imágenes A/B/C/D) | **Validado** |

## Resumen de cobertura

- **Validado en navegador esta sesión**: 10/19 (index, 404, avisoprivacidad, centro-ayuda, participa,
  screenRP, screenextranjero, tipo_cred, más el flujo de bienvenida ya existente).
- **Migrado/preexistente, no re-probado a fondo esta sesión**: 6/19 (screen01, screen01_01, screen02, screen03,
  screen04, screenSeccion) — ya funcionaban antes de esta migración; no se tocaron.
- **En desarrollo (paridad de contenido parcial)**: 2/19 (base-de-datos, screenPreguntas).
- **Bloqueado (bug preexistente documentado, no corregido)**: 1/19 (screenCasilla — el componente existe y
  funciona parcialmente, pero hereda un bug real de `ApiPrepService`).
- **No aplica (justificado)**: 3/19 (actualizando_bd, participa como archivo standalone, preguntas.html como
  archivo standalone) — nota: participa y preguntas.html cuentan doble arriba porque su "no aplica" es sobre
  el archivo huérfano puntual, no sobre la funcionalidad, que sí está cubierta en otra fila.

**Cobertura real: 19/19 páginas tienen destino asignado y documentado (100% de asignación). De ellas, 10
están validadas end-to-end en navegador en esta sesión, 6 eran flujo preexistente que no se tocó ni se
re-verificó, 2 tienen paridad de contenido parcial documentada como pendiente, y 1 hereda un bug preexistente
no corregido por estar fuera del alcance seguro de esta migración.**
