import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ResumenVotacionComponent } from './resumen-votacion.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { ResResumenVotacion } from 'src/app/interfaces/resumen-votaction.interface';

const respuesta = {
  resumen_votacion: {
    votos_acumulados: 194, votos_acumulados_por: '75.49%',
    candidatos_no_reg: 31, candidatos_no_reg_por: '12.06%',
    nulos: 32, nulos_por: '12.45%',
    total: 1257, total_por: '100.00%'
  }
} as unknown as ResResumenVotacion;

describe('ResumenVotacionComponent', () => {
  let fixture: ComponentFixture<ResumenVotacionComponent>;

  const crear = async (url: string) => {
    const apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenerResumenVotacion']);
    apiPrepService.obtenerResumenVotacion.and.returnValue(of(respuesta));

    await TestBed.configureTestingModule({
      declarations: [ResumenVotacionComponent],
      providers: [
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: Router, useValue: { url } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenVotacionComponent);
    fixture.detectChanges();
  };

  it('should show the loaded total in the mobile layout', async () => {
    await crear('/diputaciones/casillas/18/3188');

    const totalMovil = fixture.nativeElement.querySelector('.d-lg-none .total').textContent.replace(/\s+/g, ' ').trim();

    expect(totalMovil).toBe('= 1,257');
  });

  it('should show the percentages when the view aggregates several actas', async () => {
    await crear('/diputaciones/casillas/18/3188');

    expect(fixture.nativeElement.textContent).toContain('75.49%');
  });

  it('should hide every percentage when the view is a single casilla', async () => {
    await crear('/diputaciones/casilla/18/3188/C01');

    expect(fixture.nativeElement.textContent).not.toContain('%');
    expect(fixture.nativeElement.textContent).toContain('194');
  });
});
