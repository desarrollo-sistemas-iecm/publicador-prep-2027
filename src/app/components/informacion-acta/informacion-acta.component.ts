import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { OrigenActa } from 'src/app/interfaces/detalle-casilla.interface';

export interface IconoOrigen {
  // Glifo de Font Awesome 4.7 (`fa-print`) o, si no hay equivalente, una imagen.
  glifo?: string;
  imagen?: string;
}

export interface OpcionOrigen {
  clave: OrigenActa;
  etiqueta: string;
  iconos: IconoOrigen[];
}

const DOCUMENTO: IconoOrigen = { glifo: 'fa-file-o' };

// Iconografía de PREP Coahuila 2026: un documento acompañado del medio por el que llegó la imagen.
export const OPCIONES_ORIGEN: OpcionOrigen[] = [
  { clave: 'proceso', etiqueta: 'Acta en proceso', iconos: [DOCUMENTO, { glifo: 'fa-hourglass-o' }] },
  { clave: 'escaner', etiqueta: 'Escáner', iconos: [DOCUMENTO, { glifo: 'fa-print' }] },
  { clave: 'movil', etiqueta: 'Móvil', iconos: [DOCUMENTO, { glifo: 'fa-mobile' }] },
  { clave: 'urna', etiqueta: 'Urna Electrónica', iconos: [{ imagen: './assets/img/iconos-acta/urna-electronica.png' }] },
  { clave: 'movil-catd', etiqueta: 'Móvil CATD', iconos: [DOCUMENTO, { glifo: 'fa-building-o' }, { glifo: 'fa-mobile' }] },
];

@Component({
  standalone: false,
  selector: 'app-informacion-acta',
  templateUrl: './informacion-acta.component.html',
  styleUrls: ['./informacion-acta.component.css']
})
export class InformacionActaComponent implements OnInit {

  public contabilizada: boolean | null = null;
  public urlActa: string | null = null;
  public origen: OpcionOrigen | null = null;

  public readonly enProceso = OPCIONES_ORIGEN[0];
  public readonly procedencias = OPCIONES_ORIGEN.slice(1);

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  get iconosVer(): IconoOrigen[] {
    return this.origen?.iconos ?? [DOCUMENTO];
  }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion, casilla] = this.router.url.split('/');

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, casilla)
      .subscribe(({ itemRecords }) => {
        const acta = itemRecords.data.find(({ tipo_casilla }) => tipo_casilla === casilla);
        this.contabilizada = acta ? acta.contabilizar === 'T' : null;
        this.urlActa = acta?.url_acta ?? null;
        this.origen = OPCIONES_ORIGEN.find(({ clave }) => clave === acta?.origen_acta) ?? null;
      });
  }

}
