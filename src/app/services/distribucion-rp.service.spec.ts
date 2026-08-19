import { TestBed } from '@angular/core/testing';
import { DistribucionRpService } from './distribucion-rp.service';

describe('DistribucionRpService', () => {
  let service: DistribucionRpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribucionRpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerActasRp debe emitir success con al menos un acta y 11 partidos', (done) => {
    service.obtenerActasRp().subscribe((estado) => {
      if (estado.status === 'success') {
        expect(estado.data?.actas.length).toBeGreaterThan(0);
        expect(estado.data?.partidos.length).toBe(11);
        done();
      }
    });
  });
});
