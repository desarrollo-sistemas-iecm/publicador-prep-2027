import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TituloSeccionComponent } from './titulo-seccion.component';

@Component({
  standalone: false,
  template: `
    <app-titulo-seccion [tamano]="tamano" [color]="color" [clasesTitulo]="clasesTitulo">
      Información del Acta
      <span complemento class="estado" *ngIf="mostrarEstado">- Contabilizada</span>
    </app-titulo-seccion>
  `
})
class AnfitrionComponent {
  tamano: TituloSeccionComponent['tamano'] = 'seccion';
  color: TituloSeccionComponent['color'] = 'principal';
  clasesTitulo = '';
  mostrarEstado = true;
}

describe('TituloSeccionComponent', () => {
  let fixture: ComponentFixture<AnfitrionComponent>;
  const titulo = (): HTMLElement => fixture.nativeElement.querySelector('h4');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TituloSeccionComponent, AnfitrionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnfitrionComponent);
    fixture.detectChanges();
  });

  it('should render a section title with the main pleca and the text in bold', () => {
    expect(Array.from(titulo().classList)).toEqual(['pleca-izquierda', 'subtitulo-seccion']);
    expect(titulo().querySelector('strong')!.textContent!.trim()).toBe('Información del Acta');
  });

  it('should place the complement after the bold text', () => {
    expect(titulo().querySelector('strong .estado')).toBeNull();
    expect(titulo().lastElementChild!.classList).toContain('estado');
  });

  it('should hide the complement when its condition is false', () => {
    fixture.componentInstance.mostrarEstado = false;
    fixture.detectChanges();

    expect(titulo().querySelector('.estado')).toBeNull();
  });

  it('should add the extra classes to the title itself', () => {
    fixture.componentInstance.clasesTitulo = 'px-3';
    fixture.detectChanges();

    expect(titulo().classList).toContain('px-3');
  });

  it('should apply the size and pleca color variants', () => {
    fixture.componentInstance.tamano = 'tarjeta';
    fixture.componentInstance.color = 'aqua';
    fixture.detectChanges();

    expect(Array.from(titulo().classList)).toEqual(['pleca-izquierda', 'text-left', 'px26', 'pleca-aqua']);
  });
});
