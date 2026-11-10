import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';

export const ID_LEYENDA_OBSERVACIONES = 'leyenda-observaciones-en-acta';

/**
 * Recuadro "Observaciones en Acta" junto al resumen de la casilla, como en
 * PREP Coahuila 2026: muestra la observación del acta, si tiene, y enlaza a
 * la leyenda que explica cada observación.
 */
@Component({
  standalone: false,
  selector: 'app-observaciones-casilla',
  templateUrl: './observaciones-casilla.component.html'
})
export class ObservacionesCasillaComponent implements OnInit {

  public observaciones = '';

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion, casilla] = this.router.url.split('/');

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, null)
      .subscribe(({ itemRecords }) => {
        const acta = itemRecords.data.find(({ tipo_casilla }) => tipo_casilla === casilla);
        this.observaciones = acta?.observaciones && acta.observaciones !== '--' ? acta.observaciones : '';
      });
  }

  irALeyenda(): void {
    document.getElementById(ID_LEYENDA_OBSERVACIONES)?.scrollIntoView({ behavior: 'smooth' });
  }

}
