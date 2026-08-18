import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';

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
  public porcentaje_total_votos!: any;

  constructor( private apiPrepService: ApiPrepService, public router: Router ){}


  ngOnInit(): void {

    this.cargarResumen();
  }
  
  /* cargarResumen(){

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos   

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipo_consulta = tipoVisualizacion;

    }

    this.apiPrepService.obtenerResumenVotacion(this.tipo_consulta)
      .subscribe( res => {
        
        const { resumen_votacion } = res;
        this.votos_acumulados = resumen_votacion.votos_acumulados;
        this.porcentaje_votos_acumulados = resumen_votacion.votos_acumulados_por;

        this.votos_candidaturas_no_registradas = resumen_votacion.candidatos_no_reg;
        this.porcentaje_votos_candidaturas_no_registradas = resumen_votacion.candidatos_no_reg_por;

        this.votos_nulo = resumen_votacion.nulos;
        this.porcentaje_votos_nulo = resumen_votacion.nulos_por;

        this.total_votos = this.votos_acumulados+this.votos_candidaturas_no_registradas+this.votos_nulo;
        this.porcentaje_total_votos = (parseFloat(this.porcentaje_votos_acumulados)+parseFloat(this.porcentaje_votos_candidaturas_no_registradas)+parseFloat(this.porcentaje_votos_nulo));

      })

  } */

  cargarResumen(){
    // console.log('Cargar info para cards!');
    // console.log({distrito: this.id_distrito});

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    // console.log(segments);
    

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual
      let dist_o_alcaldia = null;
      let seccion = null;
      let casilla = null;

      if(segments[3]){
        dist_o_alcaldia = Number(segments[3]);
      }
      if(segments[4]){ 
        seccion = Number(segments[4]);
      }

      if(segments[5]){
        casilla = segments[5];
      }

      // this.tipo_consulta = tipoVisualizacion;
      // console.log(segments);
      this.apiPrepService.obtenerGraficaJG( tipoVisualizacion, dist_o_alcaldia, seccion, casilla, false)
        .subscribe( (res: any) => {
          // console.log(res);
          const { data } = res;
          const { resumen_votacion } = data;
          // console.log(resumen_votacion);
          
          // this.cards = res.data.agrupado;
          this.votos_acumulados = resumen_votacion.votos_acumulados;
          this.porcentaje_votos_acumulados = resumen_votacion.porcentaje_votos_acumulados;

          this.votos_candidaturas_no_registradas = resumen_votacion.votos_candidaturas_no_registradas;
          this.porcentaje_votos_candidaturas_no_registradas = resumen_votacion.porcentaje_votos_candidaturas_no_registradas;

          this.votos_nulo = resumen_votacion.votos_nulos;
          this.porcentaje_votos_nulo = resumen_votacion.porcentaje_votos_nulos;

          this.total_votos = resumen_votacion.total_votos;
          this.porcentaje_total_votos = resumen_votacion.porcentaje_total_votos;
          
        })
      

    } else {
      // console.error('Tipo de visualización no válido o URL incorrecta');
    }
    
  }

}
