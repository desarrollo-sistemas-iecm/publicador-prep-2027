import { Component, Input } from '@angular/core';
import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';
import { ResourceState } from 'src/app/interfaces/resource-state.interface';

/**
 * Tabla de actas por partido (Acta digitalizada, Sección, Casilla, votos por partido,
 * No reg., Nulos, Total, Observación), reutilizada por Representación Proporcional
 * (screenRP.html) y Voto en el Extranjero (screenextranjero.html) en static-site,
 * donde ambas páginas comparten exactamente la misma estructura y datos de ejemplo.
 */
@Component({
  standalone: false,
  selector: 'app-tabla-actas',
  templateUrl: './tabla-actas.component.html',
  styleUrls: ['./tabla-actas.component.css']
})
export class TablaActasComponent {
  @Input() titulo = 'Actas';
  @Input() estado: ResourceState<DistribucionRp> = { status: 'loading' };
}
