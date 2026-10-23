# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular application ("PREP y SiCODID") that publishes preliminary electoral results (PREP) and district/demarcation
tallies (SiCODID) for elections in Ciudad de México — vote counts by candidacy/party, statistics by district and
alcaldía, dynamic drill-down selectors, charts (Highcharts) and maps.

## Commands

```bash
npm start                # ng serve, dev server at http://localhost:4200/ (hash routing, useHash: true)
npm run build             # ng build (defaultConfiguration: production)
npm run build:dev         # ng build --configuration development --output-path=dist/publicador-prep-2027
npm run build:prod        # ng build --configuration production --output-path=dist/publicador-prep-2027
npm test                  # ng test (Karma/Jasmine)
```

There is no lint script configured. To run a single spec file, use Karma's standard filtering, e.g.
`ng test --include='**/sidebar.component.spec.ts'`.

Note: `angular.json`'s project is named `prepRouting` (default build output is `dist/prep-routing`), which differs
from the `package.json` name `publicador-prep-2027` — the `build:dev`/`build:prod` scripts override
`--output-path` for that reason. Prefer those npm scripts over raw `ng build`.

## Angular version

Pinned to Angular's current LTS line, **v21.2.x** (not the newer v22, which is Active but not yet LTS) — keep
`@angular/*`, `@angular/cli`, `@angular-devkit/build-angular`, and `@angular/compiler-cli` on matching `21.2.x`
versions. This requires TypeScript `~5.9.3` and `zone.js ~0.16.0` (Angular 21 peer requirement:
`typescript >=5.9 <6.1`). `tsconfig.json` uses `"moduleResolution": "bundler"` — required because
`@angular/common/http` (and other Angular subpath exports) are no longer resolvable under the legacy `"node"`
resolution strategy in current Angular package layouts.

Since Angular 19, `@Component`/`@Pipe`/`@Directive` default to `standalone: true` when the property is omitted. This
app is entirely NgModule-based (no standalone components), so **every** `@Component`/`@Pipe` decorator explicitly
sets `standalone: false` — always include it on new components/pipes, or they'll fail to compile when declared in an
`NgModule` (`NG6008`).

Component specs that hit `HttpClient`/`Router`/`ActivatedRoute` through injected services need
`HttpClientTestingModule`/`RouterTestingModule` (and typically `NO_ERRORS_SCHEMA` to avoid having to declare every
child component/pipe used in the template) in their `TestBed.configureTestingModule` — see
`sidebar.component.spec.ts` or `bienvenida.component.spec.ts` for the pattern.

## Environments

`src/environments/environment.ts` (production) and `environment.development.ts` (dev, swapped in via
`fileReplacements` under the `development` build configuration) hold `api_prep` (backend base URL), a `prep: boolean`
flag, and branding info (`detalle_sistema_prep` / `detalle_sistema_sicodid`) used to toggle copy/branding between the
PREP and SiCODID variants of the UI. Services always import `environment` from
`src/environments/environment.development` directly (not the default `environment.ts` — check both when changing API
behavior).

## Architecture

### Routing: three parallel "tipo de elección" feature modules

The app has three lazy-loaded election-type modules under `src/app/tipo-eleccion/`:
`gubernatura` (jefatura-de-gobierno), `diputaciones`, and `alcaldias`. Each has its own routing module but they all
follow the **same route shape** against a shared set of presentational components in `src/app/components/`
(`PrimerNivelComponent`, `SegundoNivelComponent`, `TercerNivelComponent`, `GraficaComponent`, `MapaComponent`,
`VotacionPorCasillaComponent`, `MovingCardsComponent`, generic `TestComponent`). Route params thread an
`id_distrito_alcaldia` → `seccion` → `casilla` drill-down hierarchy consistently across the three modules. When
changing one election type's routes/components, check whether the same change is needed in the other two — they are
intentionally near-duplicates, not shared via a common module.

Each election type module distinguishes itself mainly by `type` (see `typeQuery` below). All three share the same
entry route, `votos-por-candidatura` (gubernatura renders the entity chart there, diputaciones/alcaldias the map),
and `votos-por-candidatura/:id_distrito_alcaldia` always renders `PrimerNivelComponent`. This mirrors PREP2024, where
the sidebar's first button is "Votos por Candidatura" for every election type.

Changing the first combo (distrito/alcaldía) in the sidebar always navigates to
`/<tipo>/votos-por-candidatura/<id>`, regardless of the current view (same as PREP2024). Every level component that
hosts `<app-sidebar>` (`TestComponent`, `PrimerNivelComponent`, `SegundoNivelComponent`, `TercerNivelComponent`,
`VotacionPorCasillaComponent`) implements this in its own `onSelectionChangePrimerCombo` — keep them in sync.

All three also mount the `voto-condiciones-especiales` module at `voto-en-condiciones-excepcionales`, which handles
special voting conditions (voto anticipado, voto en el extranjero, voto en prisión preventiva) via one shared
`PlantillaComponent`.

`AppRoutingModule` gates `inicio` (bienvenida/landing) and `informacion-prep` behind `EsSicodidGuard`, which reads
`environment.prep`: when `prep` is false the app is running as "SiCODID" and those PREP-only routes redirect to
`jefatura-de-gobierno`.

### Data layer: single API service, `type`-discriminated endpoints

`ApiPrepService` (`src/app/services/api-prep.service.ts`) is the sole HTTP boundary (`providedIn: 'root'`). Nearly
every method takes a `tipo_consulta: 'jefatura-de-gobierno' | 'diputaciones' | 'alcaldias'` string, which the local
`typeQuery()` helper maps to a numeric `type` (1 / 2 / 4) sent to the backend — the backend disambiguates election
type by this numeric code, not by URL path. All requests are POSTs to `${environment.api_prep}/<endpoint>`
(`avance`, `resumenvotacion`, `grafica`, `combos/primero|segundo|tercero`, `estadistica`, `mapas`, `distribucion`,
`pruebadistribucion`); response shapes are typed via interfaces in `src/app/interfaces/`. When adding a new
data-driven view, add a method here rather than calling `HttpClient` from a component.

Selection state across the three-level drill-down combos (distrito/alcaldía → sección → casilla) is held in
`ComboStateService` (`primerCombo`/`segundoCombo`/`tercerCombo`), a plain mutable singleton rather than an
Observable/Subject-based store.

### Module structure

- `SharedModule` (`src/app/shared/`) declares/exports cross-cutting layout and data-display components used across
  all feature modules: `SidebarComponent`, `EncabezadoComponent`, `BreadcrumbsComponent`, `AvanceEntidadComponent`
  (+ `AvanceEntidadMovilComponent` for mobile), `EstadisticaComponent`, `ResumenVotacionComponent`,
  `ContenedorResultadosDinamicoComponent`, `ModalidadVotosComponent`, `BuscadorComponent`, `CompartirComponent`,
  `LeyendaResultadosInformativosComponent`, `FooterAvisoPrivacidadComponent`.
- `src/app/components/` holds components declared directly on `AppModule` (charts, cards, spinner, per-level result
  views) rather than on `SharedModule` — reused across the lazy feature modules via direct relative imports, since
  they aren't exported from a shared module.
- `src/app/pages/` (`PagesModule`) is the `informacion-prep` section (e.g. `base-datos`, `preguntas-frecuentes`),
  gated by `EsSicodidGuard`.
- `src/app/pipes/` (`PipesModule`) currently provides `remplaza-guiones-medios-abajos` (dash/underscore text
  normalization), used in result labels.

### Guards/interceptors

`EsSicodidGuard` is the only route guard; there are no HTTP interceptors configured (`HttpClientModule` is imported
plain in `AppModule`).
