import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import { ApiPrepService } from '../../services/api-prep.service';

HC_map(Highcharts);

// "@highcharts/map-collection": "^2.1.0",
// "highcharts-angular": "^3.1.2",




@Component({
  standalone: false,
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [
    `
    .row-ganador{
      border-top: 2px solid #C791A8;
      border-bottom: 2px solid #C791A8;
      border-left: 2px solid #C791A8;
      border-right: 2px solid #C791A8
    }
    `
  ]
})
export class MapaComponent implements OnInit {

  resultVotos: any[] = [];
  participantes: any[] = [];
  public total_suma_filas: number = 0;
  public arrDemarcacionesObtenidas: any[] = []
  
  
  public mapData: any; // Variable para almacenar los datos del mapa
  public tipoEleccion: any;
  public lblTypeMap: string = 'Alcaldías';
  public routeGeoJson = `alcaldias.geo.json`;


  constructor(private http: HttpClient, private router: Router, private apiPrepService: ApiPrepService) { }

  ngOnInit(): void {

    this.loadTypeMap();
    this.obtenerDatosDelServicio();

    
    this.loadMapData();
  }

  obtenerDatosDelServicio() {
    
    this.apiPrepService.obtenerInformacionMapas( this.tipoEleccion )
    .subscribe( res => {
      console.log(res);
      this.arrDemarcacionesObtenidas = res.data.participantes;
      this.total_suma_filas = this.arrDemarcacionesObtenidas.reduce( (sum, value) => sum+(value.total_demarcaciones ? value.total_demarcaciones : 0), 0 );
        
      })

  }

  loadTypeMap(){
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos
    const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

    this.tipoEleccion = tipoVisualizacion;
    // Highcharts.mapChart('map-container', {});

  }
  
  loadMapData(): void {
    if(this.tipoEleccion === 'diputaciones'){
      this.routeGeoJson = `distritos.geo.json`;
      this.lblTypeMap = 'Distritos';
    }
    // Cambiar la ruta del archivo JSON según su ubicación en tu proyecto
    this.http.get(`assets/json/${this.routeGeoJson}`).subscribe(data => {
      // this.renderMapDist();
      
      this.mapData = data;
      if(this.tipoEleccion === 'diputaciones'){
        this.renderMapDist();
      } else{
        this.renderMapAlc();
      }

    });
  }

  renderMapDist(): void {
    Highcharts.mapChart('map-container', {
      chart: {
        map: this.mapData
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      mapNavigation: {
        enabled: false,
        enableButtons: true,
        enableMouseWheelZoom: true,
        buttonOptions: {
          align: 'right',
          verticalAlign: 'top'
        }
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              color: '#21335c'
            }
          },
          point: {
            events: {
              click: function(event) {
                console.log(event); // Aquí puedes ver las propiedades del objeto point en la consola
              }
            }
          }
        },
        map: {
          tooltip: {
            headerFormat: '',
            pointFormat: 'Distrito {point.properties.ID}',
          },
          cursor: 'pointer',
        }
      },
      series: [
        {
          type: 'map',
          data: this.mapData.features,
          dataLabels: {
            enabled: true,
            format: 'Distrito {point.properties.ID}',
            style: {
              fontSize: '10px'
            }
          },
          point: {
            events: {
              click: (row) => {
                console.log(row.point.properties);
                const currentUrl = this.router.url; // Obtiene la URL actual

                console.log(currentUrl);
                
                
                this.router.navigate([currentUrl+'/'+row.point.properties.ID]);
              }
            }
          },
        }
      ],
      title: {
        text: ''
      }
    });
  }
  
  renderMapAlc(): void {
    Highcharts.mapChart('map-container', {
      chart: {
        map: this.mapData
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      mapNavigation: {
        enabled: false,
        enableButtons: true,
        enableMouseWheelZoom: true,
        buttonOptions: {
          align: 'right',
          verticalAlign: 'top'
        }
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              color: '#21335c'
            }
          },
          point: {
            events: {
              click: function(event) {
                console.log(event); // Aquí puedes ver las propiedades del objeto point en la consola
              }
            }
          }
        },
        map: {
          tooltip: {
            headerFormat: '',
            pointFormat: '{point.properties.nomgeo}',
          },
          cursor: 'pointer',
        }
      },
      series: [
        {
          type: 'map',
          data: this.mapData.features,
          dataLabels: {
            enabled: true,
            format: '{point.properties.nomgeo}',
            style: {
              fontSize: '10px'
            }
          },
          point: {
            events: {
              click: (row) => {
                console.log(row.point.properties);
                const currentUrl = this.router.url; // Obtiene la URL actual

                console.log(currentUrl);
                
                
                this.router.navigate([currentUrl+'/'+row.point.properties.municipio]);
              }
            }
          },
        }
      ],
      title: {
        text: ''
      }
    });
  }

  public getColor(siglas: string){
    console.log(siglas);
    
  }

}
