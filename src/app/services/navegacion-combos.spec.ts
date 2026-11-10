import { rutaAlCambiarCasilla, rutaAlCambiarDistOAlcaldia, rutaAlCambiarSeccion } from './navegacion-combos';

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

describe('rutaAlCambiarSeccion', () => {
  it('should open the sección of the current district from a district view', () => {
    expect(rutaAlCambiarSeccion('/diputaciones/votos-por-candidatura/18', 3188)).toBe('/diputaciones/casillas/18/3188');
  });

  it('should open the sección of the current district from a casilla', () => {
    expect(rutaAlCambiarSeccion('/alcaldias/casilla/10/4512/B01', '4513')).toBe('/alcaldias/casillas/10/4513');
  });
});

describe('rutaAlCambiarCasilla', () => {
  it('should open the casilla of the current sección', () => {
    expect(rutaAlCambiarCasilla('/diputaciones/casillas/18/3188', 'C01')).toBe('/diputaciones/casilla/18/3188/C01');
  });

  it('should replace the casilla when it changes from another casilla', () => {
    expect(rutaAlCambiarCasilla('/jefatura-de-gobierno/casilla/18/3188/B01', 'C01')).toBe('/jefatura-de-gobierno/casilla/18/3188/C01');
  });
});
