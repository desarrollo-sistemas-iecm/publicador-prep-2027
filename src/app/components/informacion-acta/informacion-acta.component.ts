import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { ICONO_DOCUMENTO, IconoOrigen, OpcionOrigen, opcionOrigen } from 'src/app/services/origen-acta';

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

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  get iconosVer(): IconoOrigen[] {
    return this.origen?.iconos ?? [ICONO_DOCUMENTO];
  }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion, casilla] = this.router.url.split('/');

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, casilla)
      .subscribe(({ itemRecords }) => {
        const acta = itemRecords.data.find(({ tipo_casilla }) => tipo_casilla === casilla);
        this.contabilizada = acta ? acta.contabilizar === 'T' : null;
        this.urlActa = acta?.url_acta ?? null;
        this.origen = opcionOrigen(acta?.origen_acta);
      });
  }

}
