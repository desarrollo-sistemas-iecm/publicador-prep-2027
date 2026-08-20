import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const CLAVE_ESCALA_FUENTE = 'prep_accesibilidad_escala_fuente';
const CLAVE_MODO_OSCURO = 'prep_accesibilidad_modo_oscuro';

export const ESCALA_FUENTE_MINIMA = 100;
export const ESCALA_FUENTE_MAXIMA = 150;
export const ESCALA_FUENTE_PASO = 10;

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadService {

  private readonly escalaFuenteSubject = new BehaviorSubject<number>(ESCALA_FUENTE_MINIMA);
  private readonly modoOscuroSubject = new BehaviorSubject<boolean>(false);

  public readonly escalaFuente$: Observable<number> = this.escalaFuenteSubject.asObservable();
  public readonly modoOscuro$: Observable<boolean> = this.modoOscuroSubject.asObservable();

  public inicializar(): void {
    const escalaGuardada = Number(localStorage.getItem(CLAVE_ESCALA_FUENTE));
    const escalaInicial = this.normalizarEscala(escalaGuardada || ESCALA_FUENTE_MINIMA);
    this.establecerEscalaFuente(escalaInicial);

    const modoOscuroGuardado = localStorage.getItem(CLAVE_MODO_OSCURO) === 'true';
    this.establecerModoOscuro(modoOscuroGuardado);
  }

  public establecerEscalaFuente(valor: number): void {
    const escala = this.normalizarEscala(valor);
    document.documentElement.style.setProperty('--prep-zoom', String(escala / 100));
    document.documentElement.setAttribute('data-escala-fuente', String(escala));
    localStorage.setItem(CLAVE_ESCALA_FUENTE, String(escala));
    this.escalaFuenteSubject.next(escala);
  }

  public establecerModoOscuro(activo: boolean): void {
    document.documentElement.setAttribute('data-tema', activo ? 'oscuro' : 'claro');
    localStorage.setItem(CLAVE_MODO_OSCURO, String(activo));
    this.modoOscuroSubject.next(activo);
  }

  public alternarModoOscuro(): void {
    this.establecerModoOscuro(!this.modoOscuroSubject.value);
  }

  private normalizarEscala(valor: number): number {
    if (Number.isNaN(valor)) {
      return ESCALA_FUENTE_MINIMA;
    }
    const acotada = Math.min(Math.max(valor, ESCALA_FUENTE_MINIMA), ESCALA_FUENTE_MAXIMA);
    return Math.round(acotada / ESCALA_FUENTE_PASO) * ESCALA_FUENTE_PASO;
  }
}
