import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelTransformerViewFoService {

  constructor() { }


  transformaLabelVistaPor(votos_por: string | undefined): string {
    const relacionLabel = [
      {
        votos_por: 'votos-por-candidatura',
        label: 'Votos por Candidatura'
      },
      {
        votos_por: 'votos-por-partido-politico-y-candidatura-independiente',
        label: 'Votos por Partido Político y Candidatura sin partido'
      },
      {
        votos_por: 'detalle-por-casilla',
        label: 'Detalle por Casilla'
      },
      {
        votos_por: 'casillas',
        label: 'Casillas'
      },
      {
        votos_por: 'casilla',
        label: 'Casilla'
      },
      {
        votos_por: 'voto-en-prision-preventiva',
        label: 'Voto en Prisión Preventiva'
      },
      {
        votos_por: 'voto-en-el-extranjero',
        label: 'Voto en el Extranjero'
      },
      {
        votos_por: 'voto-anticipado',
        label: 'Voto de Personas en Postración (Voto Anticipado)'
      },
      {
        votos_por: 'voto-anticipado',
        label: 'Voto de Personas en Postración (Voto Anticipado)'
      },
      {
        votos_por: 'votos-por-representacion-proporcional',
        label: 'Representación Proporcional'
      },
    ];

    return relacionLabel.find((ele) => ele.votos_por === votos_por)?.label || '';
  }
}
