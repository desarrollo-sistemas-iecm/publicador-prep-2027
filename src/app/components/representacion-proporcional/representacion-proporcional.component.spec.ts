import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { RepresentacionProporcionalComponent } from './representacion-proporcional.component';

describe('RepresentacionProporcionalComponent', () => {
  let component: RepresentacionProporcionalComponent;
  let fixture: ComponentFixture<RepresentacionProporcionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ RepresentacionProporcionalComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id_distrito_alcaldia: '5' }) } }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepresentacionProporcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe fijar tipo_eleccion y distrito en configuracionBreadcrumbs', () => {
    expect(component.configuracionBreadcrumbs.tipo_eleccion).toBe('diputaciones');
    expect(component.configuracionBreadcrumbs.distrito).toBe(5);
  });
});
