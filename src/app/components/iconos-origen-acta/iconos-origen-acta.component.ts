import { Component, Input } from '@angular/core';
import { ICONO_DOCUMENTO, IconoOrigen } from 'src/app/services/origen-acta';

/** Íconos que representan el origen de la imagen de un acta (documento + medio). */
@Component({
  standalone: false,
  selector: 'app-iconos-origen-acta',
  template: `
    <ng-container *ngFor="let icono of iconos">
      <i *ngIf="icono.glifo" class="fa {{ icono.glifo }}" aria-hidden="true"></i>
      <img *ngIf="icono.imagen" class="icono-imagen" [src]="icono.imagen" alt="">
    </ng-container>
  `,
  styles: [
    `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }
    .fa {
      font-size: 1.4em;
    }
    .icono-imagen {
      height: 1.6em;
      width: auto;
    }
    `
  ]
})
export class IconosOrigenActaComponent {

  @Input() iconos: IconoOrigen[] = [ICONO_DOCUMENTO];

}
