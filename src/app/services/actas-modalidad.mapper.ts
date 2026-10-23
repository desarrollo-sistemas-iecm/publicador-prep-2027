import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DistribucionRp, ResActasModalidad } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';

const COLUMNA_VOTOS = /^(votos_part_\d+|total_votos_cc\d+)$/;

/**
 * Convierte la grilla de `POST actas/rp` / `POST actas/extranjero` al modelo de
 * `TablaActasComponent`: cada columna de votos aporta un partido (su `title`
 * son las siglas) y cada fila de `data`, un acta.
 */
export const mapearActasModalidad = ({ itemRecords }: ResActasModalidad): DistribucionRp => {
  const columnasVotos = itemRecords.columns.filter(({ dataIndex }) => COLUMNA_VOTOS.test(dataIndex));

  return {
    partidos: columnasVotos.map(({ title }) => title),
    actas: itemRecords.data.map((fila) => ({
      seccion: String(fila.id_seccion ?? ''),
      casilla: String(fila.tipo_casilla ?? ''),
      votosPorPartido: Object.fromEntries(
        columnasVotos.map(({ dataIndex, title }) => [title, Number(fila[dataIndex] ?? 0)])
      ),
      noRegistrados: Number(fila.votos_cand_no_reg ?? 0),
      nulos: Number(fila.votos_nulos ?? 0),
      total: Number(fila.votacion_total ?? 0),
      observacion: fila.observaciones,
      disponible: fila.nombre_img !== null && fila.nombre_img !== undefined
    }))
  };
};

/** Envuelve la petición en `ResourceState` (loading → success/empty, o error). */
export const aEstadoActas = (
  respuesta$: Observable<ResActasModalidad>
): Observable<ResourceState<DistribucionRp>> =>
  respuesta$.pipe(
    map(mapearActasModalidad),
    map((data): ResourceState<DistribucionRp> =>
      data.actas.length ? { status: 'success', data } : { status: 'empty' }
    ),
    catchError(() => of<ResourceState<DistribucionRp>>({ status: 'error', error: 'No fue posible obtener las actas.' })),
    startWith<ResourceState<DistribucionRp>>({ status: 'loading' })
  );
