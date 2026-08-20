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

## `DistribucionRpService.obtenerActasRp(idDistrito?: string)`

- **Método futuro sugerido**: `POST {api_prep}/actas-rp` — nota: `ApiPrepService` ya tiene un método real sin
  consumidor, `obtenerDatosDistribucion(tipo_consulta, dist_o_alcaldia, seccion, casilla,
  mostrar_no_reg_y_nulos, es_distribucion)` → `POST /pruebadistribucion`, que **podría** ser el candidato real
  para esto — se documenta como candidato, no se conecta, por la decisión explícita de esta migración de no
  añadir llamadas reales nuevas.
- **Parámetros**: `type` (fijo en 2, diputaciones — RP no aplica a alcaldías/gubernatura), `id_distrito` opcional.
- **Modelo de respuesta**: `DistribucionRp` — `{ partidos: string[]; actas: ActaRp[] }`, `ActaRp = { seccion,
  casilla, votosPorPartido: Record<string, number>, noRegistrados, nulos, total, observacion, disponible }`.
- **Manejo de errores**: `ResourceState.status = 'error'`; estado `'empty'` si `actas.length === 0`.
- **Componente consumidor**: `RepresentacionProporcionalComponent` → `TablaActasComponent`.
- **Relación con navegación/breadcrumbs**: la ruta `votos-por-representacion-proporcional` alimenta
  `configuracionBreadcrumbs.votos_por` (label "Representación Proporcional" agregado a
  `LabelTransformerViewFoService`).

## `VotoExtranjeroService.obtenerActas()`

- **Método futuro sugerido**: mismo patrón que RP, `POST {api_prep}/actas-voto-extranjero` o el mismo
  `/pruebadistribucion` parametrizado por modalidad.
- **Parámetros**: ninguno hoy (mock estático); en real, probablemente `type` fijo + modalidad.
- **Modelo de respuesta**: mismo `DistribucionRp` que RP (en static-site ambas páginas comparten estructura y
  datos de ejemplo idénticos).
- **Manejo de errores**: igual patrón.
- **Componente consumidor**: `PlantillaComponent` (ruta `voto-en-el-extranjero`) → `TablaActasComponent`.
- **Relación con navegación/breadcrumbs**: el label "Voto en el Extranjero" ya existía en
  `LabelTransformerViewFoService`, no requirió cambio.

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
