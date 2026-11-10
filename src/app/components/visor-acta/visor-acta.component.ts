import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Column, Datum } from 'src/app/interfaces/detalle-casilla.interface';
import { descripcionCasilla } from 'src/app/services/etiqueta-casilla';

const ELECCIONES: Record<string, string> = {
  'jefatura-de-gobierno': 'Jefatura de Gobierno',
  'diputaciones': 'Diputaciones',
  'alcaldias': 'Alcaldías',
};

export interface VotoRepresentacion {
  partidos: string[];
  titulo: string;
  votos: number | null;
}

/**
 * Visor del acta de una casilla. Si el acta viene de urna electrónica (`ue_qr`)
 * muestra la representación del acta con su QR, como `IconImageView` de
 * PREP2024; en otro caso, la imagen digitalizada (`url_acta`).
 *
 * TODO: validar la representación de urna electrónica con actas reales de 2027;
 * solo está probada con un acta de PREP2024 porque la base local no trae `ue_qr`.
 */
@Component({
  standalone: false,
  selector: 'app-visor-acta',
  templateUrl: './visor-acta.component.html',
  styleUrls: ['./visor-acta.component.css']
})
export class VisorActaComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input({ required: true }) acta!: Datum;
  @Input() columnas: Column[] = [];
  @Input() tipoEleccion = '';
  @Output() cerrar = new EventEmitter<void>();

  @ViewChild('botonCerrar') botonCerrar?: ElementRef<HTMLButtonElement>;

  public qr: string | null = null;
  public errorImagen = false;
  public votos: VotoRepresentacion[] = [];

  constructor(@Inject(DOCUMENT) private documento: Document) { }

  get esUrna(): boolean {
    return Boolean(this.acta.ue_qr);
  }

  get eleccion(): string {
    return ELECCIONES[this.tipoEleccion] ?? '';
  }

  get casilla(): string {
    return descripcionCasilla(String(this.acta.tipo_casilla));
  }

  get personasVotaron(): number | null {
    const personas = Number(this.acta.ue_personas_votaron);
    return Number.isFinite(personas) && this.acta.ue_personas_votaron ? personas : null;
  }

  get fechaImpresion(): Date | null {
    const milisegundos = Number(this.acta.ue_fecha_impresion);
    return this.acta.ue_fecha_impresion && Number.isFinite(milisegundos) ? new Date(milisegundos) : null;
  }

  // Las actas con campos ilegibles o sin dato llegan con votos nulos desde la base.
  valorOSinDato(valor: number | null | undefined): number | string {
    return valor ?? 'S/D';
  }

  async ngOnInit(): Promise<void> {
    this.documento.body.classList.add('modal-open');
    this.votos = this.columnas
      .filter(({ dataIndex }) => dataIndex.startsWith('votos_part_') || dataIndex.startsWith('total_votos_cc'))
      .map(({ dataIndex, title }) => ({
        partidos: title.split('-'),
        titulo: title,
        votos: (this.acta as unknown as Record<string, number | null>)[dataIndex] ?? null,
      }));

    if (this.acta.ue_qr) {
      try {
        // Solo las actas de urna electrónica necesitan el QR: la librería se descarga bajo demanda.
        const { toDataURL } = await import('qrcode');
        this.qr = await toDataURL(this.acta.ue_qr, { margin: 1, width: 150 });
      } catch {
        this.qr = null;
      }
    }
  }

  ngAfterViewInit(): void {
    this.botonCerrar?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.documento.body.classList.remove('modal-open');
  }

  @HostListener('document:keydown.escape')
  alPresionarEscape(): void {
    this.cerrar.emit();
  }

  alHacerClicEnFondo(evento: MouseEvent): void {
    if (evento.target === evento.currentTarget) {
      this.cerrar.emit();
    }
  }

}
