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
