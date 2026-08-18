import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { EsSicodidGuard } from './guards/es-sicodid.guard';

const routes: Routes = [
  {
    path: 'inicio',
    component: BienvenidaComponent,
    pathMatch: 'full',
    canActivate: [
      EsSicodidGuard
    ]
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'jefatura-de-gobierno',
    loadChildren: () => import('./tipo-eleccion/gubernatura/gubernatura.module').then( m => m.GubernaturaModule )
  },
  {
    path: 'diputaciones',
    loadChildren: () => import('./tipo-eleccion/diputaciones/diputaciones.module').then( m => m.DiputacionesModule )
  },
  {
    path: 'alcaldias',
    loadChildren: () => import('./tipo-eleccion/alcaldias/alcaldias.module').then(m => m.AlcaldiasModule)
  },
  {
    path: 'informacion-prep',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [
      EsSicodidGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
