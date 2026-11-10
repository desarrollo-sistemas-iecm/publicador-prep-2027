import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { InformacionActaComponent } from './informacion-acta.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DetalleCasillaResponse } from 'src/app/interfaces/detalle-casilla.interface';

const respuesta = {
  success: true,
  msg: '',
  itemRecords: {
    value_fields: [], columns: [], participacion: [], resumen: {},
    data: [
      { tipo_casilla: 'B01', contabilizar: 'T', url_acta: 'https://actas.test/18/18-3188-B01dmr.jpg', origen_acta: 'movil' },
      { tipo_casilla: 'C01', contabilizar: 'F', url_acta: null, origen_acta: 'proceso' }
    ]
  }
} as unknown as DetalleCasillaResponse;

describe('InformacionActaComponent', () => {
  let fixture: ComponentFixture<InformacionActaComponent>;

  const crear = async (casilla: string) => {
    const apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenederDetalleVotosCasilla']);
    apiPrepService.obtenederDetalleVotosCasilla.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      declarations: [InformacionActaComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url: `/diputaciones/casilla/18/3188/${casilla}` } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformacionActaComponent);
    fixture.detectChanges();
  };

  const iconosVer = (): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.boton-ver .fa') as NodeListOf<HTMLElement>)
      .map((icono) => Array.from(icono.classList).find((clase) => clase !== 'fa')!);

  it('should link Ver to the acta image when the backend sends its url', async () => {
    await crear('B01');

    const enlace: HTMLAnchorElement = fixture.nativeElement.querySelector('a.boton-ver');

    expect(enlace.href).toBe('https://actas.test/18/18-3188-B01dmr.jpg');
    expect(enlace.target).toBe('_blank');
  });

  it('should show the origin icons of the acta inside Ver', async () => {
    await crear('B01');

    expect(iconosVer()).toEqual(['fa-file-o', 'fa-mobile']);
  });

  it('should disable Ver when the acta has no image url', async () => {
    await crear('C01');

    expect(fixture.nativeElement.querySelector('a.boton-ver')).toBeNull();
    expect(fixture.nativeElement.querySelector('button.boton-ver').disabled).toBeTrue();
  });

  it('should list every image origin in the legend', async () => {
    await crear('B01');

    const etiquetas = Array.from(fixture.nativeElement.querySelectorAll('.opcion-origen') as NodeListOf<HTMLElement>)
      .map((opcion) => opcion.textContent!.trim());

    expect(etiquetas).toEqual(['Acta en proceso', 'Escáner', 'Móvil', 'Urna Electrónica', 'Móvil CATD']);
  });
});
