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

  tipoEleccion = '';

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

    const segments = this.router.url.split('/');

    if (['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      this.tipoEleccion = segments[1];
      this.configuracionBreadcrumbs.votos_por = segments[3];
      this.configuracionBreadcrumbs.votosPorNivel1 = segments[3];
      this.configuracionBreadcrumbs.tipo_eleccion = segments[1];
    }

    if (this.mostrarTablaActas && this.tipoEleccion) {
      this.actas$ = this.votoExtranjeroService.obtenerActas(this.tipoEleccion);
    }
  }

}
