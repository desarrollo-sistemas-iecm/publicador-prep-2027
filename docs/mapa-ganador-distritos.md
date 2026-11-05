# Mapa de distritos y alcaldías: criterio de "ganador"

Pendiente de decisión. Vista: "Distritos obtenidos" / "Alcaldías obtenidas" junto al mapa
(`MapaComponent`, `src/app/components/mapa/`), alimentada por `POST /mapas`
(`MapasService.obtener()` en `services-prep-2027/src/modules/resultados-explotacion/services/mapas.service.ts`).

## Hallazgo

La tabla resalta una fila con `.row-ganador` según `participantes[].ganador`, pero el criterio no
coincide con el de PREP Coahuila 2026:

| | Fila resaltada (`ganador`) |
|---|---|
| PREP 2027 (hoy) | El participante con **más votos sumados en toda la entidad** |
| PREP Coahuila 2026 | El participante con **mayor número de distritos obtenidos** |

El texto de Coahuila lo dice explícitamente: "Se resalta el Partido Político, Coalición o
Candidatura Independiente que lleva ventaja hasta el momento con mayor número de Distritos
obtenidos."

Normalmente ambos criterios coinciden, pero pueden diferir: un participante puede sumar más votos
en la entidad y ganar menos distritos. En ese caso la fila resaltada no sería la de la cifra más
alta de la tabla.

## Lo que ya se alinea con Coahuila

- El ganador de cada demarcación lo calcula el backend (`result_votos[].siglas_ganador`).
- El mapa pinta cada polígono con el color del ganador (`colorPartido()`,
  `src/app/services/colores-partidos.ts`); sin votos queda gris (`COLOR_SIN_GANADOR`).
- Una demarcación sin votos no tiene ganador ni cuenta en `total_demarcaciones`.
- Sin labels ni tooltip sobre los polígonos.

## Por decidir

1. Criterio de `ganador`: votos en la entidad (actual) o demarcaciones obtenidas (Coahuila). Si
   se cambia, es una línea en `MapasService`: elegir el máximo de `demarcacionesGanadas` en lugar
   de `totalesGlobales`.
2. Empates:
   - Por demarcación: hoy gana la primera columna en el orden del catálogo de candidatos.
   - Con el criterio de Coahuila, dos participantes pueden empatar en demarcaciones obtenidas;
     definir si se resaltan ambos, ninguno o se desempata por votos.
3. Confirmar contra PREP 2024 en producción: la respuesta original de `getRecordSetMap()`
   (`rank_dto_*`/`win_*`) no se conservó en el contrato actual.
