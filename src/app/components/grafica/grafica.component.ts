import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';

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

public votos: any[] = [];
public votos_casillas: any[] = [];
public votos_extranjero: any[] = [];
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

  constructor( private apiPrepService: ApiPrepService, public router: Router ){}
  ngOnInit(): void {
    this.cargarInformacionGrafica();
  }

  cargarInformacionGrafica(){
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);
    

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipo_consulta = tipoVisualizacion;
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

      if(segments[2] == 'votos-por-partido-politico-y-candidatura-independiente'){

        this.apiPrepService.obtenerDatosDistribucion(this.tipo_consulta, dist_o_alcaldia, seccion, casilla, true, true)
        .subscribe( (res: any) => {
          
          console.log(res);
          // Esta es la propiedad que guarda la respuesta
          // this.votos = res.data.agrupado;
          this.votos_casillas = res.data.agrupado;
          this.votos_extranjero = res.data.dataExtranjero;
          
        } )

      } else{

        this.apiPrepService.obtenerGraficaJG(this.tipo_consulta, dist_o_alcaldia, seccion, casilla, true)
        .subscribe( (res: any) => {
          
          console.log(res);
          // Esta es la propiedad que guarda la respuesta
          this.votos = res.data.agrupado;
    
          
        } )
        
      }
     


    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }


  }

  transformaSiglasAGuinBajo( siglas: string = '' ){
    return siglas.replaceAll('-', '_');
  }


}
