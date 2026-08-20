# 08 — Reporte final

**Esta migración NO está al 100%.** Este reporte documenta honestamente lo hecho y lo pendiente.

## 1. Resumen ejecutivo

`publicador-prep-2027` resultó ser, al analizarlo, una app Angular 21 real con un flujo principal de
resultados electorales ya conectado a un backend real (`ApiPrepService`), no un cascarón vacío para llenar
desde cero. `static-site` es una demo estática y sin backend del PREP 2021. El alcance real de esta migración
fue: completar contenido y funcionalidad genuinamente faltante o rota en Angular (enlaces rotos, páginas
huérfanas, Representación Proporcional, 404, breadcrumbs no data-driven), no reconstruir el flujo principal
que ya existía y funcionaba.

Se ejecutó de corrido (sin checkpoints intermedios, según lo acordado), con verificación real en navegador
(`ng serve`) que encontró y corrigió dos bugs que el build/tests no habrían detectado: un problema de layout
en la página 404 (clase `py-5` de Bootstrap pisando el `padding-top` que compensa el header fijo) y un backdrop
de modal Bootstrap que quedaba pegado al navegar (afecta a todos los modales de la app, no solo los nuevos).

## 2. Total de archivos HTML encontrados

19 archivos HTML de nivel superior en `static-site`. Todos inventariados en `01-inventario-static-site.md`.

## 3. Páginas migradas / 4. Porcentaje real de cobertura

Ver detalle fila por fila en `04-matriz-trazabilidad.md`. Resumen:

| Estado | Páginas |
|---|---|
| Validado en navegador esta sesión | 8 de 19 (`404.html`, `avisoprivacidad.html`, `centro-ayuda.html`, `screenRP.html`, `screenextranjero.html`, `tipo_cred.html`, más `index.html` y `participa.html` confirmados sin necesitar cambios) |
| Migrado/preexistente, no tocado ni re-verificado a fondo esta sesión | 6 de 19 (`screen01`, `screen01_01`, `screen02`, `screen03`, `screen04`, `screenSeccion`) |
| En desarrollo (existe, paridad de contenido parcial) | 2 de 19 (`base-de-datos.html`, `screenPreguntas.html`) |
| Bloqueado (funciona parcialmente, hereda bug preexistente no corregido) | 1 de 19 (`screenCasilla.html`) |
| No aplica, justificado | 2 de 19 (`actualizando_bd.html`, `preguntas.html`) |

**El 100% de las páginas tiene destino asignado y documentado (cobertura de asignación = 100%). La cobertura
de implementación+verificación completa es menor: 8/19 validadas de punta a punta en esta sesión, 6/19 ya
funcionaban de antes sin tocarse, y 5/19 quedan con alguna limitación documentada (contenido parcial o bug
preexistente no corregido).**

## 5. Rutas Angular creadas o modificadas

- Nueva: `pagina-no-encontrada` (raíz) → `PaginaNoEncontradaComponent`. Wildcard `**` ya no redirige en
  silencio a `inicio`.
- Nueva: `diputaciones/votos-por-representacion-proporcional[/:id_distrito_alcaldia]` →
  `RepresentacionProporcionalComponent`.
- Modificada (metadata): `voto-condiciones-excepcionales/voto-en-el-extranjero` — se agregó `data:
  { mostrarTablaActas, tituloTablaActas }`.

## 6. Componentes creados

`PaginaNoEncontradaComponent`, `RepresentacionProporcionalComponent`, `TablaActasComponent` (compartido).

## 7. Componentes reutilizados (no se crearon duplicados innecesarios)

`FooterAvisoPrivacidadComponent`, `EncabezadoComponent`, `BuscadorComponent` (se les agregó el modal que les
faltaba cada uno, sin crear componentes aparte); `PlantillaComponent` (se le agregó soporte condicional para
`TablaActasComponent` vía `route.data`, reutilizando el mismo componente compartido que RP en vez de duplicar
la tabla).

## 8. Servicios, modelos y mocks incorporados

- Interfaces: `resource-state.interface.ts`, `centro-ayuda.interface.ts`, `tipo-credencial.interface.ts`,
  `distribucion-rp.interface.ts`.
- Mocks: `centro-ayuda.mock.ts`, `tipo-credencial.mock.ts`, `distribucion-rp.mock.ts`, `voto-extranjero.mock.ts`,
  `base-datos.mock.ts`, `legal-content.mock.ts`.
- Servicios: `BreadcrumbsService`, `CentroAyudaService`, `TipoCredencialService`, `DistribucionRpService`,
  `VotoExtranjeroService`.
- Contratos futuros propuestos para cada servicio mock: `06-contratos-servicios-propuestos.md`.

## 9. Sistema de breadcrumbs

Se centralizó en `BreadcrumbsService` la lógica que antes estaba duplicada verbatim en 5 componentes. Se
agregó `votosPorNivel1` a `BreadcrumbsConfig` para que el link "Distrito" del breadcrumb navegue por URL real
(sobrevive recarga directa) en vez de `history.go()`. El link "Sección"/"Casilla" **sigue** usando
`history.go()` — no se rehizo en esta iteración (ver Pendientes).

## 10. Estado del componente `bienvenida`

**Intacto, sin modificar.** Spec existente sigue pasando. Verificado en navegador: renderiza igual, el único
botón ("Consulta Resultados Preliminares") navega correctamente a `/jefatura-de-gobierno`.

## 11. Pruebas ejecutadas y resultados

`npm run build:dev`: exit 0, sin errores. `npx ng test --watch=false --browsers=ChromeHeadless`: **17/17
SUCCESS** (3 preexistentes + 14 nuevos). Detalle completo, incluyendo las 11 pruebas manuales en navegador
(con los 2 bugs encontrados y corregidos), en `07-reporte-pruebas.md`.

## 12. Resultado del build

Limpio (`✔ Browser application bundle generation complete`). Warnings preexistentes no relacionados con esta
migración (CommonJS de `highcharts`).

## 13. Pendientes reales (no maquillados)

1. **`screenPreguntas.html` (71 preguntas) no se auditó línea por línea** contra `PreguntasFrecuentesComponent`
   — se confirmó que renderiza y no está roto, pero no hay garantía de paridad de contenido completa.
2. **`base-de-datos.html` (893 líneas)**: solo se centralizaron los valores de "Avance Entidad" y se quitó el
   `onclick` muerto; el resto del contenido (definición, formato de celdas, interpretación, autenticidad) no
   se comparó línea por línea contra la fuente.
3. **`screen03.html`/`screen04.html`** se marcaron "Migrado" asumiendo el mismo patrón que `screen01`/`screen02`
   (ya migrados antes de esta sesión), sin releer el HTML fuente completo para confirmar paridad 1:1.
4. **Link "Sección"/"Casilla" del breadcrumb** sigue usando `history.go()`, frágil en recarga directa de URL.
5. **Bug preexistente en `ApiPrepService.obtenederDetalleVotosCasilla`** (no envía `casilla` al backend) — no
   corregido, documentado como fuera de alcance seguro.
6. **Unificación de los dos sistemas de variables Bootstrap** (`--bs-*` vs `--blue`/`--primary`) — no
   abordada, fuera de alcance por riesgo de regresión visual sin poder verificar contra backend real.

## 14. Riesgos y recomendaciones

- Antes de dar por buena la paridad de contenido de `base-de-datos`/`preguntas-frecuentes`, hacer una pasada
  dedicada línea por línea contra las fuentes (`base-de-datos.html`, `screenPreguntas.html`).
- Antes de conectar los servicios mock nuevos a datos reales, confirmar si `DistribucionRpService`/
  `VotoExtranjeroService` deben apuntar al método ya existente `ApiPrepService.obtenerDatosDistribucion()`
  (`POST /pruebadistribucion`) o a un endpoint nuevo — ver `06-contratos-servicios-propuestos.md`.
- El backdrop de modal corregido en `AppComponent` es un parche puntual (limpieza en `NavigationStart`); una
  solución más robusta a futuro sería migrar los modales a un sistema Angular-nativo (`@angular/cdk/overlay`
  o similar) en vez de jQuery/Bootstrap, pero eso es un cambio de mayor alcance no incluido aquí.
- `DistribucionVotosComponent` (feature preexistente "MAQUETA" de distribución de votos por coalición, no
  relacionada con ninguna página de static-site) quedó intacta — su implementación real es trabajo aparte,
  no de esta migración.

## 15. Ubicación de la documentación

`publicador-prep-2027/docs/migration/` (este archivo y los 7 anteriores).

## 16. Confirmación: `static-site` no fue modificado

Confirmado con `git status`/`git diff` en el repo `static-site` al cierre de esta sesión: working tree limpio,
cero cambios. Solo se usó como fuente de lectura.
