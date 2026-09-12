import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';

function quitarSimboloPorcentaje(valor: string): string {
  return valor.endsWith('%') ? valor.slice(0, -1) : valor;
}

@Component({
  standalone: false,
  selector: 'app-resumen-votacion',
  templateUrl: './resumen-votacion.component.html',
  styleUrls: ['./resumen-votacion.component.css']
})
export class ResumenVotacionComponent implements OnInit {

  public tipo_consulta: string = '';


  public votos_acumulados: number = 0;
  public porcentaje_votos_acumulados: string = '0';


  public votos_candidaturas_no_registradas: number = 0;
  public porcentaje_votos_candidaturas_no_registradas: string = '0';

  public votos_nulo: number = 0;
  public porcentaje_votos_nulo: string = '0';

  public total_votos: number = 0;
  public porcentaje_total_votos: string = '0';

  constructor(private apiPrepService: ApiPrepService, public router: Router) { }


  ngOnInit(): void {

    this.cargarResumen();
  }

  cargarResumen() {
    // console.log('Cargar info para cards!');
    // console.log({distrito: this.id_distrito});

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    // console.log(segments);


    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.apiPrepService.obtenerResumenVotacion(tipoVisualizacion)
        .subscribe((res) => {
          const { resumen_votacion } = res;

          this.votos_acumulados = resumen_votacion.votos_acumulados;
          this.porcentaje_votos_acumulados = quitarSimboloPorcentaje(resumen_votacion.votos_acumulados_por);

          this.votos_candidaturas_no_registradas = resumen_votacion.candidatos_no_reg;
          this.porcentaje_votos_candidaturas_no_registradas = quitarSimboloPorcentaje(resumen_votacion.candidatos_no_reg_por);

          this.votos_nulo = resumen_votacion.nulos;
          this.porcentaje_votos_nulo = quitarSimboloPorcentaje(resumen_votacion.nulos_por);

          this.total_votos = resumen_votacion.total;
          this.porcentaje_total_votos = quitarSimboloPorcentaje(resumen_votacion.total_por);

        })


    } else {
      // console.error('Tipo de visualización no válido o URL incorrecta');
    }

  }

}
