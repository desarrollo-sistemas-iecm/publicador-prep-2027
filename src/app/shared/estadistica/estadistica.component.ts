import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import { ApiPrepService } from '../../services/api-prep.service';
import { Router } from '@angular/router';
import { Actas, CantidadesUrbanas, ListaNominal, Votos } from 'src/app/interfaces/estadistica.interface';
import { environment } from 'src/environments/environment.development';

// Inicialización de los módulos adicionales de Highcharts
HighchartsMore(Highcharts);
SolidGauge(Highcharts);


@Component({
  standalone: false,
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: [`./estadistica.component.css`]
})
export class EstadisticaComponent implements OnInit {

  public prep: boolean = environment.prep = false;

  public tipo_consulta: string = '';

  // public obj_actas: Actas = {};
  // public obj_cantidades: CantidadesUrbanas = {};
  // public obj_lista_nominal: ListaNominal = {};
  // public obj_votos: Votos = {};

  public esperadas: number = 0;
  public computadas: number = 0;
  public esperadas_por: string = '';
  public computadas_por: string = '';
  public urbanas: number = 0;
  public no_urbanas: number = 0;
  public lista_nominal_oficial: number = 0;
  public actas_contabilizadas: number = 0;
  public votos_casillas_normales: number = 0;
  public votos_casillas_especiales: number = 0;
  public total_votos: number = 0;

  @ViewChild('contenedorGauge') contenedorGauge!: ElementRef;

  constructor( private apiPrepService: ApiPrepService, private router: Router ) { }

  ngOnInit(): void {
    this.cargarInfoEstadistica();
    this.renderizarGauge();
  }

  cargarInfoEstadistica(){

    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    // console.log(segments);
    

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipo_consulta = tipoVisualizacion;

    } else {
      // console.error('Tipo de visualización no válido o URL incorrecta');
    }

    this.apiPrepService.obtenerInformacionEstadistica(this.tipo_consulta  )
      .subscribe( (res) => {
        console.log(res);
        const { data } = res;

        const { actas, cantidades_urbanas, lista_nominal, votos } = data;
        const { computadas, computadas_por, esperadas, esperadas_por } = actas;
        this.computadas = computadas || 0;
        this.esperadas = esperadas || 0;
        this.computadas_por = computadas_por || '';
        this.esperadas_por = esperadas_por || '';

        const { no_urbanas, urbanas } = cantidades_urbanas;
        this.no_urbanas = no_urbanas || 0;
        this.urbanas = urbanas || 0;

        const { lista_nominal_oficial, actas_contabilizadas } = lista_nominal;
        this.actas_contabilizadas = actas_contabilizadas || 0;
        this.lista_nominal_oficial = lista_nominal_oficial || 0;

        const { total_votos, votos_casillas_especiales, votos_casillas_normales, suma_total_votos, total_votos_query } = votos;
        this.votos_casillas_normales = votos_casillas_normales || 0;
        this.votos_casillas_especiales = votos_casillas_especiales || 0;
        this.total_votos = total_votos_query || 0;
        
      } )


  }

  renderizarGauge(): void {
    Highcharts.chart({
      chart: {
        type: 'solidgauge',
        marginTop: 10,
        backgroundColor: 'none',
        renderTo: 'contenedorGauge'
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Lista nominal de las casillas<br>con Actas Contabilizadas<br><b style="font-size:20px;color:#000">'+this.actas_contabilizadas+'</b>',
        align: 'right',
        style: {
          fontSize: '12px'
        }
      },
      tooltip: {
        enabled: false,
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: '10px'
        },
        pointFormat: '{series.name}<br><span style="font-size:12px; color:#000000; font-weight: bold">{point.y}%</span>'
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: 'none',
          borderWidth: 0
        }, { // Track for Exercise
          outerRadius: '87%',
          innerRadius: '63%',
          backgroundColor: 'none',
          borderWidth: 0
        }, { // Track for Stand
          outerRadius: '62%',
          innerRadius: '38%',
          backgroundColor: 'none',
          borderWidth: 0
        }]
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
        labels: {
          y: 16
        }
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
            //y: 5,
            //borderWidth: 0,
            //useHTML: true
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: false
        },
    
      },
      series: [
        {
          type: 'solidgauge',
          name: 'Lista Nominal Oficial',
          colorByPoint: true,
          data: [
            {
              color: 'silver',
              radius: '100%',
              innerRadius: '78%',
              y: 100,
				      // completa: "7,772,400",
              value: this.lista_nominal_oficial,
              dataLabels: {
                enabled: true,
                format: '<div style="text-align:center;"><span style="color:#000000; font-weight: bold">{series.name}</span><br><span style="font-size:22px; color: Black}; font-weight: bold">{point.value}</span></div>'
              }
            }
          ],
        },
        {
          type: 'solidgauge',
          name: 'Capturadas',
          colorByPoint: true,
          data: [{
            color: '#e73a8c',
            radius: '85%',
            innerRadius: '95%', //75%
    
            y: 98.1002
          }],
          dataLabels: {
            enabled: true,
            format: '<div style="text-align:center;><span style="color:#F4CEE8; font-weight: bold">{series.name}</span><br><span style="font-size:12px; color: {point.color}; font-weight: bold">{point.y}%</span></div>'
          }
        }
      ]

    }, (chart) => {
      // renderTo
      // log
    })


  }

}
