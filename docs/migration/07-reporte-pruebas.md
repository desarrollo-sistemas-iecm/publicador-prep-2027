# 07 — Reporte de pruebas

## Comandos ejecutados

```bash
npm run build:dev                                    # ng build --configuration development
npx ng test --watch=false --browsers=ChromeHeadless   # Karma/Jasmine
```

No hay `npm run lint` configurado en este proyecto (confirmado en `package.json` — ver también `CLAUDE.md` del
repo, que ya documentaba esto antes de esta migración).

## Resultado del build

```
✔ Browser application bundle generation complete.
```

Exit code `0`. Sin errores TypeScript ni de plantilla. Warnings preexistentes, no introducidos por esta
migración: `NG8107` (optional chaining redundante en `breadcrumbs.component.html` — corregido de forma
independiente durante la sesión, ver commit `fix(breadcrumbs): drop redundant optional chaining`) y
advertencias de CommonJS/AMD por la dependencia `highcharts` (preexistente, no relacionada con esta migración).

## Resultado de pruebas

```
Chrome Headless 151.0.0.0 (Mac OS 10.15.7): Executed 17 of 17 SUCCESS
TOTAL: 17 SUCCESS
```

Antes de esta migración: 3 specs (`app.component`, `bienvenida.component`, `sidebar.component`, todas
"should create"). Specs nuevos agregados en esta migración (14):

| Spec | Qué cubre |
|---|---|
| `services/breadcrumbs.service.spec.ts` | Creación, `construirDesdeUrl()` extrae tipo_eleccion/votos_por/votosPorNivel1, `construirTitulo()` incluye tipo de elección |
| `services/centro-ayuda.service.spec.ts` | Creación, `obtenerPreguntas()` emite `loading` → `success` con datos |
| `services/tipo-credencial.service.spec.ts` | Creación, `obtenerTipoCredencial()` emite 4 imágenes en `success` |
| `services/distribucion-rp.service.spec.ts` | Creación, `obtenerActasRp()` emite `success` con actas y 11 partidos |
| `pages/pagina-no-encontrada/pagina-no-encontrada.component.spec.ts` | Creación |
| `components/representacion-proporcional/representacion-proporcional.component.spec.ts` | Creación, `configuracionBreadcrumbs` fija tipo_eleccion='diputaciones' y distrito desde `ActivatedRoute` |
| `shared/tabla-actas/tabla-actas.component.spec.ts` | Creación |

Patrón seguido (idéntico al ya establecido en `sidebar.component.spec.ts`/`bienvenida.component.spec.ts`):
`RouterTestingModule` + `HttpClientTestingModule` cuando el componente inyecta `HttpClient`/`Router`/
`ActivatedRoute` directa o indirectamente, `NO_ERRORS_SCHEMA` para no declarar cada componente/pipe hijo.

## Pruebas manuales en navegador (`ng serve` en puerto 4202, sin backend real disponible)

Realizadas con clics reales (no solo lectura de código), incluyendo dos bugs reales encontrados y corregidos
durante la propia verificación (no habrían sido detectados solo con build/test):

1. **Bienvenida**: renderiza intacta, botón "Consulta Resultados Preliminares" navega a `/jefatura-de-gobierno`.
   ✅
2. **Breadcrumb dinámico**: título "Jefatura-de-gobierno - Entidad - Votos por Candidatura" renderiza
   correctamente tras la navegación. ✅
3. **Modal Centro de Ayuda**: abre, muestra las 10 preguntas + 2 tablas con el contenido migrado de
   `centro-ayuda.html`. ✅
4. **Modal Tipo de Credencial**: abre desde el tooltip del buscador, muestra las 4 imágenes A/B/C/D. ✅
5. **Modal Aviso de Privacidad**: abre desde el footer, texto correcto migrado de `avisoprivacidad.html`. ✅
   (De paso se confirmó visualmente que la fórmula de "Participación ciudadana" de `participa.html` ya estaba
   presente y correcta en `AvanceEntidadComponent`, sin necesidad de cambios.)
6. **Representación Proporcional**: link "Ver Actas de Representación Proporcional (RP)" visible solo en
   diputaciones (gateado por `tipoEleccion === 'diputaciones'`), navega a la ruta nueva, tabla de 11 partidos +
   3 actas de ejemplo renderiza igual que `screenRP.html`, botón "Ver" abre el modal "Demostración: el visor de
   actas digitalizadas requiere el backend real...". ✅
7. **Voto en el extranjero**: título de breadcrumb "Diputaciones - Entidad - Voto en el Extranjero", tabla
   "Actas de Voto de las y los Mexicanos Residentes en el Extranjero" renderiza con los mismos datos de
   ejemplo. ✅
8. **404**: navegar a una ruta inexistente redirige a `/pagina-no-encontrada`. **Bug encontrado y corregido en
   vivo**: la clase Bootstrap `py-5` pisaba el `padding-top: 137px` de `.cuerpo` (que compensa el header fijo),
   dejando la página en blanco (el contenido real quedaba renderizado pero superpuesto bajo el header). Se
   separó en un `<div>` interno; verificado de nuevo tras el fix — el texto y el botón "Ir al inicio" ya son
   visibles y el botón navega correctamente a `/inicio`. ✅ (tras el fix)
9. **Backdrop de modal tras navegación**: al abrir un modal (ej. "Ver" en la tabla de actas) y navegar sin
   cerrarlo, quedaba un `.modal-backdrop` pegado tapando la página siguiente. **Bug encontrado y corregido en
   vivo**: se agregó limpieza en `AppComponent` sobre `Router.events` (`NavigationStart`). Verificado de nuevo
   tras el fix: el backdrop ya no persiste. ✅ (tras el fix)
10. **Base de Datos**: card "Avance Entidad" muestra los valores de `base-datos.mock.ts` (13,096/13,175,
    99.4004%, 52.0485%, 07 de Junio de 2021) correctamente. ✅
11. **Preguntas Frecuentes**: renderiza sin errores (no se auditó el contenido texto por texto). ✅ (solo
    verificación de que no está roto)

## Limitaciones de las pruebas

- No hay backend real disponible (`environment.api_prep` apunta a `http://localhost/2024/sicodid/guia`, no
  levantado en este entorno). Las vistas que dependen de `ApiPrepService` (niveles 1-3 del flujo principal,
  mapas, gráficas) muestran estados vacíos/`0` — esperado y no es una regresión introducida por esta migración.
- No se probó el drill-down completo de combos (Distrito → Sección → Casilla) porque los combos se llenan vía
  `ApiPrepService` real, no disponible.
- El link de "Sección"/"Casilla" del breadcrumb (que sigue usando `history.go()`) no se volvió a probar contra
  recarga directa de URL porque no se modificó en esta iteración.
