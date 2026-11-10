import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ID_LEYENDA_OBSERVACIONES, ObservacionesCasillaComponent } from './observaciones-casilla.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DetalleCasillaResponse } from 'src/app/interfaces/detalle-casilla.interface';

const respuesta = {
  success: true,
  msg: '',
  itemRecords: {
    value_fields: [], columns: [], participacion: [], resumen: {},
    data: [
      { tipo_casilla: 'B01', observaciones: '--' },
      { tipo_casilla: 'C01', observaciones: 'ALGUN CAMPO ILEGIBLE O SIN DATOS' }
    ]
  }
} as unknown as DetalleCasillaResponse;

describe('ObservacionesCasillaComponent', () => {
  let fixture: ComponentFixture<ObservacionesCasillaComponent>;

  const crear = async (url: string) => {
    const apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenederDetalleVotosCasilla']);
    apiPrepService.obtenederDetalleVotosCasilla.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      declarations: [ObservacionesCasillaComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ObservacionesCasillaComponent);
    fixture.detectChanges();
  };

  const parrafo = (): HTMLElement | null => fixture.nativeElement.querySelector('p');

  it('should show the observación of the selected casilla', async () => {
    await crear('/diputaciones/casilla/18/3188/C01');

    expect(parrafo()?.textContent?.trim()).toBe('ALGUN CAMPO ILEGIBLE O SIN DATOS');
  });

  it('should show only the heading when the acta has no observación', async () => {
    await crear('/diputaciones/casilla/18/3188/B01');

    expect(parrafo()).toBeNull();
    expect(fixture.nativeElement.textContent.trim()).toBe('Observaciones en Acta');
  });

  it('should scroll to the observaciones legend when the heading is clicked', async () => {
    await crear('/diputaciones/casilla/18/3188/B01');
    const leyenda = document.createElement('div');
    leyenda.id = ID_LEYENDA_OBSERVACIONES;
    spyOn(leyenda, 'scrollIntoView');
    document.body.appendChild(leyenda);

    fixture.nativeElement.querySelector('button').click();

    expect(leyenda.scrollIntoView).toHaveBeenCalled();
    leyenda.remove();
  });
});
