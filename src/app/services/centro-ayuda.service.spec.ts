import { TestBed } from '@angular/core/testing';
import { CentroAyudaService } from './centro-ayuda.service';

describe('CentroAyudaService', () => {
  let service: CentroAyudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroAyudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerPreguntas debe emitir loading y luego success con datos', (done) => {
    const estados: string[] = [];
    service.obtenerPreguntas().subscribe((estado) => {
      estados.push(estado.status);
      if (estado.status === 'success') {
        expect(estado.data && estado.data.length).toBeGreaterThan(0);
        expect(estados).toEqual(['loading', 'success']);
        done();
      }
    });
  });
});
