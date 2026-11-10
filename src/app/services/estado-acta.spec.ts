import { ESTADOS_ACTA, estadoActa } from './estado-acta';

describe('estadoActa', () => {
  it('should mark the acta as contabilizada only when contabilizar is T', () => {
    expect(estadoActa({ contabilizar: 'T' })).toEqual({ contabilizada: true, etiqueta: 'Contabilizada', claseColor: 'text-success' });
    expect(estadoActa({ contabilizar: 'F' }).contabilizada).toBeFalse();
    expect(estadoActa({}).etiqueta).toBe('No Contabilizada');
  });

  it('should list both states for the legend', () => {
    expect(ESTADOS_ACTA.map(({ etiqueta }) => etiqueta)).toEqual(['Contabilizada', 'No Contabilizada']);
  });
});
