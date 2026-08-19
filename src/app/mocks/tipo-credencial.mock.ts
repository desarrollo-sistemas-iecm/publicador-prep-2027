import { TipoCredencial } from 'src/app/interfaces/tipo-credencial.interface';

/**
 * Contenido migrado del modal #modalCasilla presente en cada screenXX.html de
 * static-site ("Identifica la Entidad, Sección y Primer apellido de acuerdo con tu
 * credencial"). Usa los assets Credencial-{A,B,C,D}.svg ya existentes en
 * assets/img/credenciales/, que corresponden a las mismas imágenes que static-site
 * carga en ese modal (static-site/tipo_cred.html es una variante huérfana con otro
 * set de imágenes en minúsculas, sin consumidor real; se usa el modal sí referenciado).
 */
export const TIPO_CREDENCIAL_MOCK: TipoCredencial = {
  titulo: 'Identifica la Entidad, Sección y Primer apellido de acuerdo con tu credencial',
  imagenes: [
    { id: 'a', src: 'assets/img/credenciales/Credencial-A.svg', alt: 'Ejemplo de credencial para votar, modelo A' },
    { id: 'b', src: 'assets/img/credenciales/Credencial-B.svg', alt: 'Ejemplo de credencial para votar, modelo B' },
    { id: 'c', src: 'assets/img/credenciales/Credencial-C.svg', alt: 'Ejemplo de credencial para votar, modelo C' },
    { id: 'd', src: 'assets/img/credenciales/Credencial-D.svg', alt: 'Ejemplo de credencial para votar, modelo D' }
  ]
};
