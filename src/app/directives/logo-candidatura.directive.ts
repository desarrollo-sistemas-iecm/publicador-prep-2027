import { Directive, HostBinding, HostListener, Input } from '@angular/core';

const RUTA_LOGOS = './assets/img/unknow';
export const LOGO_CANDIDATURA_SIN_PARTIDO = `${RUTA_LOGOS}/CI.png`;

export const rutaLogoCandidatura = (siglas: string): string => `${RUTA_LOGOS}/${siglas.replaceAll('-', '_')}.png`;

/**
 * Pone en un `<img>` el logo de la candidatura a partir de sus siglas (`PAN-PRI-PRD` → `PAN_PRI_PRD.png`).
 * Si no hay logo para esas siglas, muestra el de candidatura sin partido.
 */
@Directive({
  standalone: false,
  selector: 'img[appLogoCandidatura]'
})
export class LogoCandidaturaDirective {

  @HostBinding('src') src = LOGO_CANDIDATURA_SIN_PARTIDO;

  @Input({ required: true }) set appLogoCandidatura(siglas: string | null | undefined) {
    this.src = siglas ? rutaLogoCandidatura(siglas) : LOGO_CANDIDATURA_SIN_PARTIDO;
  }

  @HostListener('error')
  alFallarCarga(): void {
    this.src = LOGO_CANDIDATURA_SIN_PARTIDO;
  }

}
