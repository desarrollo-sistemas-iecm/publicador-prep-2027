import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotoCondicionesEspecialesRoutingModule } from './voto-condiciones-especiales-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PlantillaComponent
  ],
  imports: [
    CommonModule,
    VotoCondicionesEspecialesRoutingModule,
    SharedModule,
    RouterModule,
    // AppModule
  ]
})
export class VotoCondicionesEspecialesModule { }
