import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';
import { DistribucionRpService } from 'src/app/services/distribucion-rp.service';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

/**
 * Migrado de static-site/screenRP.html ("Diputaciones - Casillas Especiales",
 * tabla "Actas de Representación Proporcional (RP)"). Datos de ejemplo vía
 * DistribucionRpService (mock) — ver docs/migration/06-contratos-servicios-propuestos.md.
 */
@Component({
  standalone: false,
  selector: 'app-representacion-proporcional',
  templateUrl: './representacion-proporcional.component.html'
})
export class RepresentacionProporcionalComponent implements OnInit {

  public actasRp$: Observable<ResourceState<DistribucionRp>> = this.distribucionRpService.obtenerActasRp(
    this.route.snapshot.paramMap.get('id_distrito_alcaldia') ?? undefined
  );

  public configuracionBreadcrumbs: BreadcrumbsConfig = this.breadcrumbsService.configuracionVacia();

  constructor(
    private route: ActivatedRoute,
    private distribucionRpService: DistribucionRpService,
    private breadcrumbsService: BreadcrumbsService
  ) { }

  ngOnInit(): void {
    this.configuracionBreadcrumbs = {
      ...this.breadcrumbsService.configuracionVacia(),
      tipo_eleccion: 'diputaciones',
      votos_por: 'votos-por-representacion-proporcional',
      votosPorNivel1: 'votos-por-representacion-proporcional',
      distrito: Number(this.route.snapshot.paramMap.get('id_distrito_alcaldia')) || 0
    };
  }

}
