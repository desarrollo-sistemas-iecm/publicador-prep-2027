import { Component, OnInit } from '@angular/core';
import { ApiPrepService } from '../../services/api-prep.service';
import { Router } from '@angular/router';
import { Datum } from 'src/app/interfaces/detalle-casilla.interface';

interface Row {
  id_delegacion: number;
  id_seccion: number;
  tipo_casilla: string;
  id_distrito: number;
  boletas_sob: number;
  ciudadanos_votaron: number;
  representantes_votaron: number;
  lista_nominal: number;
  // Agrega el resto de las propiedades aquí
}


@Component({
  standalone: false,
  selector: 'app-detalle-votos-casilla',
  templateUrl: './detalle-votos-casilla.component.html',
  styles: [
    `
     .acta-digitalizada .grupo, .tabla-seccion .acta-digitalizada .grupo {
    color: #6f65a3;
}
    `
  ]
})
export class DetalleVotosCasillaComponent implements OnInit {

  public arrNoShow: (keyof Row)[] = ['id_delegacion', 'id_seccion', 'tipo_casilla', 'id_distrito', 'boletas_sob', 'ciudadanos_votaron', 'representantes_votaron', 'lista_nominal'];



  public tipo_consulta: string = '';
  public dist_o_alcaldia: string = '';
  public seccion: string = '';
  public casilla: string = '';

  public columns: any[] = [];
  public rows: any[] = [];

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
      this.casilla = segments[5];

    } else {
      console.error('Tipo de visualización no válido o URL incorrecta');
    }

    this.apiPrepService.obtenederDetalleVotosCasilla(this.tipo_consulta, this.dist_o_alcaldia, this.seccion, this.casilla)
      .subscribe((res) => {
        console.log(res);
        // this.columns = res.itemRecords.columns;
        this.rows = res.itemRecords.data;
        // res.itemRecords.columns.forEach(element => {
        //   if(element.title == ''){
        //     this.columns.push(element);
        //   }
        // });

        // console.log(this.columns);
        // Filtrar las columnas con título vacío y agregarlas a this.columns
        this.columns = res.itemRecords.columns.filter(column => column.title != '' && column.title != 'Acta digitalizada');

        console.log(this.columns);
        const dynamicColumns = this.columns.filter(column => {
          const excludedColumns = ['id_delegacion', 'id_seccion', 'tipo_casilla', 'id_distrito'];
          return !excludedColumns.includes(column.dataIndex);
        });

        // this.rows = dynamicColumns.keys;

        // console.log(dynamicColumns.keys);




      })

  }

}
