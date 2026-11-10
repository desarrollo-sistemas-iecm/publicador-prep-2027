const VISTAS_DE_DISTRITO = [
  'votos-por-candidatura',
  'votos-por-partido-politico-y-candidatura-independiente',
  'detalle-por-casilla',
];

/**
 * Ruta al elegir otro distrito/alcaldía en el sidebar: conserva la vista actual
 * (candidatura, partido o detalle por casilla); desde una sección o casilla
 * regresa a "Votos por Candidatura" del nuevo distrito.
 */
export const rutaAlCambiarDistOAlcaldia = (url: string, distOAlcaldia: string | number): string => {
  const [, tipoEleccion, vista] = url.split('/');
  const vistaDestino = VISTAS_DE_DISTRITO.includes(vista) ? vista : 'votos-por-candidatura';

  return `/${tipoEleccion}/${vistaDestino}/${distOAlcaldia}`;
};

export const rutaAlCambiarSeccion = (url: string, seccion: string | number): string => {
  const [, tipoEleccion, , distOAlcaldia] = url.split('/');

  return `/${tipoEleccion}/casillas/${distOAlcaldia}/${seccion}`;
};

export const rutaAlCambiarCasilla = (url: string, casilla: string): string => {
  const [, tipoEleccion, , distOAlcaldia, seccion] = url.split('/');

  return `/${tipoEleccion}/casilla/${distOAlcaldia}/${seccion}/${casilla}`;
};
