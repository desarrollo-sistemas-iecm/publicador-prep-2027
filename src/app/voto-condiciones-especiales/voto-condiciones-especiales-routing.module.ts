import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { MovingCardsComponent } from '../components/moving-cards/moving-cards.component';

const routes: Routes = [
  {
    path: 'voto-anticipado',
    component: PlantillaComponent,
    children: [ { path: '', component: MovingCardsComponent } ]
  },
  {
    path: 'voto-en-el-extranjero',
    component: PlantillaComponent,
    children: [ { path: '', component: MovingCardsComponent } ]
  },
  {
    path: 'voto-en-prision-preventiva',
    component: PlantillaComponent,
    children: [ { path: '', component: MovingCardsComponent } ]
  },
  {
    path: '**',
    redirectTo: 'voto-anticipado',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotoCondicionesEspecialesRoutingModule { }
