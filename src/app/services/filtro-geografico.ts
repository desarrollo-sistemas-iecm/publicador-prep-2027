export interface FiltroGeografico {
  dist_o_alcaldia: number;
  seccion: number;
  casilla: string | null;
}

export const SIN_FILTRO_GEOGRAFICO: FiltroGeografico = { dist_o_alcaldia: 0, seccion: 0, casilla: null };

/** Lee distrito/alcaldía, sección y casilla de rutas `/<tipo>/<vista>/:id/:seccion/:casilla`. */
export const filtroGeograficoDesdeUrl = (url: string): FiltroGeografico => {
  const [, , , distOAlcaldia, seccion, casilla] = url.split('/');
  const seccionNumero = Number(seccion) || 0;

  return {
    dist_o_alcaldia: Number(distOAlcaldia) || 0,
    seccion: seccionNumero,
    casilla: seccionNumero && casilla ? decodeURIComponent(casilla) : null,
  };
};
