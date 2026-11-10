import { Component } from '@angular/core';
import { OPCIONES_ORIGEN } from 'src/app/services/origen-acta';

/** Leyenda "Imagen procedente de", como en PREP Coahuila 2026. */
@Component({
  standalone: false,
  selector: 'app-leyenda-origen-acta',
  template: `
    <p class="px14 mb-1">Imagen procedente de:</p>
    <div class="leyenda-origen">
      <span class="opcion-origen en-proceso">
        <app-iconos-origen-acta class="iconos-origen" [iconos]="enProceso.iconos"></app-iconos-origen-acta>
        {{ enProceso.etiqueta }}
      </span>
      <span class="separador-origen" aria-hidden="true"></span>
      <span class="opcion-origen" *ngFor="let opcion of procedencias">
        <app-iconos-origen-acta class="iconos-origen" [iconos]="opcion.iconos"></app-iconos-origen-acta>
        {{ opcion.etiqueta }}
      </span>
    </div>
  `,
  styles: [
    `
    .leyenda-origen {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 18px;
      color: var(--prep-texto-secundario);
    }
    .opcion-origen {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .opcion-origen .iconos-origen {
      color: var(--prep-morado);
    }
    .opcion-origen.en-proceso .iconos-origen {
      color: var(--prep-texto-secundario);
      opacity: 0.7;
    }
    .separador-origen {
      align-self: stretch;
      width: 2px;
      background: var(--prep-texto-secundario);
      opacity: 0.6;
    }
    `
  ]
})
export class LeyendaOrigenActaComponent {

  public readonly enProceso = OPCIONES_ORIGEN[0];
  public readonly procedencias = OPCIONES_ORIGEN.slice(1);

}
