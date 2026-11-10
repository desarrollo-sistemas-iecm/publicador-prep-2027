import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  standalone: false,
  selector: 'app-tercer-nivel',
  templateUrl: './tercer-nivel.component.html'
})
export class TercerNivelComponent {

  public prep: boolean = environment.prep;

}
