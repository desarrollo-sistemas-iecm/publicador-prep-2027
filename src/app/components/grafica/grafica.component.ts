import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { CandidatoGrafica } from 'src/app/interfaces/grafica.interface';
import { colorPartido } from 'src/app/services/colores-partidos';

const MARCAS_EJE_PORCENTAJE = [100, 80, 60, 40, 20, 0];

@Component({
  standalone: false,
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [
  ],
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  public tipo_consulta: string = '';

  // public

  public votos: CandidatoGrafica[] = [];
  public votos_casillas: CandidatoGrafica[] = [];
  public votos_extranjero: CandidatoGrafica[] = [];
  public escalaMaxima = 0;
  public esDistribucion = false;
  public readonly marcasEje = MARCAS_EJE_PORCENTAJE;
  /*   public votos = {
      candidatos: [
        {
          "nombre": "Manuel Muñoz Cano",
          "partido": "Partido X",
          "votos": 23256,
          "porcentaje": 3.9390,
          "en_casillas": 23227,
          "en_extranjero": 29
        },
        {
          "nombre": "Imelda Margarita Sanmiguel Sánchez",
          "partido": "Partido Y",
          "votos": 130459,
          "porcentaje": 22.0968,
          "en_casillas": 130203,
          "en_extranjero": 256
        },
        {
          "nombre": "José Ramón Gómez Leal",
          "partido": "Partido Z",
          "votos": 421091,
          "porcentaje": 71.3234,
          "en_casillas": 420659,
          "en_extranjero": 432
        }
      ]
    };   */

  constructor(private apiPrepService: ApiPrepService, public router: Router) { }
  ngOnInit(): void {
    this.cargarInformacionGrafica();
  }

  cargarInformacionGrafica() {
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipo_consulta = tipoVisualizacion;
      let dist_o_alcaldia = null;
      let seccion = null;
      let casilla = null;

      if (segments[3]) {
        dist_o_alcaldia = Number(segments[3]);
      }
      if (segments[4]) {
        seccion = Number(segments[4]);
      }

      if (segments[5]) {
        casilla = segments[5];
      }

      this.esDistribucion = segments[2] === 'votos-por-partido-politico-y-candidatura-independiente';

      forkJoin({
        grafica: this.apiPrepService.obtenerGraficaJG(this.tipo_consulta, dist_o_alcaldia, seccion, casilla, true, this.esDistribucion),
        distribucion: this.apiPrepService.obtenerDatosDistribucion(this.tipo_consulta, dist_o_alcaldia, seccion, casilla, true, this.esDistribucion)
      }).subscribe(({ grafica, distribucion }) => {
        this.votos = grafica.agrupado;
        this.votos_casillas = distribucion.agrupado;
        this.votos_extranjero = distribucion.dataExtranjero;
        this.escalaMaxima = calcularEscalaMaxima(Math.max(0, ...grafica.agrupado.map(({ total_votos }) => total_votos)));
      });



    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }


  }

  transformaSiglasAGuinBajo(siglas: string = '') {
    return siglas.replaceAll('-', '_');
  }

  alturaBarra(totalVotos: number): number {
    return this.escalaMaxima ? (totalVotos * 100) / this.escalaMaxima : 0;
  }

  colorBarra(siglas: string): string {
    return colorPartido(siglas);
  }

  valorMarcaEje(porcentaje: number): number {
    return Math.round((this.escalaMaxima * porcentaje) / 100);
  }


}

export const calcularEscalaMaxima = (maximo: number): number => {
  if (maximo <= 0) {
    return 0;
  }
  const magnitud = 10 ** Math.floor(Math.log10(maximo));
  return Math.ceil(maximo / magnitud) * magnitud;
};
