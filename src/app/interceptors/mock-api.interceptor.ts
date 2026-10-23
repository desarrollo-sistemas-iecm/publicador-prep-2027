import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import {
  mockAvance, mockResumenVotacion, mockGrafica, mockPruebaDistribucion,
  mockCombosPrimero, mockCombosSegundo, mockCombosTercero,
  mockEstadistica, mockMapas, mockDistribucion, mockBusquedaSeccion, mockActasModalidad
} from 'src/app/mocks/api-prep.mock';

/**
 * Sustituye las llamadas a ApiPrepService (environment.api_prep) por datos ficticios
 * mientras no exista backend levantado en este entorno (ver docs/migration/07-reporte-pruebas.md,
 * "No se probó el drill-down completo de combos... porque los combos se llenan vía ApiPrepService
 * real, no disponible"). Solo actúa si environment.useMockApi es true; en producción es transparente.
 */
@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!environment.useMockApi || !req.url.startsWith(environment.api_prep)) {
      return next.handle(req);
    }

    const [path, query] = req.url.slice(environment.api_prep.length).split('?');
    const body = req.body || {};
    const params = new URLSearchParams(query || '');
    const body$ = this.resolverMock(path, body, params);

    return of(new HttpResponse({ status: 200, body: body$ })).pipe(delay(300));
  }

  private resolverMock(path: string, body: any, params: URLSearchParams): any {
    switch (true) {
      case path === '/avance':
        return mockAvance();
      case path === '/resumenvotacion':
        return mockResumenVotacion();
      case path === '/grafica':
        return mockGrafica(Number(body.dist_o_alcaldia) || Number(body.type) || 1);
      case path === '/pruebadistribucion':
        return mockPruebaDistribucion(Number(body.dist_o_alcaldia) || Number(body.type) || 1);
      case path === '/combos/primero':
        return mockCombosPrimero(Number(body.type));
      case path === '/combos/segundo':
        return mockCombosSegundo(Number(body.seleccion));
      case path === '/combos/tercero':
        return mockCombosTercero(Number(body.seccion));
      case path === '/estadistica':
        return mockEstadistica();
      case path === '/mapas':
        return mockMapas(Number(body.type));
      case path === '/distribucion':
        return mockDistribucion(Number(body.seleccion), Number(body.seccion));
      case path === '/actas/rp':
        return mockActasModalidad('S', Number(body.seleccion) || 5);
      case path === '/actas/extranjero':
        return mockActasModalidad('M', 0);
      case path === '/api_seccion.php':
        return mockBusquedaSeccion(Number(params.get('seccion')));
      default:
        return {};
    }
  }
}
