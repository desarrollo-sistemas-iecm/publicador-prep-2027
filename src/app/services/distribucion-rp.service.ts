import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { ApiPrepService } from './api-prep.service';
import { aEstadoActas } from './actas-modalidad.mapper';

/**
 * Actas de Representación Proporcional (casillas especiales) desde
 * `POST actas/rp`; sin distrito, trae las de toda la entidad.
 */
@Injectable({
  providedIn: 'root'
})
export class DistribucionRpService {

  constructor(private apiPrepService: ApiPrepService) { }

  obtenerActasRp(idDistrito?: string): Observable<ResourceState<DistribucionRp>> {
    const seleccion = Number(idDistrito) || undefined;
    return aEstadoActas(this.apiPrepService.obtenerActasRp(seleccion));
  }
}
