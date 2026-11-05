import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
});
