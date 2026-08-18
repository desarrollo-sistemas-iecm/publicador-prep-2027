import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EsSicodidGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (environment.prep) {
      return true; // Permite el acceso si environment.allowAccess es true
    } else {
      this.router.navigate(['/jefatura-de-gobierno']); // Redirige a la ruta especificada si environment.allowAccess es false
      return false; // Bloquea el acceso
    }
  }
}
