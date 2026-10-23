import { Column } from './detalle-casilla.interface';

export interface ActaRp {
  seccion: string;
  casilla: string;
  votosPorPartido: Record<string, number>;
  noRegistrados: number;
  nulos: number;
  total: number;
  observacion: string;
  disponible: boolean;
}

export interface DistribucionRp {
  partidos: string[];
  actas: ActaRp[];
}

/**
 * Fila de `itemRecords.data` de `POST actas/rp` y `POST actas/extranjero`
 * (misma forma que `POST distribucion`); las columnas `votos_part_N` /
 * `total_votos_ccN` varían según el catálogo de la elección.
 */
export interface FilaActaModalidad {
  [columna: string]: string | number | null;
  id_seccion: number | null;
  tipo_casilla: string | null;
  votos_cand_no_reg: number | null;
  votos_nulos: number | null;
  votacion_total: number | null;
  nombre_img: string | null;
  observaciones: string;
}

export interface ResActasModalidad {
  success: boolean;
  msg: string;
  itemRecords: {
    columns: Column[];
    data: FilaActaModalidad[];
  };
}
