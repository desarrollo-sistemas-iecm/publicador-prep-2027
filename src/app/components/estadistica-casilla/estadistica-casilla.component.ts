import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';

@Component({
  standalone: false,
  selector: 'app-estadistica-casilla',
  templateUrl: './estadistica-casilla.component.html',
  styles: [
  ]
})
export class EstadisticaCasillaComponent {

  public columns: any[] = [];
  public rows: any[] = [];

  public tipo_consulta: string = '';
  public dist_o_alcaldia: string = '';
  public seccion: string = '';
  public casilla: string = '';

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  cargarInfo() {
    console.log('Cargar info!');

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    console.log(segments);


    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipo_consulta = tipoVisualizacion;
      this.dist_o_alcaldia = segments[3];
      this.seccion = segments[4];

    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }

    this.apiPrepService.obtenederDetalleVotosCasilla(this.tipo_consulta, this.dist_o_alcaldia, this.seccion, this.casilla)
      .subscribe((res) => {
        console.log(res);
        // this.columns = res.itemRecords.columns;
        this.rows = res.itemRecords.participacion;

      })

  }

}
