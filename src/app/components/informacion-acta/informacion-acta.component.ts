import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { Column, Datum } from 'src/app/interfaces/detalle-casilla.interface';
import { ICONO_DOCUMENTO, IconoOrigen, OpcionOrigen, opcionOrigen } from 'src/app/services/origen-acta';
import { actaVisible } from 'src/app/services/acta-visible';
import { EstadoActa, estadoActa } from 'src/app/services/estado-acta';

@Component({
  standalone: false,
  selector: 'app-informacion-acta',
  templateUrl: './informacion-acta.component.html',
  styleUrls: ['./informacion-acta.component.css']
})
export class InformacionActaComponent implements OnInit {

  public acta: Datum | null = null;
  public columnas: Column[] = [];
  public tipoEleccion = '';
  public estado: EstadoActa | null = null;
  public origen: OpcionOrigen | null = null;
  public visorAbierto = false;

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  get iconosVer(): IconoOrigen[] {
    return this.origen?.iconos ?? [ICONO_DOCUMENTO];
  }

  get puedeVerActa(): boolean {
    return actaVisible(this.acta);
  }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion, casilla] = this.router.url.split('/');
    this.tipoEleccion = tipoConsulta;

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, casilla)
      .subscribe(({ itemRecords: { data, columns } }) => {
        this.acta = data.find(({ tipo_casilla }) => tipo_casilla === casilla) ?? null;
        this.columnas = columns;
        this.estado = this.acta ? estadoActa(this.acta) : null;
        this.origen = opcionOrigen(this.acta?.origen_acta);
      });
  }

}
