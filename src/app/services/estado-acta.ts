import { Datum } from '../interfaces/detalle-casilla.interface';

export interface EstadoActa {
  contabilizada: boolean;
  etiqueta: string;
  claseColor: string;
}

const CONTABILIZADA: EstadoActa = { contabilizada: true, etiqueta: 'Contabilizada', claseColor: 'text-success' };
const NO_CONTABILIZADA: EstadoActa = { contabilizada: false, etiqueta: 'No Contabilizada', claseColor: 'text-danger' };

export const ESTADOS_ACTA: readonly EstadoActa[] = [CONTABILIZADA, NO_CONTABILIZADA];

export const estadoActa = ({ contabilizar }: Pick<Datum, 'contabilizar'>): EstadoActa =>
  contabilizar === 'T' ? CONTABILIZADA : NO_CONTABILIZADA;
