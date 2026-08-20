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
    const { tipo_eleccion, votos_por, alcaldia, nombre_alcaldia, distrito, seccion, casilla } = configuracion;
    const proyecto = environment.prep
      ? environment.detalle_sistema_prep.siglas
      : environment.detalle_sistema_sicodid.siglas;

    const originalTitle = `${proyecto} IECM 2024 `;
    const vistaPor = votos_por
      ? this.labelTransformerService.transformaLabelVistaPor(votos_por).toUpperCase()
      : '';

    return `${originalTitle} - ${(tipo_eleccion || '').toUpperCase()} - ${vistaPor}${this.construirSufijoSeleccion(alcaldia, nombre_alcaldia, distrito, seccion, casilla)}`;
  }

  /**
   * Agrega al título el nivel de segregación (alcaldía/distrito, sección, casilla)
   * al que se navegó, para poder identificarlo en los reportes de Google Analytics
   * (páginas más consultadas y hasta qué nivel de detalle se consultó).
   */
  private construirSufijoSeleccion(
    alcaldia: BreadcrumbsConfig['alcaldia'],
    nombre_alcaldia: BreadcrumbsConfig['nombre_alcaldia'],
    distrito: BreadcrumbsConfig['distrito'],
    seccion: BreadcrumbsConfig['seccion'],
    casilla: BreadcrumbsConfig['casilla']
  ): string {
    const segmentos: string[] = [];
    const idAlcaldiaODistrito = alcaldia || distrito;
    if (idAlcaldiaODistrito) {
      segmentos.push(nombre_alcaldia ? `${nombre_alcaldia}` : `#${idAlcaldiaODistrito}`);
    }
    if (seccion) {
      segmentos.push(`Sección ${seccion}`);
    }
    if (casilla) {
      segmentos.push(`Casilla ${casilla}`);
    }

    return segmentos.length ? ` - ${segmentos.join(' - ')}` : '';
  }
}
