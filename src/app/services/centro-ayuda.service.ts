import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { PreguntaAyuda } from 'src/app/interfaces/centro-ayuda.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { CENTRO_AYUDA_MOCK } from 'src/app/mocks/centro-ayuda.mock';

/**
 * Proveedor mock del contenido del Centro de Ayuda (migrado de static-site/centro-ayuda.html).
 * Ver docs/migration/06-contratos-servicios-propuestos.md para el endpoint real propuesto
 * que debería reemplazar a este servicio.
 */
@Injectable({
  providedIn: 'root'
})
export class CentroAyudaService {

  obtenerPreguntas(): Observable<ResourceState<PreguntaAyuda[]>> {
    return of(CENTRO_AYUDA_MOCK).pipe(
      map((data): ResourceState<PreguntaAyuda[]> =>
        data.length ? { status: 'success', data } : { status: 'empty' }
      ),
      delay(300),
      startWith<ResourceState<PreguntaAyuda[]>>({ status: 'loading' })
    );
  }
}
