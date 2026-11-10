import { Datum } from '../interfaces/detalle-casilla.interface';

/**
 * El acta se puede consultar si tiene imagen publicada o si viene de urna
 * electrónica (se muestra su representación con QR), como en PREP2024.
 */
export const actaVisible = (acta: Datum | null | undefined): boolean =>
  Boolean(acta?.url_acta || acta?.ue_qr);
