import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { DISTRIBUCION_RP_MOCK } from 'src/app/mocks/distribucion-rp.mock';

/**
 * Proveedor mock de Actas de Representación Proporcional (migrado de
 * static-site/screenRP.html). Ver docs/migration/06-contratos-servicios-propuestos.md
 * para el endpoint real futuro propuesto.
 */
@Injectable({
  providedIn: 'root'
})
export class DistribucionRpService {

  obtenerActasRp(idDistrito?: string): Observable<ResourceState<DistribucionRp>> {
    return of(DISTRIBUCION_RP_MOCK).pipe(
      map((data): ResourceState<DistribucionRp> =>
        data.actas.length ? { status: 'success', data } : { status: 'empty' }
      ),
      delay(300),
      startWith<ResourceState<DistribucionRp>>({ status: 'loading' })
    );
  }
}
