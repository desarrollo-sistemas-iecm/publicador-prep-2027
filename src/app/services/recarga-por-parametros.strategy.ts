import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

/**
 * Las vistas leen distrito/sección/casilla de la URL una sola vez en ngOnInit; si
 * Angular reutiliza el componente al cambiar solo los parámetros (p. ej. de
 * `votos-por-partido-.../3` a `.../10`), la pantalla se queda con los datos anteriores.
 * Aquí la ruta solo se reutiliza cuando también coinciden sus parámetros.
 */
@Injectable()
export class RecargaPorParametrosStrategy extends BaseRouteReuseStrategy {

  override shouldReuseRoute(futura: ActivatedRouteSnapshot, actual: ActivatedRouteSnapshot): boolean {
    return futura.routeConfig === actual.routeConfig && mismosParametros(futura, actual);
  }

}

const mismosParametros = (futura: ActivatedRouteSnapshot, actual: ActivatedRouteSnapshot): boolean => {
  const claves = new Set([...Object.keys(futura.params), ...Object.keys(actual.params)]);
  return [...claves].every((clave) => futura.params[clave] === actual.params[clave]);
};
