import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { TipoCredencial } from 'src/app/interfaces/tipo-credencial.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { TIPO_CREDENCIAL_MOCK } from 'src/app/mocks/tipo-credencial.mock';

/**
 * Proveedor mock del contenido "Tipo de credencial" (migrado del modal #modalCasilla
 * de static-site). Ver docs/migration/06-contratos-servicios-propuestos.md.
 */
@Injectable({
  providedIn: 'root'
})
export class TipoCredencialService {

  obtenerTipoCredencial(): Observable<ResourceState<TipoCredencial>> {
    return of(TIPO_CREDENCIAL_MOCK).pipe(
      map((data): ResourceState<TipoCredencial> => ({ status: 'success', data })),
      delay(200),
      startWith<ResourceState<TipoCredencial>>({ status: 'loading' })
    );
  }
}
