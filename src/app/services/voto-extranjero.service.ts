import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { DISTRIBUCION_VOTO_EXTRANJERO_MOCK } from 'src/app/mocks/voto-extranjero.mock';

/**
 * Proveedor mock de Actas de Voto de las y los Mexicanos Residentes en el Extranjero
 * (migrado de static-site/screenextranjero.html). Ver
 * docs/migration/06-contratos-servicios-propuestos.md.
 */
@Injectable({
  providedIn: 'root'
})
export class VotoExtranjeroService {

  obtenerActas(): Observable<ResourceState<DistribucionRp>> {
    return of(DISTRIBUCION_VOTO_EXTRANJERO_MOCK).pipe(
      map((data): ResourceState<DistribucionRp> =>
        data.actas.length ? { status: 'success', data } : { status: 'empty' }
      ),
      delay(300),
      startWith<ResourceState<DistribucionRp>>({ status: 'loading' })
    );
  }
}
