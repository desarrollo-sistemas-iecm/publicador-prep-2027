# 05 — Arquitectura de destino

## Decisión arquitectónica principal

Se respetó la convención ya existente del proyecto en vez de imponer la organización sugerida por el prompt
maestro (`core/shared/layout/features/models/services/mocks/pages`): `publicador-prep-2027` ya usa
`components/` + `shared/` + `pages/` + `services/` + `interfaces/`, por lo que **no** se creó una carpeta
`models/` paralela a `interfaces/` ya establecida. Solo se agregó lo que no existía: `mocks/`.

## Estructura nueva agregada

```text
src/app/
├── interfaces/
│   ├── resource-state.interface.ts   (nuevo — wrapper genérico de estado)
│   ├── centro-ayuda.interface.ts     (nuevo)
│   ├── tipo-credencial.interface.ts  (nuevo)
│   └── distribucion-rp.interface.ts  (nuevo)
├── mocks/                            (carpeta nueva)
│   ├── centro-ayuda.mock.ts
│   ├── tipo-credencial.mock.ts
│   ├── distribucion-rp.mock.ts
│   ├── voto-extranjero.mock.ts       (reexporta distribucion-rp.mock: mismos datos de ejemplo que static-site)
│   ├── base-datos.mock.ts
│   └── legal-content.mock.ts         (texto legal fijo, sin pasar por ResourceState)
├── services/
│   ├── breadcrumbs.service.ts        (nuevo)
│   ├── centro-ayuda.service.ts       (nuevo)
│   ├── tipo-credencial.service.ts    (nuevo)
│   ├── distribucion-rp.service.ts    (nuevo)
│   └── voto-extranjero.service.ts    (nuevo)
├── components/
│   └── representacion-proporcional/  (nuevo componente, declarado en AppModule)
├── shared/
│   └── tabla-actas/                  (nuevo componente compartido, declarado en SharedModule)
└── pages/
    └── pagina-no-encontrada/         (nuevo, declarado en AppModule — no en PagesModule, porque debe ser
                                        alcanzable sin pasar por EsSicodidGuard)
```

## Patrón de datos: `ResourceState<T>`

```typescript
export type ResourceStatus = 'loading' | 'success' | 'empty' | 'error';
export interface ResourceState<T> {
  status: ResourceStatus;
  data?: T;
  error?: string;
}
```

Cada servicio mock nuevo expone `Observable<ResourceState<T>>`, con `delay()` simulado y `startWith({status:
'loading'})`, siguiendo el mismo espíritu que `SpinnerService` ya usa en el resto de la app. Los templates
consumen el estado con `*ngIf="estado.status === 'success'"` / `'loading'` / `'empty'` / `'error'`. Contenido
puramente estático de un solo bloque (texto legal de aviso de privacidad) se dejó como constante simple en
`legal-content.mock.ts`, sin el wrapper de estados — no simula una futura llamada HTTP real.

## Componente compartido `TablaActasComponent`

`screenRP.html` y `screenextranjero.html` en static-site comparten **exactamente** la misma tabla de "Actas"
(mismas 18 columnas, mismos datos de ejemplo). En vez de duplicar el markup, se extrajo un componente
presentacional único (`app-tabla-actas`, `@Input() titulo`, `@Input() estado: ResourceState<DistribucionRp>`),
reutilizado por `RepresentacionProporcionalComponent` y por `PlantillaComponent` (vía `route.data`). Incluye el
modal "Visor de acta digitalizada" con el mismo mensaje explicativo que static-site (`js/demo.js`
`cargaACTA()`), no un placeholder deshabilitado.

## Diferenciación de contenido por ruta (`voto-condiciones-especiales`)

`PlantillaComponent` es compartido por `voto-anticipado` / `voto-en-el-extranjero` / `voto-en-prision-preventiva`.
Solo `voto-en-el-extranjero` tiene página fuente en static-site (`screenextranjero.html`); los otros dos no
tienen contenido fuente que migrar (no existe `screen-voto-anticipado.html` ni equivalente). Se agregó
`data: { mostrarTablaActas: true, tituloTablaActas: '...' }` únicamente a la ruta `voto-en-el-extranjero` en
`voto-condiciones-especiales-routing.module.ts`; `PlantillaComponent` lee `route.snapshot.data` y solo pide el
mock/muestra la tabla cuando aplica. Los otros dos modos quedan exactamente como estaban (sin inventar
contenido no respaldado por static-site).

## Breadcrumbs dinámicos (`BreadcrumbsService`)

Antes: 5 componentes (`PrimerNivelComponent`, `SegundoNivelComponent`, `TercerNivelComponent`, `TestComponent`,
`VotacionPorCasillaComponent`) tenían un método `onConfiguracionBreadcrumbs()` **idéntico duplicado
verbatim**. Se extrajo a `BreadcrumbsService.construirTitulo()`, y cada componente quedó en 3 líneas:

```typescript
onConfiguracionBreadcrumbs(configuracion: BreadcrumbsConfig): void {
  this.configuracionBreadcrumbs = configuracion;
  this.titleService.setTitle(this.breadcrumbsService.construirTitulo(configuracion));
}
```

Se agregó `votosPorNivel1` a `BreadcrumbsConfig` (poblado una sola vez por `SidebarComponent`/`PlantillaComponent`
al entrar al nivel 1, nunca sobrescrito al hacer drill-down a sección/casilla) para poder construir el link real
de "regresar a Distrito/Alcaldía" del breadcrumb (`routerLink`) en vez de depender de `history.go(-n)`, que se
rompe en recarga directa de URL. El link de "Sección"/"Casilla" del breadcrumb **sigue** usando `history.go()`
en esta iteración — no se tocó por no tener forma segura de probarlo sin backend real (ver limitación en
`08-reporte-final.md`).

Se eliminó el dead code (`onConfiguracionBreadcrumbs()`/`actualizarBreadcrumbs()` en `BreadcrumbsComponent`,
nunca invocados desde ningún template).

## Bug de navegación transversal corregido: backdrop de modal Bootstrap

Detectado durante pruebas en navegador: todos los modales de la app (nuevos y preexistentes) usan Bootstrap 4
vía jQuery (`data-toggle="modal"`), que manipula el DOM (`.modal-backdrop`, `body.modal-open`) fuera del
control de Angular. Al navegar con el router mientras un modal está abierto, el backdrop quedaba pegado
tapando la página siguiente. Se agregó una limpieza en `AppComponent.ngOnInit()` que escucha
`Router.events` (`NavigationStart`) y cierra cualquier modal/backdrop residual. Es un fix transversal, no
específico de las páginas nuevas — mismo riesgo existía ya con los modales preexistentes
(`modalComparativa`, `modalActas`, etc.).

## Estilos

No se creó ningún hex nuevo. Todos los componentes nuevos reutilizan clases `css_ine` existentes
(`bgMorado`, `txRosaIne`, `BTN-Eleccion`, `px16`, etc.). Único cambio de CSS: se definió `--negro` (bug
preexistente, variable usada pero nunca declarada) en el `:root` ya existente de `css_ine/nuevo.css`, junto a
las demás variables Bootstrap-4-style ya presentes ahí.
