import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  standalone: false,
  selector: 'app-votacion-por-casilla',
  templateUrl: './votacion-por-casilla.component.html'
})
export class VotacionPorCasillaComponent {

  public prep: boolean = environment.prep;

}
