import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemplazaGuionesMediosABajosPipe } from './remplaza-guiones-medios-abajos.pipe';



@NgModule({
  declarations: [
    RemplazaGuionesMediosABajosPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RemplazaGuionesMediosABajosPipe
  ]
})
export class PipesModule { }
