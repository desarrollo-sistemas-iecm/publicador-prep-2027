import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { InformacionActaComponent } from './informacion-acta.component';
import { IconosOrigenActaComponent } from '../iconos-origen-acta/iconos-origen-acta.component';
import { LeyendaOrigenActaComponent } from '../leyenda-origen-acta/leyenda-origen-acta.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DetalleCasillaResponse } from 'src/app/interfaces/detalle-casilla.interface';

const respuesta = {
  success: true,
  msg: '',
  itemRecords: {
    value_fields: [], columns: [], participacion: [], resumen: {},
    data: [
      { tipo_casilla: 'B01', contabilizar: 'T', url_acta: 'https://actas.test/18/18-3188-B01dmr.jpg', origen_acta: 'movil' },
      { tipo_casilla: 'C01', contabilizar: 'F', url_acta: null, origen_acta: 'proceso' },
      { tipo_casilla: 'S01', contabilizar: 'T', url_acta: null, ue_qr: 'R|09|18', origen_acta: 'urna' }
    ]
  }
} as unknown as DetalleCasillaResponse;

describe('InformacionActaComponent', () => {
  let fixture: ComponentFixture<InformacionActaComponent>;

  const crear = async (casilla: string) => {
    const apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenederDetalleVotosCasilla']);
    apiPrepService.obtenederDetalleVotosCasilla.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      declarations: [InformacionActaComponent, IconosOrigenActaComponent, LeyendaOrigenActaComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url: `/diputaciones/casilla/18/3188/${casilla}` } }
      ],
      // El visor tiene su propio spec; aquí solo importa que se monte.
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionActaComponent);
    fixture.detectChanges();
  };

  const botonVer = (): HTMLButtonElement => fixture.nativeElement.querySelector('.boton-ver');

  const iconosVer = (): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.boton-ver .fa') as NodeListOf<HTMLElement>)
      .map((icono) => Array.from(icono.classList).find((clase) => clase !== 'fa')!);

  it('should open the acta viewer when Ver is clicked and the acta has an image', async () => {
    await crear('B01');

    botonVer().click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-visor-acta')).not.toBeNull();
  });

  it('should show the origin icons of the acta inside Ver', async () => {
    await crear('B01');

    expect(iconosVer()).toEqual(['fa-file-o', 'fa-mobile']);
  });

  it('should disable Ver when the acta has no image nor electronic ballot box data', async () => {
    await crear('C01');

    expect(botonVer().disabled).toBeTrue();
  });

  it('should enable Ver for an electronic ballot box acta even without image', async () => {
    await crear('S01');

    expect(botonVer().disabled).toBeFalse();
  });

  it('should list every image origin in the legend', async () => {
    await crear('B01');

    const etiquetas = Array.from(fixture.nativeElement.querySelectorAll('.opcion-origen') as NodeListOf<HTMLElement>)
      .map((opcion) => opcion.textContent!.trim());

    expect(etiquetas).toEqual(['Acta en proceso', 'Escáner', 'Móvil', 'Urna Electrónica', 'Móvil CATD']);
  });
});
