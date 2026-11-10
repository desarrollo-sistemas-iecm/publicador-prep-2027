import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';

describe('BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const crear = async (configuracion: Partial<BreadcrumbsConfig>) => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    fixture.componentInstance.configuracionBreadcrumbs = {
      tipo_eleccion: 'diputaciones', votos_por: 'casilla', alcaldia: 0, nombre_alcaldia: null,
      distrito: 18, seccion: 3188, casilla: '', ...configuracion
    } as BreadcrumbsConfig;
    fixture.detectChanges();
  };

  const ruta = (): string => fixture.nativeElement.querySelector('h4').textContent.replace(/\s+/g, ' ').trim();
  const enlaces = (): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('h4 a') as NodeListOf<HTMLElement>).map((enlace) => enlace.textContent!.trim());
  const introduccion = (): string => fixture.nativeElement.querySelector('.texto p').textContent.trim();

  it('should end the path with the readable casilla type when a casilla is selected', async () => {
    await crear({ casilla: 'C01' });

    expect(ruta()).toBe('Ciudad de México / Distrito 18 / Sección 3188 / Contigua 1');
  });

  it('should keep the separators outside the links so each level is a separate link', async () => {
    await crear({ casilla: 'C01' });

    expect(enlaces()).toEqual(['Ciudad de México', 'Distrito 18', 'Sección 3188']);
  });

  it('should describe a single acta without percentages when a casilla is selected', async () => {
    await crear({ casilla: 'C01' });

    expect(introduccion()).toBe('El total de votos calculado que se muestra, se refiere a los votos asentados en el Acta PREP hasta el momento.');
  });

  it('should keep the aggregated text when no casilla is selected', async () => {
    await crear({ votos_por: 'casillas' });

    expect(introduccion()).toContain('Por presentación, los decimales de los porcentajes muestran sólo cuatro dígitos.');
  });
});
