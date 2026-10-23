import { Component, HostListener } from '@angular/core';

const UMBRAL_SCROLL_PX = 220;

// Oculto por solicitud; cambiar a true para volver a mostrar la barra fija al hacer scroll.
const AVANCE_ENTIDAD_FIJO_HABILITADO = false;

@Component({
  standalone: false,
  selector: 'app-avance-entidad-fijo',
  templateUrl: './avance-entidad-fijo.component.html',
  styles: [
  ]
})
export class AvanceEntidadFijoComponent {

  public readonly habilitado: boolean = AVANCE_ENTIDAD_FIJO_HABILITADO;
  public mostrar: boolean = false;

  constructor() {
    this.actualizarVisibilidad();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.actualizarVisibilidad();
  }

  private actualizarVisibilidad(): void {
    if (!this.habilitado) {
      return;
    }
    this.mostrar = window.scrollY > UMBRAL_SCROLL_PX;
  }
}
