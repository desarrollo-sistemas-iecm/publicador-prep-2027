import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from '../../services/api-prep.service';

@Component({
  standalone: false,
  selector: 'app-avance-entidad-cards',
  templateUrl: './avance-entidad-cards.component.html',
  styles: [
  ]
})
export class AvanceEntidadCardsComponent implements OnInit {

  public tipo_consulta: string = '';

  public actasCapturadas: number = 0;
  public actasPorCapturar: number = 0;
  public porcentajeParticipacionCiudadana: string = '0.00';
  public ultimoCorte: string = '';
  public corteHora: string = '';
  public porcentajeActasCapturadas: string = '0.00';

  constructor( private apiPrepService: ApiPrepService, private router: Router ){}

  ngOnInit(): void {
    this.cargarAvance();
  }

  cargarAvance(){
    const currentUrl = this.router.url; // Obtiene la URL actual
    const segments = currentUrl.split('/'); // Divide la URL en segmentos

    // Verifica si la URL tiene al menos dos segmentos y el segundo es un tipo de visualización válido
    if (segments.length >= 2 && ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'].includes(segments[1])) {
      const tipoVisualizacion = segments[1]; // Obtiene el tipo de visualización actual

      this.tipo_consulta = tipoVisualizacion;
    }

    this.apiPrepService.obtenerAvanceEntidad( this.tipo_consulta )
      .subscribe( (res) => {
        this.actasCapturadas = res.avance.actas_capturadas;
        this.actasPorCapturar = res.avance.actas_capturadas_de;
        this.porcentajeParticipacionCiudadana = res.avance.participacion_porcen;
        this.porcentajeActasCapturadas = res.avance.actas_cap_porcen;
        this.ultimoCorte = res.corte.corte_fecha;
        this.corteHora = res.corte.corte_hora;
      } )
  }
}
