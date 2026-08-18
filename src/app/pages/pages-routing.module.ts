import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseDatosComponent } from './base-datos/base-datos.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';

const routes: Routes = [
  {
    path: 'base-de-datos',
    component: BaseDatosComponent
  },
  {
    path: 'preguntas-frecuentes',
    component: PreguntasFrecuentesComponent
  },
  {
    path: '',
    redirectTo: 'base-de-datos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
