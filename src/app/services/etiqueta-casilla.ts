const TIPOS_CASILLA: Record<string, string> = {
  B: 'Básica',
  C: 'Contigua',
  E: 'Extraordinaria',
  S: 'Especial',
  A: 'Voto Anticipado',
  M: 'Voto en el Extranjero',
  P: 'Voto en Prisión Preventiva',
};

const descripcionSegmento = (segmento: string): string => {
  const [, prefijo, numero] = segmento.match(/^([A-Z])(\d+)$/) ?? [];
  const tipo = prefijo ? TIPOS_CASILLA[prefijo] : undefined;

  if (!tipo) {
    return segmento;
  }

  return prefijo === 'B' ? tipo : `${tipo} ${Number(numero)}`;
};

/**
 * Nombre legible de una casilla a partir de su sección y su clave, como en
 * PREP Coahuila 2026: `3188 Básica`, `3188 Contigua 2`,
 * `242 Extraordinaria 1 Contigua 1`. Las claves que no siguen el patrón
 * conocido se muestran tal cual.
 */
export const etiquetaCasilla = (seccion: number | string, tipoCasilla: string): string => {
  const clave = tipoCasilla.replace(/\s+/g, '').toUpperCase();
  const descripcion = /^([A-Z]\d+)+$/.test(clave)
    ? (clave.match(/[A-Z]\d+/g) ?? []).map(descripcionSegmento).join(' ')
    : tipoCasilla;

  return `${seccion} ${descripcion}`;
};
