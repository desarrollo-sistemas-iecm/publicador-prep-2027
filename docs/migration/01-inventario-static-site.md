# 01 — Inventario de `static-site`

Fuente: repo `static-site` (PREP 2021, HTML/CSS/JS plano, sin backend, sin build). Solo lectura — no se modificó.
19 archivos HTML de nivel superior, todos inventariados.

## Arquitectura confirmada

Todas las páginas `screenXX.html` comparten literalmente el mismo header, sidebar, footer y 6 modales
(`modalActas`, `modalCasilla`, `modalComparativa`, `modalParticipacion`, `modal_centro_ayuda`, `close_modal`,
`avisoPrivacidad`), duplicados página por página — no hay includes. La navegación real no usa `<a href>` entre
páginas sino JS: `cargaConsulta(tipo)` y `cargaLink(link)`. Params de URL ofuscados: `dt0` (distrito/alcaldía),
`1ds3cc10n` (sección), `c4s` (casilla), `t1p0` (tipo: `A` alcaldía / `D` distrito).

## Tabla de páginas

| Página | Flujo / propósito | Entra desde | Sale hacia | Estado en static-site |
|---|---|---|---|---|
| `index.html` | Landing con countdown | Directo | `screen01.html` | Activa |
| `404.html` | Error genérico | — | — | Activa |
| `actualizando_bd.html` | Pantalla de espera "actualizando información", auto-refresh | Sin link entrante visible | Recarga/retrocede | Activa, sin trigger real sin backend |
| `avisoprivacidad.html` | Fragmento de aviso de privacidad | **Ninguno** (no se referencia por URL/fetch) | — | **Huérfano** — contenido ya duplicado inline en el modal `#avisoPrivacidad` de 12 páginas |
| `base-de-datos.html` (893 líneas) | Página "Base de datos" | Header nav | `cargaConsulta`/`cargaLink` | Activa |
| `centro-ayuda.html` (250 líneas) | Glosario/FAQ corto (10 preguntas), cargado vía `$('.contenito-centro-ayuda').load('centro-ayuda.html')` dentro del modal `#modal_centro_ayuda` | Cargado por AJAX desde cada `screenXX.html` | — | Activa (uso real confirmado vía `.load()` en `screen01.html:1288`) |
| `participa.html` | Fórmula de participación ciudadana | **Ninguno** | — | **Huérfano** — contenido ya duplicado inline en el modal `#modalParticipacion` de 11 páginas |
| `preguntas.html` (244 líneas) | Fragmento corto de FAQ | No referenciado por URL directa encontrada | — | Duplicado/obsoleto frente a `screenPreguntas.html` |
| `screen01.html` (1385 líneas) | **PREP Alcaldías — Votos por Alcaldía** (primer nivel) | `index.html`, header nav | `screen01_01.html?4lc4l=&t1p0=A`; `screenSeccion.html`/`screenCasilla.html` | Activa |
| `screen01_01.html` (1068 líneas) | Detalle de Alcaldía o Distrito (genérico vía `t1p0=A\|D`) | `screen01.html`, `screen03.html` | `screen01.html`; combos | Activa |
| `screen02.html` (1146 líneas) | Votos por Partido Político (alcaldías) | Interno desde screen01 | `cargaConsulta`/`cargaLink` | Activa |
| `screen03.html` (1212 líneas) | **PREP Diputaciones — Votos por Distrito** (primer nivel, "home" de la nav) | Header nav | `screen01_01.html?t1p0=D`; combos | Activa |
| `screen04.html` (1149 líneas) | Votos por Partido Político (diputaciones) | Interno desde screen03 | `cargaConsulta`/`cargaLink` | Activa |
| `screenCasilla.html` (1007 líneas) | Detalle por Casilla | Combo con Casilla seleccionada; `modalCasilla`/`click_table.js` (`cargaACTA()`) | `screen01.html` | Activa |
| `screenPreguntas.html` (1008 líneas) | FAQ completo — 3 secciones (Avance Nacional / Consulta de la votación / Resultados de tu Casilla), 71 preguntas | Header nav | `cargaLink` | Activa |
| `screenRP.html` (900 líneas) | "Diputaciones - Casillas Especiales", tabla "Actas de Representación Proporcional (RP)" | `screen04.html` | `cargaConsulta`/`cargaLink` | Activa |
| `screenSeccion.html` (1041 líneas) | Detalle por Sección | Combo con Sección lleno + Casilla vacío | `screen01.html`; combo a Casilla | Activa |
| `screenextranjero.html` (900 líneas) | "Diputaciones - Voto de las y los Mexicanos Residentes en el Extranjero" | `screen04.html` | `cargaConsulta`/`cargaLink` | Activa |
| `tipo_cred.html` | Fragmento con imágenes de credencial (a/b/c/d.png) | No referenciado por URL | — | **Huérfano** frente a URL directa — pero el contenido real y usado está en el modal `#modalCasilla` inline de cada `screenXX.html` (imágenes `Credencial-{A,B,C,D}.svg`, distintas de las de este fragmento) |

## Hallazgos clave

1. **3 páginas huérfanas por URL directa** (`avisoprivacidad.html`, `participa.html`, `tipo_cred.html`): su contenido real y usado vive duplicado inline en modales de las páginas `screenXX.html`, no en el archivo standalone. La migración correcta es tomar el contenido de esos modales inline, no del archivo huérfano (confirmado por lectura directa: `tipo_cred.html` usa imágenes `a.png`/`b.png`/etc. en minúsculas, distintas de las `Credencial-A.svg` que sí usa el modal real `#modalCasilla`).
2. **`centro-ayuda.html` no es huérfano**: se carga por AJAX (`jQuery.load()`) dentro del modal `#modal_centro_ayuda`, confirmado en `screen01.html:1288`.
3. **`screen01`↔`screen03`** y **`screen02`↔`screen04`** son pares estructuralmente casi idénticos (mismo patrón Alcaldías/Distritos).
4. **`screen01_01.html`** ya es genérico por diseño (`t1p0=A|D` sirve Alcaldía o Distrito con el mismo template).
5. **`screenRP.html`** y **`screenextranjero.html`** comparten exactamente la misma tabla de "Actas" (mismos datos de ejemplo fijos), solo cambia el título — confirmado por lectura línea a línea de ambos archivos.
6. **`preguntas.html`** (fragmento corto) vs **`screenPreguntas.html`** (71 preguntas) vs **`centro-ayuda.html`** (glosario de modal) son tres contenidos de FAQ distintos y no solapados.
7. **`js/demo.js`** simula el backend PHP: `cargaACTA(actadig)` abre `#modalActas` con el mensaje "Demostración: el visor de actas digitalizadas requiere el backend original..."; `demoDescargarZip()` hace `alert("Demostración: la descarga del ZIP... no está disponible...")`. Estos son los mensajes migrados literalmente a los botones equivalentes en Angular.

## Recursos compartidos relevantes

- Iconos de partidos: `icons/` (usados por `detail-card.js`/`detail-card-ci.js`).
- Mapas geo: `mapas/alcaldias.geo.json`, `mapas/distritos.geo.json` (Highcharts maps).
- `codemaps/`: librería Highcharts completa (maps, gauges) — vendor, no migra como código.
- `css_ine/`: mismo nombre de carpeta que `publicador-prep-2027/src/assets/styles/css_ine/` — mismo sistema de diseño INE, ya presente en destino.
