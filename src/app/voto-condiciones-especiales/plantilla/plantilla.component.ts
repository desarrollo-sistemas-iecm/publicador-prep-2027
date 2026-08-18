import { Component, OnInit } from '@angular/core';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styles: [
  ]
})
export class PlantillaComponent implements OnInit {

  tipoEleccion: any;

  
  public configuracionBreadcrumbs: BreadcrumbsConfig = {
    tipo_eleccion: 'Gubernatura',
    alcaldia: 0,
    casilla: '',
    distrito: 0,
    nombre_alcaldia: '',
    seccion: 0,
    votos_por: 'voto-en-prision-preventiva'
  };

  constructor( private router: Router ){}


  ngOnInit(): void {

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);
    

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      // this.tipoEleccion = tipoVisualizacion;

      this.configuracionBreadcrumbs.votos_por = segments[3];
      this.configuracionBreadcrumbs.tipo_eleccion = tipoVisualizacion;

    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }
    
  }

  

}
