import { Component } from '@angular/core';

/**
 * Migrado de static-site/404.html. Antes el wildcard '**' de app-routing.module.ts
 * redirigía en silencio a 'inicio'; ahora muestra una página real.
 */
@Component({
  standalone: false,
  selector: 'app-pagina-no-encontrada',
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrls: ['./pagina-no-encontrada.component.css']
})
export class PaginaNoEncontradaComponent { }
