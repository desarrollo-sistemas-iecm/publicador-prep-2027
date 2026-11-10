import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { MovingCardsComponent } from './moving-cards.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ResGrafica } from 'src/app/interfaces/grafica.interface';

const respuesta = {
  success: true,
  resumen: {},
  agrupado: [
    { siglas: 'MC', descripcion: 'Movimiento Ciudadano', total_votos: 66, porcentaje: 11.79, ganador: false },
    { siglas: 'PAN-PRI-PRD', descripcion: 'Coalición PAN-PRI-PRD', total_votos: 303, porcentaje: 54.11, ganador: true },
    { siglas: 'votos_nulos', descripcion: 'Votos nulos', total_votos: 77, porcentaje: 13.75, ganador: false }
  ]
} as unknown as ResGrafica;

describe('MovingCardsComponent', () => {
  let fixture: ComponentFixture<MovingCardsComponent>;

  const crear = async (url: string) => {
    const apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenerGraficaJG']);
    apiPrepService.obtenerGraficaJG.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      imports: [DirectivesModule],
      declarations: [MovingCardsComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovingCardsComponent);
    fixture.detectChanges();
  };

  const pies = (): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.tarjeta-partido .pie-tarjeta') as NodeListOf<HTMLElement>)
      .map((pie) => Array.from(pie.querySelectorAll('p')).map((parrafo) => parrafo.textContent!.trim()).join(' '));

  it('should render party cards with votes and percentage when the view is the sección', async () => {
    await crear('/diputaciones/casillas/18/3188');

    expect(pies()).toEqual(['Votos 66 Porcentaje 11.7900%', 'Votos 303 Porcentaje 54.1100%']);
    expect(fixture.nativeElement.querySelector('.columna-fija')).toBeNull();
  });

  it('should render party cards when the view is the district detalle por casilla', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    expect(pies().length).toBe(2);
  });

  it('should render only the votes when the view is a single casilla', async () => {
    await crear('/diputaciones/casilla/18/3188/B01');

    expect(pies()).toEqual(['Votos 66', 'Votos 303']);
  });

  it('should keep the candidatura cards with the label column when the view is votos por candidatura', async () => {
    await crear('/diputaciones/votos-por-candidatura/18');

    expect(fixture.nativeElement.querySelector('.tarjeta-partido')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.tarjeta .nombre').length).toBe(2);
  });
});
