import { TestBed } from '@angular/core/testing';
import { TipoCredencialService } from './tipo-credencial.service';

describe('TipoCredencialService', () => {
  let service: TipoCredencialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCredencialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerTipoCredencial debe emitir 4 imágenes en success', (done) => {
    service.obtenerTipoCredencial().subscribe((estado) => {
      if (estado.status === 'success') {
        expect(estado.data?.imagenes.length).toBe(4);
        done();
      }
    });
  });
});
