import { OrigenActa } from '../interfaces/detalle-casilla.interface';

export interface IconoOrigen {
  // Glifo de Font Awesome 4.7 (`fa-print`) o, si no hay equivalente, una imagen.
  glifo?: string;
  imagen?: string;
}

export interface OpcionOrigen {
  clave: OrigenActa;
  etiqueta: string;
  iconos: IconoOrigen[];
}

export const ICONO_DOCUMENTO: IconoOrigen = { glifo: 'fa-file-o' };

// Iconografía de PREP Coahuila 2026: un documento acompañado del medio por el que llegó la imagen.
export const OPCIONES_ORIGEN: OpcionOrigen[] = [
  { clave: 'proceso', etiqueta: 'Acta en proceso', iconos: [ICONO_DOCUMENTO, { glifo: 'fa-hourglass-o' }] },
  { clave: 'escaner', etiqueta: 'Escáner', iconos: [ICONO_DOCUMENTO, { glifo: 'fa-print' }] },
  { clave: 'movil', etiqueta: 'Móvil', iconos: [ICONO_DOCUMENTO, { glifo: 'fa-mobile' }] },
  { clave: 'urna', etiqueta: 'Urna Electrónica', iconos: [{ imagen: './assets/img/iconos-acta/urna-electronica.png' }] },
  { clave: 'movil-catd', etiqueta: 'Móvil CATD', iconos: [ICONO_DOCUMENTO, { glifo: 'fa-building-o' }, { glifo: 'fa-mobile' }] },
];

export const opcionOrigen = (clave: OrigenActa | null | undefined): OpcionOrigen | null =>
  OPCIONES_ORIGEN.find((opcion) => opcion.clave === clave) ?? null;
