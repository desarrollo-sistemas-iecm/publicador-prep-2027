import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { Participacion } from 'src/app/interfaces/detalle-casilla.interface';
import { descripcionCasilla } from 'src/app/services/etiqueta-casilla';

const TIPOS_CONSULTA = ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'];

export interface BarraParticipacion {
  etiqueta: string;
  participacion: string;
  listaNominal: number;
  ancho: number;
}

/**
 * "Estadística de Casillas" (sección) y "Estadística de Casilla" (casilla):
 * barra de participación ciudadana de cada casilla contra su lista nominal,
 * como en PREP Coahuila 2026 y las Preguntas frecuentes de PREP2024.
 */
@Component({
  standalone: false,
  selector: 'app-estadistica-casillas',
  templateUrl: './estadistica-casillas.component.html',
  styleUrls: ['./estadistica-casillas.component.css']
})
export class EstadisticaCasillasComponent implements OnInit {

  public barras: BarraParticipacion[] = [];
  public esCasilla = false;
  public cargando = true;

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    const [, tipoConsulta, vista, distOAlcaldia, seccion, casilla] = this.router.url.split('/');
    this.esCasilla = vista === 'casilla';

    if (!TIPOS_CONSULTA.includes(tipoConsulta)) {
      this.cargando = false;
      return;
    }

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, null)
      .subscribe({
        next: ({ itemRecords: { participacion } }) => {
          this.barras = participacion
            .filter(({ tipo_casilla }) => !this.esCasilla || tipo_casilla === casilla)
            .map((fila) => this.aBarra(fila));
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
  }

  private aBarra({ id_seccion, tipo_casilla, participacion, lista_nominal }: Participacion): BarraParticipacion {
    const porcentaje = Number(participacion) || 0;

    return {
      etiqueta: `${id_seccion} Casilla ${descripcionCasilla(tipo_casilla)}`,
      participacion,
      listaNominal: lista_nominal,
      // Puede rebasar el 100% (ver leyenda); la barra se limita a su ancho total.
      ancho: Math.min(Math.max(porcentaje, 0), 100)
    };
  }

}
