import { Component, HostListener } from '@angular/core';

const UMBRAL_SCROLL_PX = 220;

@Component({
  standalone: false,
  selector: 'app-avance-entidad-fijo',
  templateUrl: './avance-entidad-fijo.component.html',
  styles: [
  ]
})
export class AvanceEntidadFijoComponent {

  public mostrar: boolean = false;

  constructor() {
    this.actualizarVisibilidad();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.actualizarVisibilidad();
  }

  private actualizarVisibilidad(): void {
    this.mostrar = window.scrollY > UMBRAL_SCROLL_PX;
  }
}
