import { etiquetaCasilla } from './etiqueta-casilla';

describe('etiquetaCasilla', () => {
  it('should omit the number when the casilla is básica', () => {
    expect(etiquetaCasilla(3188, 'B01')).toBe('3188 Básica');
  });

  it('should keep the number without leading zeros when the casilla is contigua', () => {
    expect(etiquetaCasilla(3188, 'C02')).toBe('3188 Contigua 2');
  });

  it('should describe both parts when the casilla is a contigua of an extraordinaria', () => {
    expect(etiquetaCasilla('242', 'E1C1')).toBe('242 Extraordinaria 1 Contigua 1');
  });

  it('should accept a space between parts when the clave is extraordinaria contigua', () => {
    expect(etiquetaCasilla(242, 'E1 C1')).toBe('242 Extraordinaria 1 Contigua 1');
  });

  it('should name the special voting modalities when the prefix is A, M or P', () => {
    expect([etiquetaCasilla(0, 'A1'), etiquetaCasilla(0, 'M01'), etiquetaCasilla(0, 'P2'), etiquetaCasilla(17, 'S01')])
      .toEqual(['0 Voto Anticipado 1', '0 Voto en el Extranjero 1', '0 Voto en Prisión Preventiva 2', '17 Especial 1']);
  });

  it('should show the clave as is when it does not follow the known pattern', () => {
    expect(etiquetaCasilla(10, 'X-9')).toBe('10 X-9');
  });
});
