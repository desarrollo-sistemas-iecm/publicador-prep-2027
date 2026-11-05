const COLORES_PARTIDOS: Record<string, string> = {
  'PAN': '#005CA9',
  'PRI': '#E30613',
  'PRD': '#FFCC00',
  'PVEM': '#50B747',
  'PT': '#D52B1E',
  'MORENA': '#B5261E',
  'MC': '#FFA500',
  'PAN-PRI-PRD': '#4479E1',
  'PVEM-PT-MORENA': '#800040',
  'no_registrados': '#C0C0C0',
  'votos_nulos': '#808080'
};

const COLOR_PARTIDO_POR_DEFECTO = '#B283B9';

export const COLOR_SIN_GANADOR = '#E0E0E0';

export const colorPartido = (siglas: string | null | undefined): string =>
  (siglas ? COLORES_PARTIDOS[siglas] : undefined) ?? COLOR_PARTIDO_POR_DEFECTO;
