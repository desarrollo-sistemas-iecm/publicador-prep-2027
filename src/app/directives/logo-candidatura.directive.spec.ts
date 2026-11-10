import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from './directives.module';
import { LOGO_CANDIDATURA_SIN_PARTIDO, rutaLogoCandidatura } from './logo-candidatura.directive';

@Component({
  standalone: false,
  template: '<img [appLogoCandidatura]="siglas" alt="">'
})
class AnfitrionComponent {
  siglas: string | null = 'PAN-PRI-PRD';
}

describe('LogoCandidaturaDirective', () => {
  let fixture: ComponentFixture<AnfitrionComponent>;
  const imagen = (): HTMLImageElement => fixture.nativeElement.querySelector('img');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivesModule],
      declarations: [AnfitrionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnfitrionComponent);
    fixture.detectChanges();
  });

  it('should build the logo path replacing every dash of the siglas', () => {
    expect(rutaLogoCandidatura('PVEM-PT-MORENA')).toBe('./assets/img/unknow/PVEM_PT_MORENA.png');
    expect(imagen().getAttribute('src')).toBe('./assets/img/unknow/PAN_PRI_PRD.png');
  });

  it('should keep coalitions outside the old fixed party list', () => {
    fixture.componentInstance.siglas = 'PT-MORENA';
    fixture.detectChanges();

    expect(imagen().getAttribute('src')).toBe('./assets/img/unknow/PT_MORENA.png');
  });

  it('should use the candidatura sin partido logo when there are no siglas', () => {
    fixture.componentInstance.siglas = null;
    fixture.detectChanges();

    expect(imagen().getAttribute('src')).toBe(LOGO_CANDIDATURA_SIN_PARTIDO);
  });

  it('should fall back to the candidatura sin partido logo when the image fails', () => {
    imagen().dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(imagen().getAttribute('src')).toBe(LOGO_CANDIDATURA_SIN_PARTIDO);
  });
});
