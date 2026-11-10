import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { DetalleVotosCasillaComponent } from './detalle-votos-casilla.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IconosOrigenActaComponent } from '../iconos-origen-acta/iconos-origen-acta.component';
import { DetalleCasillaResponse } from 'src/app/interfaces/detalle-casilla.interface';

const columna = (dataIndex: string, title: string) => ({
  dataIndex, title, key: dataIndex, resizable: 'resizable', width: 100, minWidth: 80, maxWidth: 160
});

const respuesta = {
  success: true,
  msg: '',
  itemRecords: {
    value_fields: [],
    columns: [columna('id_seccion', 'Sección'), columna('tipo_casilla', 'Casilla'), columna('votos_part_6', 'MC'), columna('total_votos_cc1', 'PAN-PRI-PRD')],
    data: [
      { id_seccion: 3188, tipo_casilla: 'B01', votos_part_6: 42, total_votos_cc1: 142, votos_cand_no_reg: 34, votos_nulos: 45, votacion_total: 303, contabilizar: 'T', observaciones: '--', url_acta: 'https://actas.test/18/18-3188-B01dmr.jpg', origen_acta: 'movil' },
      { id_seccion: 3188, tipo_casilla: 'C01', votos_part_6: 24, total_votos_cc1: 161, votos_cand_no_reg: 31, votos_nulos: 32, votacion_total: 257, contabilizar: 'F', observaciones: 'SIN ACTA', url_acta: null, origen_acta: 'proceso' }
    ],
    participacion: [],
    resumen: {}
  }
} as unknown as DetalleCasillaResponse;

describe('DetalleVotosCasillaComponent', () => {
  let fixture: ComponentFixture<DetalleVotosCasillaComponent>;
  let apiPrepService: jasmine.SpyObj<ApiPrepService>;

  const crear = async (url: string) => {
    apiPrepService = jasmine.createSpyObj('ApiPrepService', ['obtenederDetalleVotosCasilla']);
    apiPrepService.obtenederDetalleVotosCasilla.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      imports: [PipesModule],
      declarations: [DetalleVotosCasillaComponent, IconosOrigenActaComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url } }
      ],
      // La leyenda y el visor tienen su propio spec.
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVotosCasillaComponent);
    fixture.detectChanges();
  };

  const filas = (): string[][] =>
    Array.from(fixture.nativeElement.querySelectorAll('tbody tr') as NodeListOf<HTMLElement>)
      .map((fila) => Array.from(fila.querySelectorAll('td')).map((celda) => celda.textContent!.trim()));

  it('should request every casilla of the district when the url has no seccion', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    expect(apiPrepService.obtenederDetalleVotosCasilla).toHaveBeenCalledWith('diputaciones', '18', undefined, null);
  });

  it('should request a single seccion when the url includes it', async () => {
    await crear('/diputaciones/casillas/18/3188');

    expect(apiPrepService.obtenederDetalleVotosCasilla).toHaveBeenCalledWith('diputaciones', '18', '3188', null);
  });

  it('should render one header per body cell', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    const encabezados = fixture.nativeElement.querySelectorAll('thead th').length;

    expect(filas().every((celdas) => celdas.length === encabezados)).toBeTrue();
  });

  it('should render seccion, casilla, acta, votes, totals and observaciones in order', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    expect(filas()).toEqual([
      ['', '3188', 'B01', 'Acta', '42', '142', '34', '45', '303', ''],
      ['', '3188', 'C01', '', '24', '161', '31', '32', '257', 'SIN ACTA']
    ]);
  });

  it('should open the acta viewer for the row whose acta button is clicked', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    fixture.nativeElement.querySelector('.boton-acta').click();
    fixture.detectChanges();

    expect(String(fixture.componentInstance.actaEnVisor?.tipo_casilla)).toBe('B01');
    expect(fixture.nativeElement.querySelector('app-visor-acta')).not.toBeNull();
  });

  it('should show the origin icons without a button when the acta cannot be viewed', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    const segundaFila = fixture.nativeElement.querySelectorAll('tbody tr')[1];
    const iconos = Array.from(segundaFila.querySelectorAll('.acta-no-disponible .fa') as NodeListOf<HTMLElement>)
      .map((icono) => Array.from(icono.classList).find((clase) => clase !== 'fa'));

    expect(segundaFila.querySelector('.boton-acta')).toBeNull();
    expect(iconos).toEqual(['fa-file-o', 'fa-hourglass-o']);
  });

  it('should mark the acta as no contabilizada when contabilizar is not T', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    const estados = Array.from(fixture.nativeElement.querySelectorAll('tbody tr td:first-child i') as NodeListOf<HTMLElement>)
      .map((icono) => icono.classList.contains('text-success'));

    expect(estados).toEqual([true, false]);
  });
});
