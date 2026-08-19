import { Injectable } from '@angular/core';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { LabelTransformerViewFoService } from './label-transformer-view-fo.service';
import { environment } from 'src/environments/environment.development';

/**
 * Punto único de construcción de BreadcrumbsConfig y del título de página dinámico.
 * Antes esta lógica estaba duplicada de forma idéntica en PrimerNivelComponent,
 * SegundoNivelComponent, TercerNivelComponent, TestComponent y VotacionPorCasillaComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  constructor(private labelTransformerService: LabelTransformerViewFoService) { }

  configuracionVacia(): BreadcrumbsConfig {
    return {
      tipo_eleccion: '',
      votos_por: '',
      votosPorNivel1: '',
      alcaldia: 0,
      nombre_alcaldia: null,
      distrito: 0,
      seccion: 0,
      casilla: ''
    };
  }

  construirDesdeUrl(url: string): BreadcrumbsConfig {
    const segments = url.split('/');
    const configuracion = this.configuracionVacia();
    configuracion.tipo_eleccion = segments[1] || '';
    configuracion.votos_por = segments[2] || '';
    configuracion.votosPorNivel1 = segments[2] || '';
    return configuracion;
  }

  construirTitulo(configuracion: BreadcrumbsConfig): string {
    const { tipo_eleccion, votos_por } = configuracion;
    const proyecto = environment.prep
      ? environment.detalle_sistema_prep.siglas
      : environment.detalle_sistema_sicodid.siglas;

    const originalTitle = `${proyecto} IECM 2024 `;
    const vistaPor = votos_por
      ? this.labelTransformerService.transformaLabelVistaPor(votos_por).toUpperCase()
      : '';

    return `${originalTitle} - ${(tipo_eleccion || '').toUpperCase()} - ${vistaPor}`;
  }
}
