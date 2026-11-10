import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ SidebarComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit combo changes when the selection is restored from the URL', () => {
    const emitidos: unknown[] = [];
    component.primerCombo.subscribe((valor) => emitidos.push(valor));
    component.seccionCombo.subscribe((valor) => emitidos.push(valor));
    component.casillaCombo.subscribe((valor) => emitidos.push(valor));

    component.distOAlcaldia('18');
    component.cargarCasillasXSeccion('3188');
    component.seleccionCasilla('B01');

    expect(emitidos).toEqual([]);
  });

  it('should emit each combo change when the user selects a value', () => {
    const emitidos: unknown[] = [];
    component.primerCombo.subscribe((valor) => emitidos.push(['distrito', valor]));
    component.seccionCombo.subscribe((valor) => emitidos.push(['seccion', valor]));
    component.casillaCombo.subscribe((valor) => emitidos.push(['casilla', valor]));

    component.cambiarDistOAlcaldia('18');
    component.cambiarSeccion('3188');
    component.cambiarCasilla('B01');

    expect(emitidos).toEqual([['distrito', '18'], ['seccion', '3188'], ['casilla', 'B01']]);
  });

  it('should label each casilla option with its readable type while keeping the clave as value', () => {
    const http = TestBed.inject(HttpTestingController);
    component.optCasillas = [];

    component.cargarCasillasXSeccion('3188');
    http.expectOne((peticion) => peticion.url.endsWith('/combos/tercero'))
      .flush({ items: [{ id: 'B01', name: 'B01' }, { id: 'C01', name: 'C01' }] });

    expect(component.optCasillas).toEqual([
      { label: 'Básica', value: 'B01' },
      { label: 'Contigua 1', value: 'C01' }
    ]);
  });
});
