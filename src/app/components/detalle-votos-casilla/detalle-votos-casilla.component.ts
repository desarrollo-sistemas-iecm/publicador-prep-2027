import { Component, OnInit } from '@angular/core';
import { ApiPrepService } from '../../services/api-prep.service';
import { Router } from '@angular/router';
import { Column, Datum } from 'src/app/interfaces/detalle-casilla.interface';
import { ICONO_DOCUMENTO, IconoOrigen, opcionOrigen } from 'src/app/services/origen-acta';
import { actaVisible } from 'src/app/services/acta-visible';

const TIPOS_CONSULTA = ['jefatura-de-gobierno', 'diputaciones', 'alcaldias'];

@Component({
  standalone: false,
  selector: 'app-detalle-votos-casilla',
  templateUrl: './detalle-votos-casilla.component.html',
  styles: [
    `
     .acta-digitalizada .grupo, .tabla-seccion .acta-digitalizada .grupo {
    color: #6f65a3;
}
    .boton-acta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border: none;
    border-radius: 4px;
    background: var(--prep-morado-claro);
    color: #212529;
    white-space: nowrap;
}
    .acta-no-disponible {
    color: var(--prep-texto-secundario);
    opacity: .7;
}
    `
  ]
})
export class DetalleVotosCasillaComponent implements OnInit {

  public columnasVotos: Column[] = [];
  public filas: Datum[] = [];
  public cargando = true;
  public tipoEleccion = '';
  public actaEnVisor: Datum | null = null;

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  puedeVerActa(fila: Datum): boolean {
    return actaVisible(fila);
  }

  iconosActa({ origen_acta }: Datum): IconoOrigen[] {
    return opcionOrigen(origen_acta)?.iconos ?? [ICONO_DOCUMENTO];
  }

  etiquetaOrigen({ origen_acta }: Datum): string {
    return opcionOrigen(origen_acta)?.etiqueta ?? '';
  }

  ngOnInit(): void {
    this.cargarInfo();
  }

  esContabilizada({ contabilizar }: Datum): boolean {
    return contabilizar === 'T';
  }

  votos(fila: Datum, { dataIndex }: Column): number | null {
    const valor = (fila as unknown as Record<string, number | null>)[dataIndex];
    return valor ?? null;
  }

  observaciones({ observaciones }: Datum): string {
    return observaciones && observaciones !== '--' ? observaciones : '';
  }

  private cargarInfo(): void {
    const [, tipoConsulta, , distOAlcaldia, seccion] = this.router.url.split('/');

    if (!TIPOS_CONSULTA.includes(tipoConsulta)) {
      this.cargando = false;
      return;
    }
    this.tipoEleccion = tipoConsulta;

    this.apiPrepService.obtenederDetalleVotosCasilla(tipoConsulta, distOAlcaldia, seccion, null)
      .subscribe({
        next: ({ itemRecords: { columns, data } }) => {
          this.columnasVotos = columns.filter(({ dataIndex }) => this.esColumnaVotos(dataIndex));
          this.filas = data;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
  }

  private esColumnaVotos(dataIndex: string): boolean {
    return dataIndex.startsWith('votos_part_') || dataIndex.startsWith('total_votos_cc');
  }

}
