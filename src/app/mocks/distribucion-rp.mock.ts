import { DistribucionRp } from 'src/app/interfaces/distribucion-rp.interface';

/**
 * Datos de ejemplo migrados de static-site/screenRP.html ("Actas de Representación
 * Proporcional (RP)"), sección "Diputaciones - Casillas Especiales". En static-site
 * la tabla ya está anotada como "Tabla de ejemplo: en el sitio original se carga por
 * AJAX desde remote/*.php" — se conserva esa misma naturaleza de dato de ejemplo aquí.
 */
export const DISTRIBUCION_RP_MOCK: DistribucionRp = {
  partidos: ['PAN', 'PRI', 'PRD', 'MORENA', 'PVEM', 'PT', 'MC', 'ELIGE', 'PES', 'RSP', 'FM'],
  actas: [
    {
      seccion: '1201',
      casilla: 'S1',
      votosPorPartido: { PAN: 45, PRI: 12, PRD: 6, MORENA: 98, PVEM: 3, PT: 2, MC: 1, ELIGE: 0, PES: 0, RSP: 0, FM: 0 },
      noRegistrados: 1,
      nulos: 4,
      total: 172,
      observacion: 'Sin observaciones',
      disponible: true
    },
    {
      seccion: '1305',
      casilla: 'S1',
      votosPorPartido: { PAN: 38, PRI: 9, PRD: 5, MORENA: 85, PVEM: 2, PT: 1, MC: 1, ELIGE: 0, PES: 0, RSP: 0, FM: 0 },
      noRegistrados: 0,
      nulos: 3,
      total: 144,
      observacion: 'Sin observaciones',
      disponible: true
    },
    {
      seccion: '1450',
      casilla: 'S1',
      votosPorPartido: { PAN: 0, PRI: 0, PRD: 0, MORENA: 0, PVEM: 0, PT: 0, MC: 0, ELIGE: 0, PES: 0, RSP: 0, FM: 0 },
      noRegistrados: 0,
      nulos: 0,
      total: 0,
      observacion: 'Acta en proceso',
      disponible: false
    }
  ]
};
