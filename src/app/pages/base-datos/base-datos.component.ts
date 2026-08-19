import { Component, OnInit } from '@angular/core';
import { AVANCE_BASE_DATOS_MOCK } from 'src/app/mocks/base-datos.mock';

@Component({
  standalone: false,
  selector: 'app-base-datos',
  templateUrl: './base-datos.component.html',
  styleUrls: ['./base-datos.component.css']
})
export class BaseDatosComponent implements OnInit {

  public avance = AVANCE_BASE_DATOS_MOCK;

  ngOnInit(): void {

  }

  descargarBaseDatos(): void {
    alert('Demostración: la descarga del ZIP de resultados requiere el backend real y no está disponible en esta versión.');
  }

}
