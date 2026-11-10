import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { PlantillaNivelComponent } from './plantilla-nivel.component';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { BreadcrumbsConfig } from 'src/app/interfaces/breadcrumbs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  standalone: false,
  template: `
    <app-plantilla-nivel [esperarAvanceEntidad]="false">
      <p class="contenido-tarjeta">Tarjeta</p>
      <p class="despues-tarjeta" despuesDeTarjeta>Después</p>
      <ng-container ngProjectAs="[secciones]">
        <section class="seccion" *ngIf="mostrarSeccion">Sección</section>
      </ng-container>
    </app-plantilla-nivel>
  `
})
class PantallaComponent {
  mostrarSeccion = true;
}

describe('PlantillaNivelComponent', () => {
  let fixture: ComponentFixture<PlantillaNivelComponent>;
  let router: { url: string; navigateByUrl: jasmine.Spy };
  let apiPrepService: jasmine.SpyObj<ApiPrepService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  const sidebar = () => fixture.debugElement.query(By.css('app-sidebar'));

  const crear = async (url: string, esperarAvanceEntidad = true) => {
    router = { url, navigateByUrl: jasmine.createSpy('navigateByUrl') };
    apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenerAvanceEntidad']);
    apiPrepService.obtenerAvanceEntidad.and.returnValue(of({}) as ReturnType<ApiPrepService['obtenerAvanceEntidad']>);
    spinnerService = jasmine.createSpyObj<SpinnerService>('SpinnerService', ['showLoaderUntilCompleted']);
    spinnerService.showLoaderUntilCompleted.and.callFake((observable$) => observable$);

    await TestBed.configureTestingModule({
      declarations: [PlantillaNivelComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ApiPrepService, useValue: apiPrepService },
        { provide: SpinnerService, useValue: spinnerService },
        { provide: BreadcrumbsService, useValue: { construirTitulo: () => 'PREP - Diputaciones - Distrito 18' } }
      ],
      // Encabezado, sidebar y demás piezas tienen sus propios specs; aquí solo importa cómo se conectan.
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantillaNivelComponent);
    fixture.componentInstance.esperarAvanceEntidad = esperarAvanceEntidad;
    fixture.detectChanges();
  };

  it('should show the spinner until the entity progress loads', async () => {
    await crear('/diputaciones/votos-por-candidatura/18');

    expect(spinnerService.showLoaderUntilCompleted).toHaveBeenCalled();
    expect(apiPrepService.obtenerAvanceEntidad).toHaveBeenCalled();
  });

  it('should not wait for the entity progress when the view asks not to', async () => {
    await crear('/diputaciones/votos-por-candidatura', false);

    expect(apiPrepService.obtenerAvanceEntidad).not.toHaveBeenCalled();
  });

  it('should keep the current view when the district changes', async () => {
    await crear('/diputaciones/detalle-por-casilla/18');

    sidebar().triggerEventHandler('primerCombo', 17);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/diputaciones/detalle-por-casilla/17');
  });

  it('should open the sección and the casilla chosen in the sidebar', async () => {
    await crear('/alcaldias/casillas/10/4512');

    sidebar().triggerEventHandler('seccionCombo', 4513);
    sidebar().triggerEventHandler('casillaCombo', 'C01');

    expect(router.navigateByUrl).toHaveBeenCalledWith('/alcaldias/casillas/10/4513');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/alcaldias/casilla/10/4512/C01');
  });

  it('should pass the sidebar breadcrumbs to the breadcrumbs and the page title', async () => {
    await crear('/diputaciones/votos-por-candidatura/18');
    const configuracion = { tipo_eleccion: 'diputaciones', votos_por: 'votos-por-candidatura', distrito: 18 } as BreadcrumbsConfig;

    sidebar().triggerEventHandler('emitirConfiguracionBreadcrumbs', configuracion);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('app-breadcrumbs')).properties['configuracionBreadcrumbs']).toBe(configuracion);
    expect(TestBed.inject(Title).getTitle()).toBe('PREP - Diputaciones - Distrito 18');
  });

  describe('content projection', () => {
    let pantalla: ComponentFixture<PantallaComponent>;

    beforeEach(async () => {
      apiPrepService = jasmine.createSpyObj<ApiPrepService>('ApiPrepService', ['obtenerAvanceEntidad']);
      await TestBed.configureTestingModule({
        declarations: [PlantillaNivelComponent, PantallaComponent],
        providers: [
          { provide: Router, useValue: { url: '/diputaciones/votos-por-candidatura/18', navigateByUrl: jasmine.createSpy() } },
          { provide: ApiPrepService, useValue: apiPrepService },
          { provide: BreadcrumbsService, useValue: { construirTitulo: () => '' } }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      pantalla = TestBed.createComponent(PantallaComponent);
      pantalla.detectChanges();
    });

    const elemento = (selector: string): HTMLElement => pantalla.nativeElement.querySelector(selector);

    it('should place the card content inside the card, after the breadcrumbs', () => {
      expect(elemento('.card > .contenido-tarjeta')).toBeTruthy();
      expect(elemento('.card > .row:first-child app-breadcrumbs')).toBeTruthy();
    });

    it('should place despuesDeTarjeta right after the card, outside it', () => {
      const despues = elemento('.despues-tarjeta');

      expect(despues.closest('.card')).toBeNull();
      expect(despues.previousElementSibling?.classList).toContain('card');
    });

    it('should place the sections in the main column, outside the card', () => {
      expect(elemento('.contenido-principal > .seccion')).toBeTruthy();
      expect(elemento('.seccion').closest('.card')).toBeNull();
    });

    it('should keep the conditions of the projected sections', () => {
      pantalla.componentInstance.mostrarSeccion = false;
      pantalla.detectChanges();

      expect(elemento('.seccion')).toBeNull();
    });
  });
});
