import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remplazaGuionesMediosABajos'
})
export class RemplazaGuionesMediosABajosPipe implements PipeTransform {

  public arrPartidos = ["PAN-PRI-PRD","PAN","PVEM-PT-MORENA","PVEM","PRI","MC","PT","PRD","MORENA"];
  
  transform(value: string): string {
    if(this.arrPartidos.includes(value)){
      // const value.split()
      const existeGuinMedio = value.split('-');
      if(existeGuinMedio.length > 0){
        value = value.replaceAll('-', '_');
      }

      return value;
    } else{
      return 'CI';
    }
  }



}
