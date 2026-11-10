import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-primer-nivel',
  templateUrl: './primer-nivel.component.html'
})
export class PrimerNivelComponent implements OnInit {

  public tipoEleccion = '';
  public modoDistribucion: 'candidatura' | 'partido' = 'candidatura';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const [, tipoEleccion, votosPor] = this.router.url.split('/');
    this.tipoEleccion = tipoEleccion;
    this.modoDistribucion = votosPor === 'votos-por-partido-politico-y-candidatura-independiente' ? 'partido' : 'candidatura';
  }

}
