# 02 — Análisis del estado de `publicador-prep-2027` (previo a esta migración)

`publicador-prep-2027` **no era un cascarón vacío**: ya era una app Angular 21.2.x real (NgModule-based,
`standalone: false` en todo), con un flujo principal de resultados PREP conectado a un backend real
(`ApiPrepService`), no un scaffold a llenar con mocks desde cero. Esto determinó el alcance real de la
migración: completar huecos y contenido faltante, no reconstruir la app.

## Rutas (antes de esta migración)

- `inicio` (bienvenida, gateada por `EsSicodidGuard`), `jefatura-de-gobierno`, `diputaciones`, `alcaldias`
  (los tres lazy, mismo patrón de rutas paralelas), `informacion-prep` (base-datos, preguntas-frecuentes).
- Wildcard `**` redirigía en silencio a `inicio` — sin página 404 dedicada.
- Cada módulo de tipo de elección: `votos-por-*`, `votos-por-partido-politico-y-candidatura-independiente`,
  `detalle-por-casilla`, `casillas/:id/:seccion`, `casilla/:id/:seccion/:casilla`, y monta
  `voto-en-condiciones-excepcionales` (voto-anticipado / voto-en-el-extranjero / voto-en-prision-preventiva,
  los tres vía el mismo `PlantillaComponent` sin contenido diferenciado).

## Componente `bienvenida`

Landing con copy institucional fijo, un único botón `routerLink="['', 'jefatura-de-gobierno']"`. No llama a
`ApiPrepService`. Se conservó sin modificar en esta migración.

## Componentes con lógica ya conectada a `ApiPrepService` real

`PrimerNivelComponent`, `SegundoNivelComponent`, `TercerNivelComponent`, `TestComponent`,
`VotacionPorCasillaComponent`, `GraficaComponent`, `MapaComponent`, `AvanceEntidadComponent`,
`EstadisticaComponent`, `ResumenVotacionComponent`, `SidebarComponent`, `BuscadorComponent` — cubren el flujo
principal de resultados (niveles 1-3, mapas, gráficas, avance, búsqueda por sección). Fuera de alcance de esta
migración (ya migrados).

## Componentes placeholder detectados (antes de esta migración)

- `DistribucionVotosComponent`: **no estaba vacío** — tenía un template completo marcado "MAQUETA" con datos
  hardcodeados de un feature distinto (distribución de votos por coalición a nivel Distrito), sin conexión a
  datos reales. No corresponde a Representación Proporcional; se dejó intacto (fuera de alcance, feature
  preexistente no relacionada con ninguna página de `static-site`).
- `ObservacionesEnActaComponent`, `ListadoParticipacionCiudadanaLNComponent`: clases vacías, sin template con
  lógica. Fuera de alcance (no corresponden a contenido faltante de `static-site`).

## Enlaces rotos detectados (antes de esta migración)

- "Aviso de privacidad" (`footer-aviso-privacidad.component.html`): `data-target="#avisoPrivacidad"` sin que
  existiera ningún elemento con ese id.
- "Centro de Ayuda" (`encabezado.component.html`): sin `data-toggle`/`routerLink`/handler.
- Tooltip "Verificar tipo de credencial" (`buscador.component.html`): `data-target="#modalCasilla"` sin que
  existiera el modal.
- `base-datos.component.html`: botón "Base de datos" con `onclick="get_bd();"` — función inexistente.

## Sistema de breadcrumbs (antes de esta migración)

No era data-driven vía `route.data` ni un array genérico de crumbs. `SidebarComponent` parseaba
`router.url.split('/')` para construir un objeto `BreadcrumbsConfig`, lo emitía (`emitirConfiguracionBreadcrumbs`),
y **5 componentes** (`PrimerNivelComponent`, `SegundoNivelComponent`, `TercerNivelComponent`, `TestComponent`,
`VotacionPorCasillaComponent`) tenían un método `onConfiguracionBreadcrumbs()` **idéntico y duplicado
verbatim** para construir el título de página. `BreadcrumbsComponent.onConfiguracionBreadcrumbs()`/
`actualizarBreadcrumbs()` eran dead code (nunca invocados). Los links clicables de "Distrito"/"Sección" en el
breadcrumb usaban `history.go(-n)` (vía `NavigationService.goBack()`), lo que rompe en recarga directa de URL
(no hay historial de navegador que recorrer).

## Bugs preexistentes detectados

- `public prep: boolean = environment.prep = false;` en 4 componentes (`EstadisticaComponent`,
  `TercerNivelComponent`, `SegundoNivelComponent`, `VotacionPorCasillaComponent`) — **asignación** accidental
  en vez de lectura, mutando el `environment` global cada vez que se instanciaba cualquiera de esos
  componentes.
- `ApiPrepService.obtenederDetalleVotosCasilla()`: recibe `casilla` como parámetro pero no lo envía en el
  body de la petición a `/distribucion`.
- `--negro` usada en `colores.css`/`nuevo.css` (`.BTN-Eleccion { color: var(--negro); }`) sin estar definida
  en ningún `:root`.
- Dos sistemas de variables Bootstrap solapados sin unificar (`--bs-*` en `styles.css` vs `--blue`/`--primary`
  Bootstrap-4-style en `css_ine/nuevo.css`).

## Identidad visual

Sin design tokens Angular-side (ni SCSS ni TS). Todo el theming vive en CSS plano cargado vía `<link>` en
`src/index.html`: Bootstrap 4.6.2 (CDN), Font Awesome 4.7.0 (CDN), Google Fonts Poppins, `assets/styles/style.css`
+ 20 archivos en `assets/styles/css_ine/*.css`. Paleta de marca real (no variables, clases utilitarias):
`bgMorado #582d73`, `bgAzul #48487c`, `bgRosa #962464`, colores de gráfica `#C791A8`/`#B283B9`/`#582D73`.

## Pruebas (antes de esta migración)

Solo 3 specs en todo el repo (`app.component`, `bienvenida.component`, `sidebar.component`), todas triviales
("should create"). Patrón confirmado: `RouterTestingModule` + `HttpClientTestingModule` cuando el componente
inyecta `HttpClient`/`Router`/`ActivatedRoute` (directa o vía servicio), + `NO_ERRORS_SCHEMA` para no declarar
cada componente/pipe hijo del template.
