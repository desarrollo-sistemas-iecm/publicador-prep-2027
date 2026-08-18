import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComboStateService {

  // selectedValue: any;
  public primerCombo: any = null;
  public segundoCombo: any = null;
  public tercerCombo: any = null;

  constructor() { }

  public updateSelectedValue(value: any): void {
    this.primerCombo = value;
  }
  
  public updateSelectedSeccionValue(seccion: any): void {
    this.segundoCombo = seccion;
  }
  
  public updateSelectedCasillaValue(casilla: any): void {
    this.tercerCombo = casilla;
  }


}
