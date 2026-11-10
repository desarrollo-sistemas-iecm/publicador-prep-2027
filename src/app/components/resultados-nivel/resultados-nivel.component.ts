import { Component, Input } from '@angular/core';

/**
 * Bloque de resultados de la tarjeta principal: título, candidaturas (mapa, gráfica o tarjetas),
 * nota de decimales y resumen de la votación. Lo que se proyecta se muestra después de las candidaturas.
 */
@Component({
  standalone: false,
  selector: 'app-resultados-nivel',
  template: `
    <div class="row py-4">
        <div class="col-12">
            <app-titulo-seccion>{{ titulo }}</app-titulo-seccion>
        </div>
    </div>
    <app-contenedor-resultados-dinamico></app-contenedor-resultados-dinamico>
    <ng-content></ng-content>
    <div class="container-fluid complemento-vista-mapa">
        <div class="row pb-4">
            <div class="col-10">
                <p class="font-medium px14">Por presentación, los decimales de los porcentajes muestran sólo cuatro
                    dígitos. No obstante, al considerar todos los decimales, suman 100%.</p>
            </div>
        </div>
    </div>
    <div class="container-fluid resumen-votacion">
        <app-resumen-votacion></app-resumen-votacion>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ResultadosNivelComponent {

  @Input() titulo = 'Votos en Actas Contabilizadas';

}
