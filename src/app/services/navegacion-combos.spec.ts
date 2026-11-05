import { rutaAlCambiarDistOAlcaldia } from './navegacion-combos';

describe('rutaAlCambiarDistOAlcaldia', () => {
  it('should keep the partido view when the district changes from that view', () => {
    expect(rutaAlCambiarDistOAlcaldia('/diputaciones/votos-por-partido-politico-y-candidatura-independiente/1', 2))
      .toBe('/diputaciones/votos-por-partido-politico-y-candidatura-independiente/2');
  });

  it('should keep the detalle por casilla view when the district changes from that view', () => {
    expect(rutaAlCambiarDistOAlcaldia('/alcaldias/detalle-por-casilla/3', '10')).toBe('/alcaldias/detalle-por-casilla/10');
  });

  it('should open the selected district in the same view when it comes from the entity level', () => {
    expect(rutaAlCambiarDistOAlcaldia('/diputaciones/votos-por-partido-politico-y-candidatura-independiente', 5))
      .toBe('/diputaciones/votos-por-partido-politico-y-candidatura-independiente/5');
  });

  it('should go back to votos por candidatura when the district changes from a sección', () => {
    expect(rutaAlCambiarDistOAlcaldia('/diputaciones/casillas/18/3188', 17)).toBe('/diputaciones/votos-por-candidatura/17');
  });
});
