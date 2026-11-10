import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  standalone: false,
  selector: 'app-segundo-nivel',
  templateUrl: './segundo-nivel.component.html'
})
export class SegundoNivelComponent {

  public prep: boolean = environment.prep;

}
