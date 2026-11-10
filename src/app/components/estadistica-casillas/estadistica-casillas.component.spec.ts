import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { EstadisticaCasillasComponent } from './estadistica-casillas.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DetalleCasillaResponse } from 'src/app/interfaces/detalle-casilla.interface';
import { TituloSeccionComponent } from 'src/app/shared/titulo-seccion/titulo-seccion.component';

const respuesta = {
  success: true,
  msg: '',
  itemRecords: {
    value_fields: [],
    columns: [],
    data: [],
    participacion: [
      { id_seccion: 3188, tipo_casilla: 'B01', votacion_total: 303, lista_nominal: 692, participacion: '43.7861' },
      { id_seccion: 3188, tipo_casilla: 'C01', votacion_total: 710, lista_nominal: 692, participacion: '102.6011' }
    ],
    resumen: {}
  }
} as unknown as DetalleCasillaResponse;

describe('EstadisticaCasillasComponent', () => {
  let fixture: ComponentFixture<EstadisticaCasillasComponent>;
  let apiPrepService: jasmine.SpyObj<ApiPrepService>;

  const crear = async (url: string) => {
    apiPrepService = jasmine.createSpyObj('ApiPrepService', ['obtenederDetalleVotosCasilla']);
    apiPrepService.obtenederDetalleVotosCasilla.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      declarations: [EstadisticaCasillasComponent, TituloSeccionComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticaCasillasComponent);
    fixture.detectChanges();
  };

  const texto = (selector: string): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll(selector) as NodeListOf<HTMLElement>)
      .map((elemento) => elemento.textContent!.replace(/\s+/g, ' ').trim());

  const anchos = (): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.barra-participacion-relleno') as NodeListOf<HTMLElement>)
      .map((relleno) => relleno.style.width);

  it('should show a bar for every casilla of the sección', async () => {
    await crear('/diputaciones/casillas/18/3188');

    expect(texto('h4')).toEqual(['Estadística de Casillas']);
    expect(texto('.etiqueta')).toEqual([
      '3188 Casilla Básica', 'Total Lista Nominal', '3188 Casilla Contigua 1', 'Total Lista Nominal'
    ]);
    expect(texto('.cifra')).toEqual(['43.7861%', '692', '102.6011%', '692']);
  });

  it('should only show the selected casilla when the view is a casilla', async () => {
    await crear('/diputaciones/casilla/18/3188/C01');

    expect(apiPrepService.obtenederDetalleVotosCasilla).toHaveBeenCalledWith('diputaciones', '18', '3188', null);
    expect(texto('h4')).toEqual(['Estadística de Casilla']);
    expect(texto('.etiqueta')).toEqual(['3188 Casilla Contigua 1', 'Total Lista Nominal']);
  });

  it('should fill each bar with its participación and cap it at 100% when it exceeds the lista nominal', async () => {
    await crear('/diputaciones/casillas/18/3188');

    expect(anchos()).toEqual(['43.7861%', '100%']);
  });
});
