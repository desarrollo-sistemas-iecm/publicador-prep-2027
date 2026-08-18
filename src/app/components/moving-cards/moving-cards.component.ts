import { Component, OnInit } from '@angular/core';
import { ApiPrepService } from '../../services/api-prep.service';
import { Router } from '@angular/router';

export interface CandidaturaCard {
  id_participante: number;
  campo_votos:     string;
  siglas:          string;
  descripcion:     string;
  total_votos:     number;
  porcentaje:      string;
}


@Component({
  selector: 'app-moving-cards',
  templateUrl: './moving-cards.component.html',
  styles: [
    `
    .card-resumen .encabezado{
      background: #ffffff;
    }
    `
  ]
})
export class MovingCardsComponent implements OnInit {

  public cards: CandidaturaCard[] = [];

  constructor( private apiPrepService: ApiPrepService, private router: Router ) { }

  ngOnInit(): void {
    this.cargarInfoCards();
  }

  cargarInfoCards(){
    // console.log('Cargar info para cards!');
    // console.log({distrito: this.id_distrito});

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);
    

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
          console.log(res);
          this.cards = res.data.agrupado;
          
        })
      

    } else {
      // console.error('Tipo de visualización no válido o URL incorrecta');
    }
    
  }

}
