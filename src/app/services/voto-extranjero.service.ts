import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { ApiPrepService } from './api-prep.service';
import { aEstadoActas } from './actas-modalidad.mapper';

/**
 * Actas de Voto de las y los Mexicanos Residentes en el Extranjero desde
 * `POST actas/extranjero`; todas las elecciones reciben voto del extranjero.
 */
@Injectable({
  providedIn: 'root'
})
export class VotoExtranjeroService {

  constructor(private apiPrepService: ApiPrepService) { }

  obtenerActas(tipo_consulta: string): Observable<ResourceState<DistribucionRp>> {
    return aEstadoActas(this.apiPrepService.obtenerActasVotoExtranjero(tipo_consulta));
  }
}
