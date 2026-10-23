# 06 — Contratos de servicios propuestos (mock → real)

Todos los servicios mock nuevos exponen `Observable<ResourceState<T>>`. Cuando exista el backend real, el
patrón de reemplazo es: mismo método, mismo tipo de retorno, cambiar el `of(MOCK).pipe(...)` interno por
`this.http.post<T>(...)` — los componentes consumidores **no cambian**, porque ya consumen `ResourceState<T>`
vía `async` pipe, no el mock directamente.

## `CentroAyudaService.obtenerPreguntas()`

- **Método futuro sugerido**: `GET {api_prep}/centro-ayuda` (contenido estático institucional; no requiere POST
  con `type` como el resto de `ApiPrepService`, ya que no depende del tipo de elección).
- **Parámetros**: ninguno.
- **Modelo de respuesta**: `PreguntaAyuda[]` — `{ id: string; pregunta: string; respuesta: string[]; tabla?: {
  encabezados: string[]; filas: string[][] } }`.
- **Manejo de errores**: `ResourceState.status = 'error'` en el componente si el `catchError` del futuro
  `HttpClient` emite; hoy el mock nunca emite error.
- **Componente consumidor**: `EncabezadoComponent` (modal `#modalCentroAyuda`).
- **Relación con navegación/breadcrumbs**: ninguna — es contenido modal, no una vista con ruta propia.

## `TipoCredencialService.obtenerTipoCredencial()`

- **Método futuro sugerido**: `GET {api_prep}/tipo-credencial` — o, más probablemente, contenido 100% estático
  sin backend (son 4 imágenes fijas de referencia), en cuyo caso este servicio se queda tal cual permanentemente.
- **Parámetros**: ninguno.
- **Modelo de respuesta**: `TipoCredencial` — `{ titulo: string; imagenes: { id, src, alt }[] }`.
- **Manejo de errores**: igual patrón `ResourceState`.
- **Componente consumidor**: `BuscadorComponent` (modal `#modalCasilla`, tooltip "Verificar tipo de credencial").
- **Relación con navegación/breadcrumbs**: ninguna.

## `DistribucionRpService.obtenerActasRp(idDistrito?: string)` — conectado (2026-10-23)

- **Endpoint real**: `POST {api_prep}/actas/rp` vía `ApiPrepService.obtenerActasRp(seleccion?)`. Equivale a
  `actas_grid_data_rp.php` de 2024: casillas especiales (`tipo_casilla` `S*`), `type=3` fijo en el servidor.
  Diseño: `services-prep-2027/docs/superpowers/specs/2026-10-23-actas-rp-voto-extranjero-design.md`.
- **Parámetros**: `seleccion` (distrito) opcional; sin él trae las actas RP de toda la entidad.
- **Respuesta**: misma forma que `POST distribucion` (`itemRecords.columns`/`data`). `mapearActasModalidad()`
  (`services/actas-modalidad.mapper.ts`) la convierte a `DistribucionRp`: cada columna `votos_part_N` es un
  partido (su `title` trae las siglas) y `disponible` es `nombre_img != null`.
- **Manejo de errores**: `ResourceState` — `'loading'` → `'success'`/`'empty'`, y `'error'` si falla la petición.
- **Componente consumidor**: `RepresentacionProporcionalComponent` → `TablaActasComponent`.

## `VotoExtranjeroService.obtenerActas(tipo_consulta)` — conectado (2026-10-23)

- **Endpoint real**: `POST {api_prep}/actas/extranjero` con `{ type }`, vía
  `ApiPrepService.obtenerActasVotoExtranjero()`. Equivale a `actas_grid_data_voto_prision_ant.php` con
  `tipo_acta=M`. Todas las elecciones reciben voto del extranjero.
- **Respuesta / errores**: igual que RP (mismo mapeador).
- **Componente consumidor**: `PlantillaComponent` (ruta `voto-en-el-extranjero`, con el tipo de elección de la
  URL) → `TablaActasComponent`.

## `base-datos.mock.ts` (`AVANCE_BASE_DATOS_MOCK`)

No es un servicio, es una constante centralizada consumida directamente por `BaseDatosComponent`. **No** se
propone un contrato HTTP nuevo para esto: el dato real correspondiente ya existe en `ApiPrepService.obtenerAvanceEntidad()`
(usado por `AvanceEntidadComponent` en el resto de la app). Cuando `base-datos` se conecte a datos reales, el
camino natural es reemplazar este mock por el mismo `AvanceEntidadComponent`/`AvanceEntidadMovilComponent` ya
existentes, no crear un endpoint nuevo.

## Contratos no definidos por falta de información suficiente

No se propuso contrato para `actualizando_bd.html` (estado de mantenimiento): no hay forma de inferir de forma
responsable qué dispara ese estado sin acceso al backend/proceso operativo real de "actualización de BD". Se
marca explícitamente como propuesta pendiente, no como contrato definitivo, para no inventar un endpoint sin
respaldo.
