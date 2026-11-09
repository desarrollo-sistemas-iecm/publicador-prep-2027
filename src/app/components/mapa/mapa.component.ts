import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import { forkJoin } from 'rxjs';
import { ApiPrepService } from '../../services/api-prep.service';
import { COLOR_SIN_GANADOR, colorPartido } from '../../services/colores-partidos';
import { Participante, ResultVoto } from '../../interfaces/mapas-demarcaciones.interface';

HC_map(Highcharts);

const NAVEGACION_SIN_ZOOM: Highcharts.MapNavigationOptions = {
  enabled: false,
  enableButtons: false,
  enableMouseWheelZoom: false,
  enableDoubleClickZoom: false,
  enableTouchZoom: false
};

interface GeoJsonDemarcaciones {
  type: string;
  features: { type: string; properties: Record<string, string | number>; geometry: object }[];
}

@Component({
  standalone: false,
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [
    `
    .fila > div:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .row-ganador{
      border-top: 2px solid #C791A8;
      border-bottom: 2px solid #C791A8;
      border-left: 2px solid #C791A8;
      border-right: 2px solid #C791A8;
      border-radius: .5rem;
    }
    `
  ]
})
export class MapaComponent implements OnInit {

  public total_suma_filas: number = 0;
  public arrDemarcacionesObtenidas: Participante[] = [];

  public tipoEleccion: string = '';
  public lblTypeMap: string = 'Alcaldías';
  public colorPartido = colorPartido;

  constructor(private http: HttpClient, private router: Router, private apiPrepService: ApiPrepService) { }

  ngOnInit(): void {
    this.tipoEleccion = this.router.url.split('/')[1];
    const esDiputaciones = this.tipoEleccion === 'diputaciones';
    if (esDiputaciones) {
      this.lblTypeMap = 'Distritos';
    }
    const rutaGeoJson = esDiputaciones ? 'distritos.geo.json' : 'alcaldias.geo.json';

    forkJoin({
      mapas: this.apiPrepService.obtenerInformacionMapas(this.tipoEleccion),
      geoJson: this.http.get<GeoJsonDemarcaciones>(`assets/json/${rutaGeoJson}`)
    }).subscribe(({ mapas, geoJson }) => {
      this.arrDemarcacionesObtenidas = mapas.data.participantes;
      this.total_suma_filas = this.arrDemarcacionesObtenidas.reduce((suma, { total_demarcaciones }) => suma + (total_demarcaciones ?? 0), 0);
      this.renderMapa(geoJson, mapas.data.result_votos, esDiputaciones ? 'ID' : 'municipio');
    });
  }

  private renderMapa(geoJson: GeoJsonDemarcaciones, resultVotos: ResultVoto[], propiedadId: string): void {
    const ganadorPorDemarcacion = new Map(resultVotos.map(({ id_distrito, siglas_ganador }) => [id_distrito, siglas_ganador]));
    const demarcaciones = geoJson.features.map((feature) => {
      const siglasGanador = ganadorPorDemarcacion.get(Number(feature.properties[propiedadId]));
      return {
        [propiedadId]: feature.properties[propiedadId],
        color: siglasGanador ? colorPartido(siglasGanador) : COLOR_SIN_GANADOR
      };
    });

    Highcharts.mapChart('map-container', {
      chart: {
        map: geoJson as Highcharts.GeoJSON,
        panning: { enabled: false }
      },
      credits: { enabled: false },
      exporting: { enabled: false },
      legend: { enabled: false },
      title: { text: '' },
      tooltip: { enabled: false },
      mapNavigation: NAVEGACION_SIN_ZOOM,
      plotOptions: {
        map: {
          cursor: 'pointer',
          borderColor: '#000000',
          borderWidth: 1,
          states: {
            hover: { brightness: 0.1 },
            inactive: { enabled: false }
          }
        }
      },
      series: [
        {
          type: 'map',
          data: demarcaciones as Highcharts.SeriesMapDataOptions[],
          joinBy: propiedadId,
          dataLabels: { enabled: false },
          point: {
            events: {
              click: (evento) => {
                const { properties } = evento.point as Highcharts.Point & { properties: Record<string, string | number> };
                this.router.navigate([`${this.router.url}/${properties[propiedadId]}`]);
              }
            }
          }
        }
      ]
    });
  }

}
