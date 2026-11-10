import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ListadoParticipacionCiudadanaLNComponent } from './listado-participacion-ciudadana-ln.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DetalleCasillaResponse } from 'src/app/interfaces/detalle-casilla.interface';

const respuesta = (participacion: object[]) => ({
  success: true,
  msg: '',
  itemRecords: { value_fields: [], columns: [], data: [], participacion, resumen: {} }
}) as unknown as DetalleCasillaResponse;

describe('ListadoParticipacionCiudadanaLNComponent', () => {
  let fixture: ComponentFixture<ListadoParticipacionCiudadanaLNComponent>;
  let apiPrepService: jasmine.SpyObj<ApiPrepService>;

  const crear = async (participacion: object[]) => {
    apiPrepService = jasmine.createSpyObj('ApiPrepService', ['obtenederDetalleVotosCasilla']);
    apiPrepService.obtenederDetalleVotosCasilla.and.returnValue(of(respuesta(participacion)));

    await TestBed.configureTestingModule({
      declarations: [ListadoParticipacionCiudadanaLNComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url: '/diputaciones/detalle-por-casilla/18' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoParticipacionCiudadanaLNComponent);
    fixture.detectChanges();
  };

  const filas = (): string[][] =>
    Array.from(fixture.nativeElement.querySelectorAll('.filas') as NodeListOf<HTMLElement>)
      .map((fila) => Array.from(fila.querySelectorAll('.col-3')).map((celda) => celda.textContent!.trim()));

  it('should request every casilla of the district from the url', async () => {
    await crear([]);

    expect(apiPrepService.obtenederDetalleVotosCasilla).toHaveBeenCalledWith('diputaciones', '18', undefined, null);
  });

  it('should render one row per casilla with its readable name, votes, lista nominal and participación', async () => {
    await crear([
      { id_seccion: 3188, tipo_casilla: 'B01', votacion_total: 303, lista_nominal: 692, participacion: '43.7861' },
      { id_seccion: 3188, tipo_casilla: 'C01', votacion_total: 1257, lista_nominal: 1692, participacion: '74.2907' }
    ]);

    expect(filas()).toEqual([
      ['3188 Básica', '303', '692', '43.7861%'],
      ['3188 Contigua 1', '1,257', '1,692', '74.2907%']
    ]);
  });

  it('should show an empty message when there are no actas', async () => {
    await crear([]);

    expect(filas()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('No hay actas registradas para esta consulta.');
  });
});
