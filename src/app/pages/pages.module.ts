import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BaseDatosComponent } from './base-datos/base-datos.component';
import { SharedModule } from '../shared/shared.module';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BaseDatosComponent,
    PreguntasFrecuentesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
