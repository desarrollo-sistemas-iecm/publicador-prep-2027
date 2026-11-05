import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiPrepService } from '../../services/api-prep.service';
import { Router } from '@angular/router';
import { CandidatoGrafica } from 'src/app/interfaces/grafica.interface';

const ANCHO_DESPLAZAMIENTO = 404;

@Component({
  standalone: false,
  selector: 'app-moving-cards',
  templateUrl: './moving-cards.component.html',
  styleUrls: ['./moving-cards.component.css']
})
export class MovingCardsComponent implements OnInit {

  @ViewChild('carrusel') carrusel?: ElementRef<HTMLElement>;

  public cards: CandidatoGrafica[] = [];
  // En "Votos por Candidatura" la tarjeta muestra foto y nombre de la candidatura; en las demás vistas solo los logos.
  public mostrarCandidatura: boolean = false;

  constructor( private apiPrepService: ApiPrepService, private router: Router ) { }

  ngOnInit(): void {
    this.mostrarCandidatura = this.router.url.split('/')[2] === 'votos-por-candidatura';
    this.cargarInfoCards();
  }

  // "PAN-PRI-PRD" se pinta con el logo de cada partido, como las coaliciones del PREP.
  partidos(siglas: string): string[] {
    return siglas.split('-');
  }

  desplazar(direccion: 1 | -1): void {
    this.carrusel?.nativeElement.scrollBy({ left: direccion * ANCHO_DESPLAZAMIENTO });
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
        .subscribe(({ agrupado }) => {
          // No registrados y nulos ya se muestran en el resumen de la votación.
          this.cards = agrupado.filter(({ siglas }) => siglas !== 'no_registrados' && siglas !== 'votos_nulos');
        })
      

    } else {
      // console.error('Tipo de visualización no válido o URL incorrecta');
    }
    
  }

}
