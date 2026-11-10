import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiPrepService } from './api-prep.service';
import { DetalleCasillaResponse } from '../interfaces/detalle-casilla.interface';
import { ResAvance } from '../interfaces/avance-entidad';
import { environment } from 'src/environments/environment.development';

describe('ApiPrepService', () => {
  const urlDistribucion = `${environment.api_prep}/distribucion`;
  const respuesta = { success: true, msg: '', itemRecords: {} } as DetalleCasillaResponse;

  let service: ApiPrepService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ApiPrepService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  describe('obtenederDetalleVotosCasilla', () => {
    it('should send a single request when two consumers ask for the same casillas at once', () => {
      const recibidas: DetalleCasillaResponse[] = [];

      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe((res) => recibidas.push(res));
      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe((res) => recibidas.push(res));

      const peticion = http.expectOne(urlDistribucion);
      peticion.flush(respuesta);

      expect(peticion.request.body).toEqual({ type: 2, seleccion: '18', seccion: undefined });
      expect(recibidas).toEqual([respuesta, respuesta]);
    });

    it('should send separate requests when the consumers ask for different secciones', () => {
      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe();
      service.obtenederDetalleVotosCasilla('diputaciones', '18', '3188', null).subscribe();

      const peticiones = http.match(urlDistribucion);
      peticiones.forEach((peticion) => peticion.flush(respuesta));

      expect(peticiones.length).toBe(2);
    });

    it('should request fresh data when the previous request already finished', () => {
      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe();
      http.expectOne(urlDistribucion).flush(respuesta);

      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe();

      http.expectOne(urlDistribucion).flush(respuesta);
    });

    it('should allow a new request when the previous one failed', () => {
      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe({ error: () => undefined });
      http.expectOne(urlDistribucion).flush('error', { status: 500, statusText: 'Server Error' });

      service.obtenederDetalleVotosCasilla('diputaciones', '18', undefined, null).subscribe();

      http.expectOne(urlDistribucion).flush(respuesta);
    });
  });

  describe('obtenerAvanceEntidad', () => {
    const urlAvance = `${environment.api_prep}/avance`;
    const avance = { avance: {}, corte: {} } as ResAvance;

    it('should send a single request when the progress cards and the spinner ask for the same election at once', () => {
      const recibidas: ResAvance[] = [];

      service.obtenerAvanceEntidad('diputaciones').subscribe((res) => recibidas.push(res));
      service.obtenerAvanceEntidad('diputaciones').subscribe((res) => recibidas.push(res));
      service.obtenerAvanceEntidad('diputaciones').subscribe((res) => recibidas.push(res));

      const peticion = http.expectOne(urlAvance);
      peticion.flush(avance);

      expect(peticion.request.body).toEqual({ type: 2 });
      expect(recibidas).toEqual([avance, avance, avance]);
    });

    it('should give the response to a consumer that subscribes while another one receives it', () => {
      const recibidas: ResAvance[] = [];

      service.obtenerAvanceEntidad('diputaciones').subscribe(() => {
        service.obtenerAvanceEntidad('diputaciones').subscribe((res) => recibidas.push(res));
      });
      http.expectOne(urlAvance).flush(avance);

      expect(recibidas).toEqual([avance]);
    });

    it('should send separate requests when the elections are different', () => {
      service.obtenerAvanceEntidad('diputaciones').subscribe();
      service.obtenerAvanceEntidad('alcaldias').subscribe();

      const peticiones = http.match(urlAvance);
      peticiones.forEach((peticion) => peticion.flush(avance));

      expect(peticiones.map(({ request }) => request.body)).toEqual([{ type: 2 }, { type: 4 }]);
    });
  });
});

