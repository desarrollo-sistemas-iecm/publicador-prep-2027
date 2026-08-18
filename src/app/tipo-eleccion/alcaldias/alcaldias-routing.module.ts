import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficaComponent } from 'src/app/components/grafica/grafica.component';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';
import { MovingCardsComponent } from 'src/app/components/moving-cards/moving-cards.component';
import { PrimerNivelComponent } from 'src/app/components/primer-nivel/primer-nivel.component';
import { SegundoNivelComponent } from 'src/app/components/segundo-nivel/segundo-nivel.component';
import { TercerNivelComponent } from 'src/app/components/tercer-nivel/tercer-nivel.component';
import { TestComponent } from 'src/app/components/test/test.component';
import { VotacionPorCasillaComponent } from 'src/app/components/votacion-por-casilla/votacion-por-casilla.component';

const routes: Routes = [
  
  { path: 'votos-por-alcaldia/:id_distrito_alcaldia', component: PrimerNivelComponent , children: [ { path: '', component: MovingCardsComponent } ]},

  { path: 'votos-por-alcaldia', component: TestComponent, children: [ {path: '', component: MapaComponent} ] },

  { path: 'votos-por-partido-politico-y-candidatura-independiente/:id_distrito_alcaldia', component: PrimerNivelComponent, children: [ { path: '', component: GraficaComponent } ] },
  { path: 'votos-por-partido-politico-y-candidatura-independiente', component: TestComponent, children: [ { path: '', component: GraficaComponent } ] },

  { path: 'detalle-por-casilla/:id_distrito_alcaldia', component: VotacionPorCasillaComponent, children: [ { path: '', component: MovingCardsComponent } ] },

  { path: 'detalle-por-casilla', component: TestComponent, children: [ { path: '', component: GraficaComponent } ] },
  { path: 'casillas/:id_distrito_alcaldia/:seccion', component: SegundoNivelComponent, children: [ { path: '', component: MovingCardsComponent } ] },
  { path: 'casilla/:id_distrito_alcaldia/:seccion/:casilla', component: TercerNivelComponent, children: [ { path: '', component: MovingCardsComponent } ] },

  {
    path: 'voto-en-condiciones-excepcionales',
    loadChildren: () => import('../../voto-condiciones-especiales/voto-condiciones-especiales.module').then(m => m.VotoCondicionesEspecialesModule)
  },

  { path: '', redirectTo: 'votos-por-alcaldia', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlcaldiasRoutingModule { }
