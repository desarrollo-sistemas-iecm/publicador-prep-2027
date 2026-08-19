import { Component, OnInit } from '@angular/core';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { VotoExtranjeroService } from 'src/app/services/voto-extranjero.service';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';

@Component({
  standalone: false,
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styles: [
  ]
})
export class PlantillaComponent implements OnInit {

  tipoEleccion: any;

  public configuracionBreadcrumbs: BreadcrumbsConfig = this.breadcrumbsService.configuracionVacia();

  public mostrarTablaActas = false;
  public tituloTablaActas = '';
  public actas$: Observable<ResourceState<DistribucionRp>> | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
    private votoExtranjeroService: VotoExtranjeroService
  ) {}

  ngOnInit(): void {
    this.mostrarTablaActas = !!this.route.snapshot.data['mostrarTablaActas'];
    this.tituloTablaActas = this.route.snapshot.data['tituloTablaActas'] || '';
    if (this.mostrarTablaActas) {
      this.actas$ = this.votoExtranjeroService.obtenerActas();
    }

    const segments = this.router.url.split('/');

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipoEleccion = tipoVisualizacion;
      this.configuracionBreadcrumbs.votos_por = segments[3];
      this.configuracionBreadcrumbs.votosPorNivel1 = segments[3];
      this.configuracionBreadcrumbs.tipo_eleccion = tipoVisualizacion;
    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }
  }

}
