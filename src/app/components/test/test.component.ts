import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const SUBTITULOS_ENTIDAD: Record<string, string> = {
  'jefatura-de-gobierno': 'Votos en actas computadas',
  'diputaciones': 'Distritos obtenidos',
  'alcaldias': 'Alcaldías obtenidas',
};

@Component({
  standalone: false,
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {

  public tipoEleccion = '';
  public labelSubtituloSeccion = '';
  public esVistaMapa = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const [, tipoEleccion, vista] = this.router.url.split('/');

    this.tipoEleccion = tipoEleccion;
    this.esVistaMapa = tipoEleccion !== 'jefatura-de-gobierno' && vista === 'votos-por-candidatura';
    this.labelSubtituloSeccion = vista === 'votos-por-partido-politico-y-candidatura-independiente'
      ? 'Votos en Actas Contabilizadas'
      : SUBTITULOS_ENTIDAD[tipoEleccion] ?? '';
  }

}
