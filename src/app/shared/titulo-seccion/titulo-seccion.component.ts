import { Component, Input } from '@angular/core';

const CLASES_TAMANO = {
  seccion: ['subtitulo-seccion'],
  tarjeta: ['text-left', 'px26'],
  entidad: ['subtitulo-seccion', 'titulo-entidad'],
} as const;

const CLASES_COLOR = {
  principal: [],
  aqua: ['pleca-aqua'],
  morada: ['pleca-morada'],
} as const;

/**
 * Título de sección con la pleca lateral. El texto proyectado va en negritas; lo marcado con
 * `complemento` (p. ej. el estado del acta) va después, sin negritas.
 */
@Component({
  standalone: false,
  selector: 'app-titulo-seccion',
  template: `
    <h4 class="pleca-izquierda" [ngClass]="clases">
        <strong><ng-content></ng-content></strong>
        <ng-content select="[complemento]"></ng-content>
    </h4>
  `,
  styles: [`
    :host { display: block; }
    .subtitulo-seccion.pleca-izquierda.titulo-entidad { font-size: 30px; }
  `]
})
export class TituloSeccionComponent {

  @Input() tamano: keyof typeof CLASES_TAMANO = 'seccion';
  @Input() color: keyof typeof CLASES_COLOR = 'principal';

  get clases(): string[] {
    return [...CLASES_TAMANO[this.tamano], ...CLASES_COLOR[this.color]];
  }

}
