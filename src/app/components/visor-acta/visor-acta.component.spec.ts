import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorActaComponent } from './visor-acta.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { Column, Datum } from 'src/app/interfaces/detalle-casilla.interface';

const columna = (dataIndex: string, title: string) => ({ dataIndex, title } as Column);

const columnas = [columna('id_seccion', 'Sección'), columna('votos_part_6', 'MC'), columna('total_votos_cc1', 'PAN-PRI-PRD')];

const actaUrna = {
  id_distrito: 5, id_seccion: 342, tipo_casilla: 'S01',
  votos_part_6: 19, total_votos_cc1: 12, votos_cand_no_reg: 0, votos_nulos: 3, votacion_total: 109,
  ue_personas_votaron: '0109', ue_identificacion: 'INE-UE7.0-MV-1-0220', ue_version_software: '7.5.1.0',
  ue_fecha_impresion: '01717369361000', ue_codigo_integridad: 'beef7010', ue_qr: 'R|09|05|002|IV|0342|01|S'
} as unknown as Datum;

const actaImagen = {
  id_distrito: 18, id_seccion: 3188, tipo_casilla: 'C01', url_acta: 'https://actas.test/18/18-3188-C01dmr.jpg', ue_qr: null
} as unknown as Datum;

describe('VisorActaComponent', () => {
  let fixture: ComponentFixture<VisorActaComponent>;

  const crear = async (acta: Datum) => {
    await TestBed.configureTestingModule({
      imports: [PipesModule],
      declarations: [VisorActaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VisorActaComponent);
    fixture.componentInstance.acta = acta;
    fixture.componentInstance.columnas = columnas;
    fixture.componentInstance.tipoEleccion = 'diputaciones';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const texto = (): string => fixture.nativeElement.textContent.replace(/\s+/g, ' ');

  const datosCasilla = (): Record<string, string> => {
    const terminos = Array.from(fixture.nativeElement.querySelectorAll('.datos-casilla dt') as NodeListOf<HTMLElement>);
    return Object.fromEntries(terminos.map((termino) => [termino.textContent!.trim(), termino.nextElementSibling!.textContent!.trim()]));
  };

  afterEach(() => {
    fixture.destroy();
  });

  it('should show the acta image when the acta was digitalized', async () => {
    await crear(actaImagen);

    const imagen: HTMLImageElement = fixture.nativeElement.querySelector('.imagen-acta');

    expect(imagen.src).toBe('https://actas.test/18/18-3188-C01dmr.jpg');
    expect(texto()).toContain('Visor de Imagen de Actas');
  });

  it('should explain that the image is unavailable when it fails to load', async () => {
    await crear(actaImagen);

    fixture.nativeElement.querySelector('.imagen-acta').dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.imagen-acta')).toBeNull();
    expect(texto()).toContain('La imagen del acta no está disponible.');
  });

  it('should render the electronic ballot box representation with its QR when the acta has ue_qr', async () => {
    await crear(actaUrna);

    expect(texto()).toContain('Representación del Acta de Resultados de la Casilla Electoral Local de la Elección para Diputaciones');
    expect(datosCasilla()).toEqual(jasmine.objectContaining({ 'Personas que votaron': '109', 'Casilla': 'Especial 1' }));
    expect(fixture.nativeElement.querySelector('.qr-urna').src).toMatch(/^data:image\/png;base64,/);
  });

  it('should list the votes of every candidatura column plus no registrados, nulos and total', async () => {
    await crear(actaUrna);

    const filas = Array.from(fixture.nativeElement.querySelectorAll('.votos-urna li') as NodeListOf<HTMLElement>)
      .map((fila) => Array.from(fila.children).map((celda) => celda.textContent!.trim()).filter(Boolean).join(' '));

    expect(filas).toEqual(['19', '12', 'Candidaturas no registradas 0', 'Votos nulos 3', 'Total 109']);
  });

  it('should print the impression date in Mexico City time', async () => {
    await crear(actaUrna);

    expect(texto()).toContain('02/06/2024 17:02:41 (UTC-6)');
  });

  it('should ask to close when Escape is pressed or the backdrop is clicked', async () => {
    await crear(actaImagen);
    const cerrar = spyOn(fixture.componentInstance.cerrar, 'emit');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.nativeElement.querySelector('.modal').click();

    expect(cerrar).toHaveBeenCalledTimes(2);
  });

  it('should lock the page scroll while open and release it when closed', async () => {
    await crear(actaImagen);

    expect(document.body.classList).toContain('modal-open');

    fixture.destroy();

    expect(document.body.classList).not.toContain('modal-open');
  });
});
