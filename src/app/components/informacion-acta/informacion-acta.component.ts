import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';

type OrigenImagen = 'proceso' | 'escaner' | 'movil' | 'urna' | 'movil-catd';

interface OpcionOrigen {
  clave: OrigenImagen;
  etiqueta: string;
  icono: string;
}

@Component({
  standalone: false,
  selector: 'app-informacion-acta',
  templateUrl: './informacion-acta.component.html',
  styles: [
    `
    .origen {
    opacity: .45;
}
    .origen-activo {
    opacity: 1;
    font-weight: bold;
}
    `
  ]
})
export class InformacionActaComponent implements OnInit {

  public contabilizada: boolean | null = null;
  public tieneImagen: boolean = false;
  public observaciones: string = '';
  // TODO: el backend aún no expone el origen de la imagen del acta; valor de muestra.
  public origen: OrigenImagen = 'escaner';

  public readonly opcionesOrigen: OpcionOrigen[] = [
    { clave: 'proceso', etiqueta: 'Acta en proceso', icono: 'fa-hourglass-half' },
    { clave: 'escaner', etiqueta: 'Escáner', icono: 'fa-print' },
    { clave: 'movil', etiqueta: 'Móvil', icono: 'fa-mobile' },
    { clave: 'urna', etiqueta: 'Urna Electrónica', icono: 'fa-qrcode' },
    { clave: 'movil-catd', etiqueta: 'Móvil CATD', icono: 'fa-building' },
  ];

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion, casilla] = this.router.url.split('/');

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, casilla)
      .subscribe(({ itemRecords }) => {
        const acta = itemRecords.data.find(({ tipo_casilla }) => tipo_casilla === casilla);
        this.contabilizada = acta ? acta.contabilizar === 'T' : null;
        this.tieneImagen = Boolean(acta?.nombre_img);
        this.observaciones = acta?.observaciones && acta.observaciones !== '--' ? acta.observaciones : '';
      });
  }

}
