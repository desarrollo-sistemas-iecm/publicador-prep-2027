import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPrepService } from 'src/app/services/api-prep.service';
import { CandidatoGrafica } from 'src/app/interfaces/grafica.interface';

@Component({
  standalone: false,
  selector: 'app-votos-actas-contabilizadas',
  templateUrl: './votos-actas-contabilizadas.component.html',
  styles: [
    `
    .logo-partido {
      width: 2.25em;
      height: auto;
    }

    .tabla-votos > :not(caption) > tr > * {
      white-space: nowrap;
    }

    .tabla-votos > tbody > tr:first-child > td {
      font-size: 1.2em;
      font-weight: bold;
    }
    `
  ]
})
export class VotosActasContabilizadasComponent implements OnInit {

  public candidaturas: CandidatoGrafica[] = [];

  constructor(private apiPrepService: ApiPrepService, private router: Router) { }

  ngOnInit(): void {
    const [, tipoConsulta] = this.router.url.split('/');

    this.apiPrepService.obtenerGraficaJG(tipoConsulta, 0, null, null)
      .subscribe(({ agrupado }) => {
        this.candidaturas = agrupado;
      });
  }

  esTexto(siglas: string): boolean {
    return siglas === 'no_registrados' || siglas === 'votos_nulos';
  }

}
