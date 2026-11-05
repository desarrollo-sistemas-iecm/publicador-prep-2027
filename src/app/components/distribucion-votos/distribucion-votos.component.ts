import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { DistribucionCandidatura, DistribucionPartido } from 'src/app/interfaces/distribucion-votos.interface';

@Component({
  standalone: false,
  selector: 'app-distribucion-votos',
  templateUrl: './distribucion-votos.component.html',
  styles: [
    `
    i.fa-equals.far:before {
    content: '=';
}
    .logo-aporte {
    width: 30px;
}
    `
  ]
})
export class DistribucionVotosComponent implements OnInit {

  @Input() modo: 'candidatura' | 'partido' = 'candidatura';

  public candidaturas: DistribucionCandidatura[] = [];
  public partidos: DistribucionPartido[] = [];

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    const [, tipoConsulta, , distOAlcaldia] = this.router.url.split('/');

    this.apiPrepService.obtenerDistribucionVotos(tipoConsulta, Number(distOAlcaldia))
      .subscribe(({ candidaturas, partidos }) => {
        this.candidaturas = candidaturas;
        this.partidos = partidos;
      });
  }

  logo(siglas: string): string {
    return `./assets/img/unknow/${siglas}.png`;
  }

}
