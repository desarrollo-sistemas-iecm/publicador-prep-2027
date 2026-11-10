import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { rutaAlCambiarCasilla, rutaAlCambiarDistOAlcaldia, rutaAlCambiarSeccion } from 'src/app/services/navegacion-combos';
import { SpinnerService } from 'src/app/services/spinner.service';

/**
 * Estructura común de las pantallas de resultados (entidad, distrito/alcaldía, sección y casilla):
 * encabezado, sidebar con sus combos, avance, buscador, tarjeta con breadcrumbs y pie.
 * Cada pantalla proyecta el contenido de la tarjeta, lo que va justo debajo (`despuesDeTarjeta`)
 * y sus secciones (`secciones`).
 */
@Component({
  standalone: false,
  selector: 'app-plantilla-nivel',
  templateUrl: './plantilla-nivel.component.html'
})
export class PlantillaNivelComponent implements OnInit {

  @Input() esperarAvanceEntidad = true;

  public configuracionBreadcrumbs: BreadcrumbsConfig = {
    tipo_eleccion: '',
    votos_por: '',
    alcaldia: 0,
    nombre_alcaldia: null,
    distrito: 0,
    seccion: 0,
    casilla: ''
  };

  constructor(
    private router: Router,
    private titleService: Title,
    private breadcrumbsService: BreadcrumbsService,
    private apiPrepService: ApiPrepService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    if (this.esperarAvanceEntidad) {
      this.spinnerService.showLoaderUntilCompleted(this.apiPrepService.obtenerAvanceEntidad()).subscribe();
    }
  }

  alCambiarDistOAlcaldia(distOAlcaldia: string | number): void {
    this.router.navigateByUrl(rutaAlCambiarDistOAlcaldia(this.router.url, distOAlcaldia));
  }

  alCambiarSeccion(seccion: string | number): void {
    this.router.navigateByUrl(rutaAlCambiarSeccion(this.router.url, seccion));
  }

  alCambiarCasilla(casilla: string): void {
    this.router.navigateByUrl(rutaAlCambiarCasilla(this.router.url, casilla));
  }

  alConfigurarBreadcrumbs(configuracion: BreadcrumbsConfig): void {
    this.configuracionBreadcrumbs = configuracion;
    this.titleService.setTitle(this.breadcrumbsService.construirTitulo(configuracion));
  }

}
