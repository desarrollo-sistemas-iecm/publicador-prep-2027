import { TestBed } from '@angular/core/testing';
import { BreadcrumbsService } from './breadcrumbs.service';

describe('BreadcrumbsService', () => {
  let service: BreadcrumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('construirDesdeUrl debe extraer tipo_eleccion y votos_por de la URL', () => {
    const configuracion = service.construirDesdeUrl('/diputaciones/votos-por-candidatura/5');
    expect(configuracion.tipo_eleccion).toBe('diputaciones');
    expect(configuracion.votos_por).toBe('votos-por-candidatura');
    expect(configuracion.votosPorNivel1).toBe('votos-por-candidatura');
  });

  it('construirTitulo debe incluir el tipo de elección en mayúsculas', () => {
    const configuracion = service.configuracionVacia();
    configuracion.tipo_eleccion = 'alcaldias';
    configuracion.votos_por = 'votos-por-candidatura';

    const titulo = service.construirTitulo(configuracion);
    expect(titulo).toContain('ALCALDIAS');
  });
});
