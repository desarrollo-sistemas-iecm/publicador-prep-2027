import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { Participacion } from 'src/app/interfaces/detalle-casilla.interface';
import { etiquetaCasilla } from 'src/app/services/etiqueta-casilla';

const TIPOS_CONSULTA = ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'];

@Component({
  standalone: false,
  selector: 'app-listado-participacion-ciudadana-ln',
  templateUrl: './listado-participacion-ciudadana-ln.component.html',
  styles: [
    `
    .fnt-rsltdsll {
    font-size: 23px;
}

.tabla-seccion .contenido {
    font-size: 0.8em;
}
.max-500 {
    max-height: 500px;
    overflow-y: scroll;
}

.bg-ncbzd {
    background-color: #dddddd;
    color: #333333;
}
    `
  ]
})
export class ListadoParticipacionCiudadanaLNComponent implements OnInit {

  public filas: Participacion[] = [];
  public cargando = true;

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion] = this.router.url.split('/');

    if (!TIPOS_CONSULTA.includes(tipoConsulta)) {
      this.cargando = false;
      return;
    }

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, null)
      .subscribe({
        next: ({ itemRecords: { participacion } }) => {
          this.filas = participacion;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
  }

  etiqueta({ id_seccion, tipo_casilla }: Participacion): string {
    return etiquetaCasilla(id_seccion, tipo_casilla);
  }

}
